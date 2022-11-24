import { IMessage } from "react-native-gifted-chat";

import { api } from "../services/api";
import { chatbotUser } from "../store/messages/messagesSlice";
import { text } from "../utils/text";
import { newId } from "./newId";

export const getReply = async (message: IMessage) => {
  const body = {
    inputs: {
      question: message.text,
      context: text,
    },
    options: {
      wait_for_model: true,
    },
  };
  const reply = await api.getAnswer(body);

  const replyMessages: IMessage = {
    _id: newId(),
    text: reply.answer,
    createdAt: new Date(),
    user: chatbotUser,
  };

  return replyMessages;
};
