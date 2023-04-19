import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import MyHeader from '@/components/Header';
import MySider from '@/components/Sider';
import MyContent from '@/components/Content';
import MyFooter from '@/components/Footer';
import AuthComponent from '@/components/AuthComponent';
import { useStore } from '../../store';
import './index.less';

export default function Index() {
  const { channelStore } = useStore();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    channelStore.loadChannelList();
  }, [channelStore]);
  return (
    <AuthComponent>
      <Layout style={{ minHeight: '100vh' }}>
        <MySider collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout>
          <MyHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <MyContent>
            <Outlet />
          </MyContent>
          <MyFooter />
        </Layout>
      </Layout>
    </AuthComponent>
  );
}
