import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setIsConfirmation } from "../../redux/slices/globalSlice";
import './dialog.scss'
const Confirmation = ({isRemove=false, onSubmit=()=>{},onClose,onRemove=()=>{}}) => {
  const dispatch = useDispatch();
  const { isConfirm, confirmationTitle, confirmationContent, confirmationData } =
    useSelector((state) => state.globalReducer);

  const handleOk = () => {
    dispatch(setIsConfirmation(false));
  };
  const handleCancel = () => {
    dispatch(setIsConfirmation(false));
  };

  return (
    <>
      <Modal
        title={confirmationTitle}
        open={isConfirm}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={
          isRemove ? 
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Button>Cancel</Button>
            <Button onClick={onRemove} type="primary" danger >Delete</Button>
          </div>
          :
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Button onClick={onClose}>No</Button>
            <Button type="primary" onClick={()=>{
              onSubmit()
            }}>Yes</Button>
          </div>
        }
      >
        <p className="text-center">
          {confirmationContent} <span className="text-primary">{confirmationData}</span>{' '} ?
        </p>
      </Modal>
    </>
  );
};
export default Confirmation;
