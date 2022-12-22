import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { localhost } from "../constants";
import axios from "axios";
export default function ChatScreen({ route }) {
  const myInfor = route.params.myInfor;
  const token = route.params.myToken;
  const receiver = route.params.receiver;
  // console.log(receiver);

  const [messages, setMessages] = useState([]);
  const [messages1, setMessages1] = useState([]);
  let tmp = [];
  const getSMS = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        `http://${localhost}:3000/api/message/${receiver._id}`
      );
      if (response) {
        setMessages1(response.data.sendingSMS.map((item) => item));
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getSMS();
    // console.log(messages1);

    const msgFormat = messages1.map((mess) => {
      if (mess.user._id == myInfor._id) {
        console.log("first");

        return {
          _id: mess._id,
          text: mess.content,
          createdAt: mess.createdAt,
          user: {
            _id: 1,
            name: mess.user.username,
            avatar: mess.user.avatarURL,
          },
        };
      } else {
        console.log("second");
        return {
          _id: mess._id,
          text: mess.content,
          createdAt: mess.createdAt,
          user: {
            _id: 2,
            name: mess.receiver.username,
            avatar: mess.receiver.avatarURL,
          },
        };
      }
    });
    setMessages(msgFormat);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
