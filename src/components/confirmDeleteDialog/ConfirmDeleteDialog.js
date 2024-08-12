import React from "react";
import { Modal } from "antd";

const ConfirmDeleteDialog = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Confirm Delete"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
    >
      <p>Are you sure you want to delete all data?</p>
    </Modal>
  );
};

export default ConfirmDeleteDialog;
