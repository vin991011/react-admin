import React from 'react';
import { Layout } from 'antd';
import './index.less';
const { Footer } = Layout;
export default function MyFooter() {
  return (
    <Footer
      style={{
        textAlign: 'center',
        transition: 'all .7s',
      }}>
      React-Admin ©2023 Created by HongTao Fan
    </Footer>
  );
}
