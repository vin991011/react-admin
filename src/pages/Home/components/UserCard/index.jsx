import React from 'react';
import { Avatar } from 'antd';
import './index.less';
const xiduo = require('@/assets/img/喜多.png');

export default function Details(props) {
  const { positionDetails } = props;
  function toGreetingForTime() {
    const curTime = new Date().getHours();
    return curTime >= 5 && curTime <= 12
      ? '早上好'
      : curTime >= 12 && curTime <= 18
      ? '下午好'
      : '晚上好';
  }
  return (
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
  );
}
