import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { localhost, socket } from "../constants";
import axios from "axios";

export default function ChatScreen({ route }) {
  const myInfor = route.params.myInfor;
  const token = route.params.myToken;
  const receiver = route.params.receiver;
  const [messages, setMessages] = useState([]);
  let tmp;
  const getSMS = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        `http://${localhost}:3000/api/message/${receiver._id}`
      );
      if (response) {
        tmp = response.data.sendingSMS.reverse().map((item) => item);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    socket.connect();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      await getSMS();
      const msgFormat = tmp.map((mess) => {
        if (mess.user._id == myInfor._id) {
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
          return {
            _id: mess._id,
            text: mess.content,
            createdAt: mess.createdAt,
            user: {
              _id: 2,
              name: mess.receiver.username,
              avatar: mess.user.avatarURL,
            },
          };
        }
      });
      setMessages(msgFormat);
    };

    fetch();
    socket.on("message", (msg) => {
      fetch();
    });
  }, []);
  console.log("first");

  const onSend = useCallback(async (messages = []) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.post(
      `http://${localhost}:3000/api/message/${receiver._id}`,
      {
        content: messages[0].text,
      }
    );
    if (res.data.success) {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      socket.emit("message", messages[0].text);
    } else {
      alert(res.data.message);
    }
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
