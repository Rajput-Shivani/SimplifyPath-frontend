import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const PreviewPopup = ({isOpen, setIsOpen, description, onSubmit}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsOpen(true);
  };
  const handleOk = () => {
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  console.log("dprees", description)
  return (
    <>
      <Modal title="Preview Content" open={isOpen} onOk={handleOk} 
      onCancel={handleCancel}
      centered
      footer={
       <div className='preview-btn'>
        <Button onClick={handleCancel}>Close</Button>
        <Button onClick={()=>{
            onSubmit()
            setIsOpen(false)
        }}>Submit</Button>
       </div>
      }
      >
        <h4>Preview</h4>
        {description}
      </Modal>
    </>
  );
};
export default PreviewPopup;