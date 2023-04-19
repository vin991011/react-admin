import Login from '@/pages/Login'
import Layout from '@/components/Layout'
import RoleComponent from '@/components/RoleComponent'

import Home from '@/pages/Home'

import Dashboard from '@/pages/Dashboard'
import Analysis from '@/pages/Dashboard/components/Analysis'
import WorkPlatform from '@/pages/Dashboard/components/WorkPlatform'

import Article from './pages/Article'
import ArticleQuery from './pages/Article/components/ArticleQuery'
import Publish from './pages/Article/components/Publish'


import Page404 from '@/pages/404'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  ContainerOutlined
} from '@ant-design/icons'

const routes = [
  {
    path: '/',
    element: <Layout />,
    label: '系统',
    key: 'system',
    icon: <FileOutlined />,
    children: [
      {
        index: true,
        // path: '/',
        element: <Home />,
        label: '首页',
        key: '/',
        icon: <PieChartOutlined />
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        label: 'Dashboard',
        key: '/dashboard',
        icon: <UserOutlined />,
        children: [
          // {
          //   index: true,
          //   element: <Analysis />,
          //   // label: '分析页',
          //   key: 'analysis',
          //   // icon: <TeamOutlined />,
          //   hideMenu: true
          // },
          {
            path: 'analysis',
            element: <RoleComponent><Analysis /></RoleComponent>,
            label: '分析页',
            key: '/dashboard/analysis',
            icon: <TeamOutlined />,
            hideMenu: JSON.parse(localStorage.getItem('user'))?.userInfo.role === 'admin' ? false : true
          },
          {
            path: 'work-platform',
            element: <WorkPlatform />,
            label: '工作台',
            key: '/dashboard/work-platform',
            icon: <DesktopOutlined />,
          }
        ]
      },
      {
        path: '/article',
        element: <Article />,
        label: '文章页面',
        key: '/article',
        icon: <UserOutlined />,
        children: [
          {
            path: 'query',
            element: <ArticleQuery />,
            label: '文章查询',
            key: '/article/query',
            icon: <ContainerOutlined />
          },
          {
            path: 'publish',
            element: <Publish />,
            label: '文章发布',
            key: '/article/publish',
            icon: <ContainerOutlined />
          }
        ]
      }
    ],
  },
  {
    path: '/login',
    element: <Login />,
    label: '登录',
    key: '/login',
    icon: <DesktopOutlined />
  },
  {
    path: '*',
    element: <Page404 />,
    label: '404',
    key: '404',
    icon: <TeamOutlined />
  }
]
export default routes
