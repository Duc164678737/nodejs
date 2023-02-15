import { loginRequest } from "../redux/action";
import * as React from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Button, Form, Input } from "antd";

export interface ILoginProps {}
export default function Login({ cookie }: any) {
  const dispatch = useDispatch();

  const router = useRouter();
  
  const onFinish = (values: any) => {
    dispatch(
      loginRequest({
        email: values.username,
        password: values.password,
        callback: () => {router.push('/crud/listUser')}
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const email = useRef<any>();
  const Password = useRef<any>();

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
        className="text-white"
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input ref={email} type="text" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password ref={Password} type="text" />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
    },
    revalidate: 5,
  };
}
