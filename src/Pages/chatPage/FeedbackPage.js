import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import "./chat.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getfeedbackData,
  setFeedbackStatus,
  setFeedbackSubmitted,
  setIsThumbsDown,
  setIsThumbsUp,
  setJobId,
  setReview,
  setReviewSubmitted,
} from "../../redux/slices/chatSlice";
import { Button, Modal, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";

export const FeedbackPage = ({newMessage, isloading, setShowSuggestions}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [iconColor, setIconColor] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const [visibleBoth, setVisibleBoth] = useState(true);
  const [isDown, setIsDown] = useState(true);
  const [isActive, setIsActive]= useState('')
  const { review, jobId } = useSelector((state) => state.chatReducer);
  const [thumbsDownOpen, setThumbsDownOpen] = useState("");

  const handleCloseFeedback = () => {
    setThumbsDownOpen(false);
    setIconColor(null)
  };

  const handleOpenFeedback = () => {
    setThumbsDownOpen(true);
  };

  const submitFeedback = (status) => {
    dispatch(setFeedbackStatus(status));
    setIconColor(status);
    if (status === "Good") {
      dispatch(setIsThumbsUp(false));
      handleSubmit(status);
    } else if (status === "Bad") {
      dispatch(setIsThumbsDown(false));
    }
  };

  const handleSubmit = (feedback) => {
    const body = {
      feedback,
      review: reviewStatus || null,
    };

    dispatch(
      getfeedbackData({
        body,
        navigate,
        id: jobId,
      })
    ).then(() => {
      dispatch(setReview(false));
      setThumbsDownOpen(false);
      setReviewStatus("");
      dispatch(setFeedbackSubmitted(true));
      dispatch(setReviewSubmitted(true));
      if (feedback === "Good") {
        if (review) {
          dispatch(setFeedbackStatus(""));
        } else {
          dispatch(setFeedbackStatus("Good"));
        }
      } else {
        dispatch(setFeedbackStatus(""));
      }
    });
  };

  useEffect(()=>{
    if(isloading){
        setShowSuggestions(false)
      }
  },[])
  
  return (
    <div >
      {visibleBoth && (
        <Tag style={{padding:'5px 10px', marginTop:'5px'}} >
          <Tag color={isActive === 'good' && 'green'} >
          <LikeOutlined
            className="thumbs-icon"
            style={{ color: iconColor === "Good" ? "green" : null }}
            onClick={() => {
                console.log("jobId", newMessage)
                dispatch(setJobId(newMessage?.jobId))
            setIsActive("good")
              submitFeedback("Good");
              setVisibleBoth(false);
            }}
          />
          </Tag>
          {isDown && (
            <Tag color={isActive === 'bad' && 'green'}>
                <DislikeOutlined
              className="thumbs-icon"
              style={{ color: iconColor === "Bad" ? "green" : null }}
              onClick={() => {
                console.log("jobId", newMessage)
                dispatch(setJobId(newMessage?.jobId))
                setIsActive("bad")
                handleOpenFeedback();
                  setIsDown(false);
                submitFeedback("Bad");
              }}
            />
            </Tag>
          )}
        </Tag>
      )}

      <Modal
        centered
        open={thumbsDownOpen}
        onCancel={()=>{
            setIsDown(true)
            handleCloseFeedback()
        }}
        onOk={()=>{
            setIsDown(true)
            handleCloseFeedback()
        }}
        title="Submit a Review"
        footer={
          <div>
            <Button onClick={()=>{
                 setIsDown(true)
                 handleCloseFeedback()
            }}>Cancel</Button>
            <Button onClick={() => handleSubmit("bad")}>Submit</Button>
          </div>
        }
      >
        <TextArea
          rows={5}
          name="reviewStatus"
          onChange={(e) => setReviewStatus(e.target.value)}
          value={reviewStatus}
          placeholder="Please enter your review..."
        />
      </Modal>
    </div>
  );
};
