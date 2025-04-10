import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Handle marking all notifications as read
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/mark-all-notifications-read",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Something went wrong while marking notifications as read.");
    }
  };

  // Handle deleting all read notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Something went wrong while deleting notifications.");
    }
  };

  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs>
        {/* Unread Notifications Tab */}
        <Tabs.TabPane tab="Unread" key="1">
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              style={{ cursor: "pointer", color: "blue" }}
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </h4>
          </div>
          {user?.notification?.length > 0 ? (
            user.notification.map((notification) => (
              <div
                className="card"
                style={{ cursor: "pointer" }}
                key={notification._id}
              >
                <div
                  className="card-body"
                  onClick={() => navigate(notification.onClickPath)}
                >
                  {notification.message}
                </div>
              </div>
            ))
          ) : (
            <p>No unread notifications.</p>
          )}
        </Tabs.TabPane>

        {/* Read Notifications Tab */}
        <Tabs.TabPane tab="Read" key="2">
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              style={{ cursor: "pointer", color: "red" }}
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </h4>
          </div>
          {user?.seennotification?.length > 0 ? (
            user.seennotification.map((notification) => (
              <div
                className="card"
                style={{ cursor: "pointer" }}
                key={notification._id}
              >
                <div
                  className="card-body"
                  onClick={() => navigate(notification.onClickPath)}
                >
                  {notification.message}
                </div>
              </div>
            ))
          ) : (
            <p>No read notifications.</p>
          )}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
