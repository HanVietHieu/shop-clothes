import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
// import SocialNetworks from "./SocialNetworks";
import { Typography, message } from "antd";
import { Row, Col } from "antd";
// import SignUpSuccessModal from "./SignUpSuccessModal";
// import api from "../../api";
import { get } from "lodash";
import styled from "styled-components";

const { Title } = Typography;

export default function Register() {
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const payload = {
        firstName: get(values, "firstName"),
        lastName: get(values, "lastName"),
        email: get(values, "email"),
        password: get(values, "password"),
      };

      setLoading(true);

      const res = await api({
        url: "/users/signup",
        data: payload,
        method: "POST",
      });

      if (res && res.status === 201) {
        setShowModal(true);
        form.resetFields();
        setLoading(false);
        setChecked(false);
      }
    } catch (error) {
      const errorMessage = get(error, "error.message", "Something went wrong!");
      message.error(errorMessage);
      setLoading(false);
    }
  };

  const onCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validation = (rule, value, callback) => {
    if (checked) {
      return callback();
    }
    return callback("Please agree Terms of Use & Privacy policy");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <Container className="container">
      {" "}
      <Form
        name="signup"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Title level={2} className="text-center">
          Create Account
        </Title>
        {/* <SocialNetworks /> */}

        {/* <div className="option-text">or use your email for registration</div> */}

        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              hasFeedback
              name="firstName"
              label="First name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your first name.",
                },
                {
                  min: 2,
                  message: "Your first name must be at least 2 characters.",
                },
              ]}
            >
              <Input placeholder="First name" size="large" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              hasFeedback
              name="lastName"
              label="Last name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your last name.",
                },
                {
                  min: 2,
                  message: "Your last name must be at least 2 characters.",
                },
              ]}
            >
              <Input placeholder="Last name" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              name="email"
              label="Email address"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your email.",
                },
                {
                  type: "email",
                  message: "Your email is invalid.",
                },
              ]}
            >
              <Input placeholder="Email" size="large" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              name="User name"
              label="User name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your user name.",
                },
                {
                  type: "string",
                  message: "Your user name is invalid.",
                },
              ]}
            >
              <Input placeholder="User name" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              name="password"
              label="Password"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your password.",
                },
                { min: 6, message: "Password must be minimum 6 characters." },
              ]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
          </Col>

          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Confirm your password.",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Form.Item
            name="agree"
            valuePropName="checked"
            noStyle
            rules={[{ validator: validation }]}
          >
            <Checkbox checked={checked} onChange={onCheckboxChange}>
              I agree to <a href="#">Terms of Use & Privacy policy</a>.
            </Checkbox>
          </Form.Item>
        </Form.Item>

        <Button
          type="primary"
          loading={loading}
          className="form-submit-btn"
          htmlType="submit"
          shape="round"
          icon={<UserAddOutlined />}
          size="large"
        >
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  .text-center {
    text-align: center;
  }

  .auth-page {
    .auth-page-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .mobile-auth-warpper {
      padding: 30px 20px;
    }

    .auth-container h1 {
      font-weight: bold;
      margin: 0;
      color: #fff;
    }

    .ant-form-item-explain-error {
      font-size: 13px;
    }

    .auth-container h2.ant-typography {
      text-align: center;
    }

    .overlay-panel p {
      font-size: 14px;
      font-weight: 100;
      line-height: 20px;
      letter-spacing: 0.5px;
      margin: 20px 0 30px;
    }

    .option-text {
      font-size: 14px;
      text-align: center;
      margin-bottom: 10px;
    }

    .auth-container {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
      position: relative;
      overflow: hidden;
      width: 992px;
      max-width: 100%;
      min-height: 660px;
    }

    .form-container form {
      background: #fff;
      padding: 50px;
      height: 100%;
    }

    .form-container form h1 {
      color: var(--text-color);
      text-align: center;
    }

    .social-container .social {
      border: 1px solid #ddd;
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin: 0 7px;
      height: 40px;
      width: 40px;
      cursor: pointer;
      font-size: 20px;
      color: #fff;
    }

    .social-container {
      margin: 20px 0;
      text-align: center;
    }

    .social-container .facebook {
      background: #4267b2;
      border-color: #4267b2;
    }

    .social-container .google {
      background: #db4a39;
      border-color: #db4a39;
    }
    .social-container .linkedin {
      background: #0e76a8;
      border-color: #0e76a8;
    }

    .form-container input {
      font-size: 14px;
    }

    .bg-gradient {
      background: var(--main-color);
      background: -webkit-linear-gradient(to right, #38ef7d, var(--main-color));
      background: linear-gradient(to right, #38ef7d, var(--main-color));
    }

    button {
      color: #fff;
      font-size: 12px;
      letter-spacing: 1px;
      transition: transform 20ms ease-in;
      cursor: pointer;
      margin: 8px 0;
      width: 100%;
    }

    button:active {
      transform: scale(0.95);
    }

    button:focus {
      outline: none;
    }

    .form-submit-btn {
      margin-top: 20px;
    }

    button.ghost {
      background: transparent;
      border-color: #fff;
    }

    .form-container {
      position: absolute;
      top: 0;
      height: 100%;
      transition: all 0.6s ease-in-out;
    }

    .sign-in-container {
      left: 0;
      width: 50%;
      z-index: 2;
    }

    .sign-up-container {
      left: 0;
      width: 50%;
      z-index: 1;
      opacity: 0;
    }

    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform 0.6s ease-in-out;
      z-index: 100;
    }

    .overlay {
      height: 100%;
      color: #fff;
      position: relative;
      left: -100%;
      width: 200%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
    }

    .overlay-panel {
      position: absolute;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0 40px;
      height: 100%;
      width: 50%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
    }

    .overlay-panel button,
    .overlay-panel button {
      color: #fff !important;
      background-color: transparent !important;
      border-color: #fff !important;
    }

    .overlay-right {
      right: 0;
      transform: translateX(0);
    }

    .overlay-left {
      transform: translateX(-20%);
    }

    .ant-form-item-control-input-content {
      justify-content: space-between;
      display: flex;
      font-size: 14px;
    }

    /* Animations */
    /* move signin to the right */
    .auth-container.right-panel-active .sign-in-container {
      transform: translateX(100%);
    }

    /* Move overlay to the left */
    .auth-container.right-panel-active .overlay-container {
      transform: translateX(-100%);
    }

    /* Bring signup over signin */
    .auth-container.right-panel-active .sign-up-container {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
    }

    /* move overlay back to the right */
    .auth-container.right-panel-active .overlay {
      transform: translateX(50%);
    }

    .auth-container.right-panel-active .overlay-left {
      transform: translateX(0);
    }

    .auth-container.right-panel-active .overlay-right {
      transform: translateX(20%);
    }
  }
`;
