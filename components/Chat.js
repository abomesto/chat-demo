import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Chat = ({ route }) => {
  const backgroundColor = route.params?.backgroundColor || "";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text>This is Your Chat Screen</Text>
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
