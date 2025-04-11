import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import moment from "moment";
import { message, Table } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      message.error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  // Handle status change
  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        {
          appointmentsId: record._id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.error("Status update error:", error);
      message.error("Something went wrong while updating status");
    }
  };

  // Table columns definition
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) =>
        record.status === "pending" && (
          <div className="d-flex">
            <button
              className="btn btn-success"
              onClick={() => handleStatus(record, "approved")}
            >
              Approve
            </button>
            <button
              className="btn btn-danger ms-2"
              onClick={() => handleStatus(record, "rejected")}
            >
              Reject
            </button>
          </div>
        ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center">Appointments List</h1>
      <Table columns={columns} dataSource={appointments} rowKey="_id" />
    </Layout>
  );
};

export default DoctorAppointments;
