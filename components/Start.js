import { useState } from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const imgBackground = require("../assets/bg-startscreen.png");

const Start = ({ navigation }) => {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [name, setName] = useState("");

  const navigateToChat = () => {
    navigation.navigate("Chat", { backgroundColor });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={imgBackground} style={styles.image}>
        {/* app title: */}
        <Text style={styles.title}>Chat App</Text>

        {/* container for imput, color choice and button */}
        <View style={styles.inputBox}>
          {/* username input */}
          <TextInput
            placeholder="Enter a Chat Screen Name"
            value={name}
            onChangeText={setName}
            style={styles.textInput}
          ></TextInput>

          <View>
            <Text style={styles.chooseBgText}>
              Choose Your Background Color
            </Text>

            {/* testing color update: */}
            {/* <Text>{background}</Text> */}

            {/* container for colors: */}
            <View style={styles.colorButtonBox}>
              {/* color 1 */}

              <TouchableOpacity
                style={[styles.colorButton, styles.colorInput1]}
                onPress={() => {
                  setBackgroundColor(styles.colorInput1.backgroundColor);
                }}
              ></TouchableOpacity>
              {/* color 2 */}
              <TouchableOpacity
                style={[styles.colorButton, styles.colorInput2]}
                onPress={() => {
                  setBackgroundColor(styles.colorInput2.backgroundColor);
                }}
              ></TouchableOpacity>

              {/* color 3 */}
              <TouchableOpacity
                style={[styles.colorButton, styles.colorInput3]}
                onPress={() => {
                  setBackgroundColor(styles.colorInput3.backgroundColor);
                }}
              ></TouchableOpacity>

              {/* color 4 */}
              <TouchableOpacity
                style={[styles.colorButton, styles.colorInput4]}
                onPress={() => {
                  setBackgroundColor(styles.colorInput4.backgroundColor);
                }}
              ></TouchableOpacity>
            </View>
          </View>
          {/* button to start chatting, links to chat.js */}
          <TouchableOpacity style={styles.button} onPress={navigateToChat}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "white",
    alignSelf: "center",
    marginBottom: 250,
  },
  inputBox: {
    // flex: 1,
    height: "44%",
    width: "88%",
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 30,
    // textAlign: "center",
    justifyContent: "space-evenly",
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },
  chooseBgText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    margin: 10,
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  colorButtonBox: {
    // justifyContent: "flex-start",
    display: "flex",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-evenly",
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  colorInput1: {
    backgroundColor: "#090C08",
  },
  colorInput2: {
    backgroundColor: "#474056",
  },
  colorInput3: {
    backgroundColor: "#8A95A5",
  },
  colorInput4: {
    backgroundColor: "#B9C6AE",
  },
  button: {
    backgroundColor: "#757083",
    width: "88%",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Start;
