import React, { Fragment } from 'react';
import { Avatar, Card } from 'antd';
import LineChart from '@/components/LineChart';
import './index.less';
const react = require('@/assets/img/react.png');
const vue = require('@/assets/img/Vue.png');
const pytorch = require('@/assets/img/pytorch.png');
const mysql = require('@/assets/img/mysql.png');
const antd = require('@/assets/img/antd.png');
const springboot = require('@/assets/img/springboot.png');
const xiduo = require('@/assets/img/喜多.png');
const band = require('@/assets/img/结束.png');
const dragon = require('@/assets/img/dragon.png');
const xiaochuan = require('@/assets/img/孙笑川.png');
const jiaran = require('@/assets/img/嘉然.png');

const gridStyle = {
  width: '33.3333%',
  height: '150px',
};
export default function workPlatform() {
  const projectItems = [
    {
      avatar: react,
      name: 'React',
      description: 'React 天下第一！',
    },
    {
      avatar: vue,
      name: 'Vue',
      description: '国内最流行的前端框架之一！',
    },
    {
      avatar: antd,
      name: 'Ant Design',
      description: '国内React最流行的UI库之一。',
    },
    {
      avatar: pytorch,
      name: 'pytorch',
      description: 'meta公司开源的深度学习框架。',
    },
    {
      avatar: springboot,
      name: 'springboot',
      description: 'java后端最流行的框架！',
    },
    {
      avatar: mysql,
      name: 'mysql',
      description: '年轻人的第一款数据库！',
    },
  ];
  const teams = [
    {
      avatar: band,
      name: '结束乐队',
    },
    {
      avatar: springboot,
      name: '后端开发组',
    },
    {
      avatar: dragon,
      name: '福州真龙',
    },
    {
      avatar: react,
      name: '前端开发组',
    },
    {
      avatar: jiaran,
      name: '嘉然今天吃什么',
    },
    {
      avatar: xiaochuan,
      name: '笑一笑就好',
    },
  ];
  function toGreetingForTime() {
    const curTime = new Date().getHours();
    return curTime >= 5 && curTime <= 12
      ? '早上好'
      : curTime >= 12 && curTime <= 18
      ? '下午好'
      : '晚上好';
  }
  return (
    <Fragment>
      <div className="work-platform">
        <h2 style={{ fontWeight: 'bold', color: 'var(--font-color)' }}>
          数据展示台
        </h2>
        <div className="work-header">
          <div className="work-header-userinfo">
            <div className="userinfo">
              <div className="useravatar">
                <Avatar size={65} src={xiduo} />
              </div>
              <div className="details">
                <h2 style={{ marginBottom: '3px', color: 'var(--font-color)' }}>
                  {toGreetingForTime()}，XXX，开启新的一天
                </h2>
                <div style={{ fontSize: '16px' }}>
                  Developer | XX信息公司－技术开发部－前端开发工程师
                </div>
              </div>
            </div>
            <ul className="userrank">
              <li>
                <div className="intro">任务数</div>
                <h2>03</h2>
              </li>
              <li className="intro">
                <div className="intro">已完成</div>
                <h2>17</h2>
              </li>
              <li className="intro">
                <div className="intro">成就点</div>
                <h2>1788</h2>
              </li>
            </ul>
          </div>
        </div>
        <div className="work-main">
          <div className="code-chart">
            <LineChart />
          </div>
          <div className="project">
            <Card title="正在进行中的项目" className="project-items">
              {projectItems.map((item) => {
                return (
                  <Card.Grid style={gridStyle} key={Math.random()}>
                    <Avatar size={33} src={item.avatar} />
                    <span
                      style={{
                        paddingLeft: '10px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}>
                      {item.name}
                    </span>
                    <div style={{ marginTop: '10px' }}>{item.description}</div>
                  </Card.Grid>
                );
              })}
            </Card>
            <Card bordered={false} title="团队" className="team-items">
              {teams.map((item) => {
                return (
                  <p key={Math.random()}>
                    <Avatar size={33} src={item.avatar} />
                    <span>{item.name}</span>
                  </p>
                );
              })}
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
