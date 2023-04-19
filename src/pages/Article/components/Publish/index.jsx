import React, { useEffect, useEffetc, useRef, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Radio,
  Upload,
  Message,
  message,
} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.less';
import { useStore } from '../../../../store';
import { observer } from 'mobx-react-lite';
import { useNavigate, useSearchParams } from 'react-router-dom';
import heimaAxios from '../../../../utils/heimaAxios';

export default observer(function Publish() {
  const navigate = useNavigate();
  const { channelStore } = useStore();
  const [value, setValue] = useState('');
  const [fileList, setFileList] = useState([]);

  // 上传图片
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const cacheList = useRef();
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    const formatList = fileList.map((file) => {
      if (file.response) {
        console.log(file.response.data.url);
        return {
          url: file.response.data.url,
        };
      }
      return file;
    });
    setFileList(formatList);
    cacheList.current = formatList;
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </div>
  );

  // 切换图片
  const [imgCount, setImgCount] = useState(1);
  const onRadioChange = (e) => {
    console.log('radio checked', e.target.value);
    setImgCount(e.target.value);
    if (e.target.value === 1) {
      const firstImg = cacheList.current[0];
      setFileList(!firstImg ? [] : [firstImg]);
      // const fileTemp = cacheList.current ? cacheList.current[0] : []
      // setFileList([fileTemp])
    } else if (e.target.value === 3) {
      setFileList(cacheList.current);
    }
    console.log(fileList);
  };

  // 编辑功能
  const [params] = useSearchParams();
  const id = params.get('id');
  // 数据回填 id调用接口 1.表单回填 2.暂存列表 3.Upload组件fileList
  // form与组件关联
  const form = useRef(null);
  useEffect(() => {
    const loadDetail = async () => {
      const res = await heimaAxios.get(`/mp/articles/${id}`);
      const data = res.data;
      form.current.setFieldsValue({ ...data, type: data.cover.type });
      const imageList = data.cover.images.map((url) => ({ url }));

      setFileList(imageList);
      cacheList.current = imageList;
      console.log(cacheList.current);
    };
    if (id) {
      loadDetail();
    }
  }, [id]);

  const onFinish = async (values) => {
    console.log(values);
    const { title, channel_id, type, content } = values;
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map((item) => item.url),
      },
    };
    if (id) {
      await heimaAxios.put(`/mp/articles/${params.id}?draft=false`, params);
    } else {
      await heimaAxios.post('/mp/articles?draft=false', params);
    }
    navigate('/article/query');
    message.success('发布成功');
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
        type: 1,
      }}
      onFinish={onFinish}
      ref={form}>
      <Form.Item
        label="标题"
        name="title"
        rules={[
          {
            required: true,
            message: '请输入文章标题',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="频道"
        name="channel_id"
        rules={[
          {
            required: true,
            message: '请选择文章频道',
          },
        ]}>
        <Select>
          {channelStore.channelList.map((channel) => (
            <Select.Option value={channel.id} key={channel.id}>
              {channel.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="封面">
        <Form.Item name="type">
          <Radio.Group onChange={onRadioChange} value={imgCount}>
            <Radio value={1}>单图</Radio>
            <Radio value={3}>三图</Radio>
            <Radio value={0}>无图</Radio>
          </Radio.Group>
        </Form.Item>
        {imgCount > 0 && (
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList
            fileList={fileList}
            action="http://geek.itheima.net/v1_0/upload"
            onChange={handleChange}
            multiple={true}
            maxCount={imgCount}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="image"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        )}
      </Form.Item>
      <Form.Item
        label="内容"
        name="content"
        rules={[{ required: true, message: '请输入文章内容' }]}>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button size="large" type="primary" htmlType="submit">
          {id ? '编辑' : '发布'}文章
        </Button>
      </Form.Item>
    </Form>
  );
});
