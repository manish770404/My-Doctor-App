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

  // Mark all as read
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
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Error marking all as read");
    }
  };

  // Delete all read
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
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Error deleting all read notifications");
    }
  };

  // Tab content items for Ant Design Tabs
  const tabItems = [
    {
      label: "Unread",
      key: "1",
      children: (
        <>
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
        </>
      ),
    },
    {
      label: "Read",
      key: "2",
      children: (
        <>
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
        </>
      ),
    },
  ];

  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </Layout>
  );
};

export default NotificationPage;
