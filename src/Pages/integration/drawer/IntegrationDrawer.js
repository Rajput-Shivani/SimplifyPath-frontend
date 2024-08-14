import React from "react";
import { Button, Drawer, Space, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setIntegrationDrawerOpen } from "../../../redux/slices/integrationSlice";
import "./integrationdrawer.scss";

export const IntegrationDrawer = () => {
  const dispatch = useDispatch();
  const { integrationDrawerOpen } = useSelector(
    (state) => state.integrationReducer
  );
  const { selectedOptionData } = useSelector((state) => state.globalReducer);

  const onClose = () => {
    dispatch(setIntegrationDrawerOpen(false));
  };

  const renderTitle = () => {
    return (
      <div style={{ display: "flex", gap: "20px" }}>
        <div className="brand-name">{selectedOptionData?.name}</div>
        <div className="website">{selectedOptionData?.website}</div>
      </div>
    );
  };

  return (
    <>
      <Drawer
        title={renderTitle()}
        placement="right"
        width="50%"
        onClose={onClose}
        open={integrationDrawerOpen}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
        className="integration-drawer"
      >
        <h2>Description:</h2>
        <p>{selectedOptionData?.description}</p>
        <h2>Instructions:</h2>
        <List
          size="small"
          bordered
          dataSource={selectedOptionData?.actions}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};
