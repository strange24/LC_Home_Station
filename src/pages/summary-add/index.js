import React, { useRef,useEffect,useState } from 'react';
import { Button, Input, message, Form } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { reqAddSummary, reqUpdateSummary } from '../../api';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory } from 'react-router';
import LinkButton from '../../components/link-button';
import storageUtils from '../../utils/storageUtils';
import { reqQueryAvatar } from "../../api";
import {RichImg} from './components/richImg';

function SummaryAddOrUpdate(summary) {
  let history = useHistory();
  const user = storageUtils.getUser();
  const pw = useRef();
  const [avatar, setavatar] = useState('');

  //获取头像
  const getAvatarById=async (id)=>{
    const res=await reqQueryAvatar(id);
    if(res.code===1){
      setavatar(res.data.avatar);
    }
  }

  useEffect(()=>{
    getAvatarById(storageUtils.getUser().userid);
  },[]);

  //发布/修改总结
  const onFinish = async (values) => {
    const info = summary && summary.location.state;
    let userSummary = {
      summaryDetail: values.summaryDetail,
      summaryTitle: values.summaryTitle,
    }
    if (info) {
      const { summaryid } = info;
      userSummary.summaryid = summaryid;
      userSummary.summaryPicture = pw.current.getImgs();

      const result = await reqUpdateSummary(userSummary);
      if (result.code === 1) {
        message.success('修改成功');
        history.goBack();
      } else {
        message.error('修改失败');
      }
    } else {
      userSummary.userid = user.userid;
      userSummary.nickname=user.nickname;

      var pic=pw.current.getImgs();
      userSummary.summaryPicture=pic.join('|');
      userSummary.avatar=avatar;

      const result = await reqAddSummary(userSummary);
      if (result.code === 1) {
        message.success('添加成功');
        history.goBack();
      } else {
        message.error('添加失败');
      }
    }
  };

  return (
    <div>
      <LinkButton style={{ fontSize: 20, margin: 10 }} onClick={() => history.goBack()} ><DoubleLeftOutlined />返回个人空间</LinkButton>
      <Form onFinish={onFinish} style={{ width: '90%', margin: '1% 5%', border: '1px solid #eee', padding: '10px',overflow:'hidden' }} initialValues={summary.location.state || {}}>
        <Form.Item name='summaryTitle'>
          <Input
            placeholder='请输入标题'
            style={{ border: 'none', height: 50, marginBottom: 10, fontSize: '20px' }}
          >
          </Input>
        </Form.Item>

        <Form.Item name='summaryDetail'>
          <Input.TextArea
            placeholder='总结正文'
            rows={8}
            style={{ fontSize: 18 }}
          />
        </Form.Item>
          <RichImg img={summary.location.state && summary.location.state.summaryPicture} ref={pw}/>
        <Form.Item>
          <Button type='primary' style={{ marginTop: 10, float: 'right' }} htmlType='submit' >提交</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default SummaryAddOrUpdate;