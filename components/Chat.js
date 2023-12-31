import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import CustomActions from "./CustomActions";
import { useState, useEffect, useId } from "react";
import {
  collection,
  query,
  addDoc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import MapView from "react-native-maps";

const Chat = ({ route, db, navigation, storage, isConnected }) => {
  const { userID, name } = route.params;
  const backgroundColor = route.params?.backgroundColor || "";
  const [messages, setMessages] = useState([]);

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setLists(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };
  //local storage code
  let unsubMessages;
  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc._id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      loadCachedMessages();
      return () => {
        if (unsubMessages) unsubMessages();
      };
    }
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 40,
  },
});
export default Chat;
