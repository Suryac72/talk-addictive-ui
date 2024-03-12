import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../shared/models/chat";

interface ChatContextType {
  selectedChat: any;
  setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  notification: any[];
  setNotification: React.Dispatch<React.SetStateAction<any[]>>;
  chats: any;
  setChats: React.Dispatch<React.SetStateAction<any>>;
}

const ChatContext = createContext<ChatContextType>({
  selectedChat: null,
  setSelectedChat: () => {},
  user: null,
  setUser: () => {},
  notification: [],
  setNotification: () => {},
  chats: null,
  setChats: () => {},
});

const ChatProvider: React.FC = ({ children }: any) => {
  const [selectedChat, setSelectedChat] = useState<any>();
  const [user, setUser] = useState<User | null>(null);
  const [notification, setNotification] = useState<any[]>([]);
  const [chats, setChats] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo: User = JSON.parse(userInfoString);
      setUser(userInfo);
    } else {
      setUser(null);
      navigate("/");
    }
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
