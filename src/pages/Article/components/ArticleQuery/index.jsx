import React, { useState, useEffect, Fragment } from 'react';
import {
  Tag,
  Table,
  Button,
  Form,
  Radio,
  Select,
  DatePicker,
  Space,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useStore } from '../../../../store';
import { Option } from 'antd/lib/mentions';
import heimaAxios from '../../../../utils/heimaAxios';
import locale from 'antd/es/date-picker/locale/zh_CN';
import imgError from '../../../../assets/img/imgError.png';
import { useNavigate } from 'react-router-dom';

export default function ArticleQuery() {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const { channelStore } = useStore();
  channelStore.loadChannelList();
  const [radioValue, setRadioValue] = useState(1);
  const radioOnChange = (e) => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };
  // 文章数据
  const [articleList, setArticleList] = useState({
    list: [],
    count: 0,
  });
  // 文章分页参数
  const [params, setParams] = useState({
    page: 1,
    per_page: 5,
    status: 0,
  });

  useEffect(() => {
    const loadList = async () => {
      const res = await heimaAxios.get('mp/articles', { params });
      console.log(res);
      const { results, total_count } = res.data;
      setArticleList({
        list: results,
        count: total_count,
      });
    };
    loadList();
  }, [params]);
  // 翻页
  const pageChange = (page) => {
    setParams({
      ...params,
      page,
    });
  };

  const onFinish = (values) => {
    const { status, channel_id, data } = values;
    // 数据处理
    const _params = {};
    if (status !== -1) {
      _params.status = status;
    }
    if (channel_id) {
      _params.channel_id = channel_id;
    }
    if (data) {
      _params.begin_data = data[0].format('YYYY-MM-DD');
      _params.end_data = data[1].format('YYYY-MM-DD');
    }
    setParams({
      ...params,
      ..._params,
    });
  };

  const onDelect = async (data) => {
    await heimaAxios.delete(`/mp/articles/${data.id}`);
    setParams({
      ...params,
      page: 1,
    });
  };

  const goPublish = (data) => {
    navigate(`/article/publish?id=${data.id}`);
  };

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover) => {
        return (
          <img
            src={cover.images[0] || imgError}
            width={80}
            height={60}
            alt=""
          />
        );
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined onClick={() => goPublish(data)} />}
            />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined onClick={() => onDelect(data)} />}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Form onFinish={onFinish} initialValues={{ status: null }}>
        <Form.Item label="状态" name="status">
          <Radio.Group onChange={radioOnChange} value={radioValue}>
            <Radio value={null}>全部</Radio>
            <Radio value={0}>草稿</Radio>
            <Radio value={1}>待审核</Radio>
            <Radio value={2}>审核通过</Radio>
            <Radio value={3}>审核失败</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="类型" name="channel_id">
          <Select
            placeholder="请选择文章类型"
            style={{
              width: 150,
            }}>
            {channelStore.channelList.map((channel) => (
              <Select.Option value={channel.id} key={channel.id}>
                {channel.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="日期" name="data">
          <RangePicker locale={locale} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
            筛选
          </Button>
        </Form.Item>
      </Form>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={articleList.list}
        pagination={{
          defaultCurrent: 1,
          pageSize: params.per_page,
          total: articleList.count,
          onChange: pageChange,
        }}></Table>
    </Fragment>
  );
}
