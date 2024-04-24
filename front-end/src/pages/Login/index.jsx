import React from "react";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/images/logo-arabica.svg";
import styled from "styled-components";
import { Input, Form, Checkbox, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { PATHS } from "../../layout/Path";
// import { postDataApi } from "../../seviecesApi";
// import { setData } from "../../utils/localStorage";
// import { showToast } from "../../helper/helper";
// import { TYPE_SHOW_NOTI } from "../../helper/const";
// import { API_PATHS } from "../../config/ApiPaths";

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // const { userName, password } = values;
    // const dataUser =
    //   (await postDataApi(API_PATHS.login, {
    //     // userName: "trongdoan",
    //     // password: "123456",
    //     userName: userName.trim(),
    //     password: password.trim(),
    //   })) || {};
    // if (!_.isEmpty(dataUser.data?.user)) {
    //   setData("token", 1);
    //   showToast(TYPE_SHOW_NOTI.success, "Login successful!");
    //   navigate("/");
    // } else {
    //   showToast(TYPE_SHOW_NOTI.err, "Account or password is incorrect");
    // }
  };

  return (
    <ContainerLogin>
      <div className="container">
        <div className="d-flex justify-content-center header-login">
          {/* <img src={logo} alt="logo-arabica" /> */}
          <h3>Shop Clothes</h3>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="User name"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="#">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            &nbsp; Or{" "}
            <span>
              <Link to={PATHS.REGISTER_PAGE}> register now!</Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </ContainerLogin>
  );
}

const ContainerLogin = styled.div`
  height: 100vh;
  /* background-image: url(${(props) => props.bg}); */
  background-repeat: no-repeat;
  background-position: center 10px;
  background-size: 100%;

  .ant-input-affix-wrapper-status-error:not(
      .ant-input-affix-wrapper-disabled
    ):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper,
  .ant-input-affix-wrapper-status-error:not(
      .ant-input-affix-wrapper-disabled
    ):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
    box-shadow: 0 0 0 1px #ff1f1f inset !important;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: initial;
    -webkit-text-fill-color: black !important;
  }

  h3 {
    text-align: center;
    color: #2c2c2c;
    letter-spacing: 0.05em;
    text-shadow: 4px 4px 0px #d5d5d5;
  }

  .header-login {
    padding-top: 5%;
    color: #505050;
    text-shadow: #fff 0 1px;
    font-weight: 600;
    font-size: 33px;
    text-align: center;
    align-items: center;
    font-family: "Bai Jamjuree", "Trebuchet MS", sans-serif;
  }

  .login-form {
    max-width: 700px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  svg {
    color: #584475 !important;
    font-size: 20px;
  }

  .ant-input-affix-wrapper {
    border-color: gray;
    padding: 10px;
    width: 400px;
  }

  input {
    color: rgba(0, 0, 0, 0.85) !important;
    padding-left: 10px !important;
    font-size: 14px !important;
  }

  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-btn-primary {
    background-color: #584475 !important;
    border-color: #584475 !important;
  }

  .ant-btn-primary:hover {
    box-shadow: 0px 5px 25px 11px rgb(6 6 6 / 20%);
    transition: 0.3s ease-in-out;
  }

  @media (max-width: 576px) {
    .ant-input-affix-wrapper {
      width: 300px;
    }
  }
`;
