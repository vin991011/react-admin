import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useStore } from '@/store';
import { login } from '@/service/user/user';
import { setLocalStorage } from '@/utils/session';
import { useNavigate } from 'react-router-dom';
import './index.less';
import Password from 'antd/lib/input/Password';
import { observer } from 'mobx-react-lite';

export default observer(function Login() {
  const navigate = useNavigate();
  const { loginStore } = useStore();
  const onFinish = async (values) => {
    const { mobile, code } = values;
    try {
      await loginStore.getToken(mobile, code);
      navigate('/');
      message.success('登录成功');
    } catch (error) {
      message.error(error.response?.data?.message || '登录失败');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="container">
      <Form
        className="box"
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 12,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          label="手机号"
          name="mobile"
          style={{ marginTop: '50px' }}
          rules={[
            {
              required: true,
              message: '请输入手机号！',
            },
          ]}>
          <Input placeholder="13811111111" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="code"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}>
          <Password placeholder="246810" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 11,
            span: 16,
          }}>
          <Button className="login" type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
