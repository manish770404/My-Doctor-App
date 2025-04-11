import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const getUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/getAllUsers`, {

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to fetch users");
    }
  };

  // Toggle block/unblock user
  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/updateUserStatus",
        {
          userId,
          status: isBlocked ? "unblock" : "block",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getUsers(); // Refresh list
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      message.error("Something went wrong");
    }
  };

  // Table columns for Ant Design
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button
            className={`btn ${record.isBlocked ? "btn-success" : "btn-danger"}`}
            onClick={() => handleBlockToggle(record._id, record.isBlocked)}
          >
            {record.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} rowKey="_id" />
    </Layout>
  );
};

export default Users;
