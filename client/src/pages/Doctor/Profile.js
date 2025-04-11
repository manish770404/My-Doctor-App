import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";

// ✅ Use environment variable for API
const API = process.env.REACT_APP_API;

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        `${API}/api/v1/doctor/getDoctorInfo`,
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        const doctorData = {
          ...res.data.data,
          timings: [
            moment(res.data.data.timings[0], "HH:mm"),
            moment(res.data.data.timings[1], "HH:mm"),
          ],
        };
        setDoctor(doctorData);
      }
    } catch (error) {
      console.error("Error fetching doctor info:", error);
      message.error("Failed to load profile data");
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${API}/api/v1/doctor/updateProfile`,
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error updating profile:", error);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={doctor}
        >
          <h4>Personal Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input placeholder="Your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Last name is required" }]}
              >
                <Input placeholder="Your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                rules={[{ required: true, message: "Phone number is required" }]}
              >
                <Input placeholder="Your contact number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input placeholder="Your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input placeholder="Your website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Address is required" }]}
              >
                <Input placeholder="Your clinic address" />
              </Form.Item>
            </Col>
          </Row>

          <h4>Professional Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                rules={[{ required: true, message: "Specialization is required" }]}
              >
                <Input placeholder="Your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[{ required: true, message: "Experience is required" }]}
              >
                <Input placeholder="Your experience in years" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Consultation"
                name="feesPerCunsaltation"
                rules={[{ required: true, message: "Fees are required" }]}
              >
                <Input placeholder="Consultation fee" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Timings"
                name="timings"
                rules={[{ required: true, message: "Timings are required" }]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} />
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
