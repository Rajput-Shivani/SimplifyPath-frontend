import React, { useEffect, useRef, useState } from "react";
import { Layout, Input, List, Button, Divider } from "antd";
import {
  SendOutlined,
  InfoCircleFilled,
  MenuOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./chat.scss";
import { useNavigate } from "react-router-dom";
import {
  getChatData,
  setFeedbackStatus,
  setFeedbackSubmitted,
  setIsThumbsDown,
  setIsThumbsUp,
  setJobId,
  setLoading,
  setMessages,
  setNewMessage,
  setReviewSubmitted,
  setSocket,
} from "../../redux/slices/chatSlice";
import {
  addDateAndTime,
  formatTime,
  unauthorizedError,
} from "../../utils/helpers";
import sound from "../../assets/chatSound.mp3";
import AppSecureStorage from "../../services/secureStorage";
import io from "socket.io-client";
import axios from "axios";
import { API_ROUTES } from "../../utils/constants";
import jira from "../../assets/Jira.svg";
import googleCalender from "../../assets/googleCalender.png";
import salesForce from "../../assets/Saleforce.png";
import keka from "../../assets/keka.png";
import dbf from "../../assets/dbf.png";
import { toast } from "react-toastify";
import BouncingLoader from "../../components/Loader/BouncingLoader";
import TopHeader from "../../components/header/Header";
import Loading from "../../components/Loader/Loading";
import { FeedbackPage } from "./FeedbackPage";

const { Content, Footer } = Layout;
let socket;
const storage = new AppSecureStorage();

export const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesRef = useRef(null);
  const [isloading, setIsLoading] = useState(false);
  const [varaib, setVaraib] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [shouldScrollSuggestions, setShouldScrollSuggestions] = useState(false);
  const [askForFeedback, setAskForFeedback] = useState(false);
  const [botType, setBotType] = useState("");
  const [botButtons, setBotButons] = useState([]);
  const [isSuggestions, setIsSuggestions] = useState(false);
  const [currentBotMsg, setCurrentBotMsg]= useState({})
  const { messages, newMessage, loader, loading } = useSelector(
    (state) => state.chatReducer
  );
  const isLoading = useSelector((state) => state.chatReducer.loader);
  const all_messages = addDateAndTime(messages);
  const latestMessage = messages[messages.length - 1];

  useEffect(() => {
    socket = io(
      window.location.origin === "https://app.simplifypath.com"
        ? "https://api.simplifypath.com/"
        : "https://staging-api.simplifypath.com/",
      // "http://localhost:2000",
      {
        query: {
          userId: storage.get("id"),
          source: "simplifypath_standalone_app",
        },
      }
    );
    dispatch(setSocket(socket));
    socket.on("bot_reply", (newMessage) => {
      setBotType(newMessage?.type);
      setBotButons(newMessage?.buttons);
      dispatch(setJobId(newMessage?.jobId));
      setAskForFeedback(newMessage?.askForFeedback);
      newMessage.timestamp = new Date().toISOString();
      dispatch(setMessages(newMessage));
      dispatch(setLoading(false));
      setShowSuggestions(false);
      setVaraib("");
      playSendMessageSound();
      setIsLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    setShouldScrollSuggestions(suggestions.length > 5);
    const handleClickOutside = (event) => {
      if (suggestions.length >= 0) {
        const suggestionsContainer = document.getElementById(
          "suggestions-container"
        );
        if (
          suggestionsContainer &&
          !suggestionsContainer.contains(event.target)
        ) {
          // Click occurred outside of suggestions, close the suggestions
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [suggestions]);

  const fetchSuggestions = async (keyword) => {
    try {
      if (keyword.trim() !== "") {
        const response = await axios.get(
          `${API_ROUTES.BASE_URL}chat/suggestion/${keyword}`,
          {
            headers: {
              Authorization: `Bearer ${storage.get("token")}`,
            },
          }
        );
        setSuggestions(response.data);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      setShowSuggestions(false);
      if (error?.response && error?.response.status === 401) {
        unauthorizedError(navigate);
      }
    }
  };

  const sendMessage = (message, type) => {
    setShowSuggestions(false);
    dispatch(setLoading(true));
    setIsLoading(true);
    if (socket?.connected) {
      socket.emit("user_reply", {
        message,
        sentby: "user",
        userId: storage.get("id"),
        socketId: socket.id,
        timestamp: new Date().toISOString(),
        type: type,
      });

      const userMessage = {
        message,
        sentby: "user",
        userId: storage.get("id"),
        timestamp: new Date().toISOString(),
      };
      dispatch(setMessages(userMessage));
      dispatch(setNewMessage(""));
      setSuggestions([]);
      setShowSuggestions(false);
      playSendMessageSound();
      // setIsLoading(false)
      scrollToBottom();
    } else {
      console.error("Socket is not initialized yet.");
      dispatch(setLoading(false));
      setIsLoading(false);
    }
  };

  console.log("currentMSG", currentBotMsg)

  useEffect(() => {
    if (loader) {
      setVaraib(
        setTimeout(() => {
          dispatch(
            setMessages({
              message:
                "We are currently processing your request, and you will receive a confirmation message once its completed. In the meantime, feel free to provide any additional prompts or inquiries.",
              sentby: "bot",
              userId: storage.get("id"),
              timestamp: new Date().toISOString(),
            })
          );
          setShowSuggestions(false);
          playSendMessageSound();
          scrollToBottom();
        }, 3000)
      );

      if (varaib) {
        dispatch(setLoading(false));
      }
    } else {
      clearTimeout(varaib);
    }
    if (loading && isloading) {
      setShowSuggestions(false);
    }
  }, [loader]);

  const scrollToBottom = () => {
    messagesRef?.current?.scrollIntoView({ behavior: "auto" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSuggestions(true);
    console.log("eee", e);
    setShowSuggestions(false);
    if (isloading) {
      setShowSuggestions(false);
    }
    scrollToBottom();
    if (newMessage.trim() === "") {
      toast.error("Message cannot be empty");
      setShowSuggestions(false);
    } else if (newMessage.includes("<") || newMessage.includes(">")) {
      toast.error("Message cannot contain '<' or '>'");
      setShowSuggestions(false);
    } else {
      scrollToBottom();
      sendMessage(newMessage, "text");
      console.log(newMessage)
      setShowSuggestions(false);
      setNewMessage("");
    }
  };

  const playSendMessageSound = () => {
    if (document.hasFocus()) {
      const audio = new Audio(sound);
      audio?.load();
      audio.play().catch((error) => {
        console.error("Audio play error:", error);
      });
    }
  };
  

  const onChange = (e) => {
    const inputText = e.target.value;
    dispatch(setNewMessage(inputText));

    if (!inputText) {
      setShowSuggestions(false);
    }
    // Only fetch suggestions and show them if newMessage is not empty
    if (inputText.trim() !== "") {
      fetchSuggestions(inputText);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const urlify = (text) => {
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    let replacedText = text.replace(urlRegex, function (url) {
      if (url.length > 110) {
        let trimmedUrl = url.substring(0, 110) + "...";
        return `<Tooltip title="${url}"><a href="${url}" target="_blank">${trimmedUrl}</a></Tooltip>`;
      } else {
        return `<Tooltip title="${url}"><a href="${url}" target="_blank">${url}</a></Tooltip>`;
      }
    });

    return `<div style="word-wrap: break-word;">${replacedText}</div>`;
  };
  const handleSuggestionClick = (selectedSuggestion) => {
    dispatch(setNewMessage(selectedSuggestion));
    setSuggestions([]);
    setShowSuggestions(false);
    sendMessage(selectedSuggestion);
  };

  useEffect(() => {
    scrollToBottom();
    dispatch(setFeedbackStatus(""));
    dispatch(setIsThumbsUp(true));
    dispatch(setIsThumbsDown(true));
    dispatch(setFeedbackSubmitted(true));
    dispatch(setReviewSubmitted(false));
  }, [messages]);

  useEffect(() => {
    dispatch(getChatData(navigate));
    if (isloading && newMessage) {
      setShowSuggestions(false);
    }
  }, []);

  useEffect(() => {
    if (isSuggestions && isloading) {
      setShowSuggestions(false);
    }
  }, []);

  return (
    <Layout className="chat-layout">
      <TopHeader
        isTitle={true}
        isRightContent={false}
        title="Chat"
        icon={<AliwangwangOutlined className="icon-size text-white" />}
      />
      <Content className="chat-content">
        {loading ? (
          <Loading />
        ) : (
          <List
            className="chat-list"
            itemLayout="horizontal"
            loading={isLoading}
            dataSource={all_messages}
            renderItem={(item) => {
              if (!item?.message?.trim()) {
                return null;
              }
              const isLatestMessage =
                item?.timestamp === latestMessage?.timestamp;
              console.log("isLatestMessage", isLatestMessage);
              return (
                <>
                  {item?.day && (
                    <>
                      <div className="date_time_section">
                        <div>{item?.day?.replace(/,/g, "")}</div>
                      </div>
                      <Divider />
                    </>
                  )}

                  <List.Item className={`chat-message ${item.sentby}`}>
                    <List.Item.Meta
                      className={`bubble ${
                        item.sentby === "bot" ? "bot-message" : "user-message"
                      }`}
                      description={
                        <div
                          className={`bubble ${
                            item.sentby === "bot" || !item.sentby
                              ? "right bot-message"
                              : "left"
                          }`}
                        >
                          {item?.message && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: urlify(
                                  item.message.replace(
                                    /(?:\r\n|\r|\n)/g,
                                    "<br>"
                                  )
                                ),
                              }}
                            ></div>
                          )}
                          {isLatestMessage &&
                            item?.buttons &&
                            botType === "button" && (
                              <div className="darwinOptions">
                                {botButtons?.map((text) => (
                                  <Button
                                    key={text}
                                    fullWidth
                                    onClick={() => sendMessage(text, "button")}
                                  >
                                    {text}
                                  </Button>
                                ))}
                              </div>
                            )}


                          {askForFeedback &&
                          isLatestMessage &&
                            (item?.sentby === "bot" || !item?.sentby) &&
                            item?.message !==
                              "We are currently processing your request, and you will receive a confirmation message once its completed. In the meantime, feel free to provide any additional prompts or inquiries." && (
                              <FeedbackPage
                                isloading={isloading}
                                newMessage={latestMessage}
                                setShowSuggestions={setShowSuggestions}
                              />
                            )}
                        </div>
                      }
                      title={
                        <span className="message-time">
                          {formatTime(item.timestamp)}
                        </span>
                      }
                    />
                  </List.Item>
                </>
              );
            }}
          />
        )}
        <div ref={messagesRef}></div>
        <div>{isloading && <BouncingLoader />}</div>
      </Content>
      {/* Suggestions */}
      <div className="suggestion-container">
        <div
          id="suggestions-container"
          className={shouldScrollSuggestions ? "scrollableSuggestions" : ""}
        >
          {showSuggestions && !isloading && (
            <div
              className="staticMenuColumn"
              onClick={() => sendMessage("Menu", "text")}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <MenuOutlined />
                <span className="menuText">{`Main Menu`}</span>
              </div>
            </div>
          )}
          {showSuggestions &&
            suggestions.length > 0 &&
            newMessage.trim() !== "" &&
            suggestions.map((suggestion, index) => (
              <div
                className="suggestionList"
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
              >
                <div style={{ marginRight: "20px" }}>
                  {suggestion.app === "keka" ? (
                    <img src={keka} alt="keka" className="icons" />
                  ) : suggestion.app === "googlecalendar" ? (
                    <img
                      src={googleCalender}
                      alt="googleCalender"
                      className="icons"
                    />
                  ) : suggestion.app === "dbf" ? (
                    <img src={dbf} alt="dbf" className="icons" />
                  ) : suggestion.app === "jira" ? (
                    <img src={jira} alt="jira" className="icons" />
                  ) : suggestion.app === "salesforce" ? (
                    <img src={salesForce} alt="salesForce" className="icons" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="suggestions_div">
                  <div>{suggestion.text}</div>
                  <div className="intent-container">
                    {suggestion.intent === "Informational" && (
                      <div className="suggestions">
                        <InfoCircleFilled />
                        {suggestion.intent}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer className="chat-footer">
        <Input
          className="chat-input"
          placeholder="Type a message"
          value={newMessage}
          onChange={onChange}
          onPressEnter={onSubmit}
        />
        <Button
          className="send-button"
          type="primary"
          icon={<SendOutlined />}
          onClick={onSubmit}
        />
      </Footer>
    </Layout>
  );
};
