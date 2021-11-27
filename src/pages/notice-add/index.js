import React, { useRef } from 'react';
import {Button, Card, message,Input,Form} from 'antd';
import {reqAddNotice} from '../../api';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory } from 'react-router';
import LinkButton from '../../components/link-button';
import {PicturesWall} from '../../components/pictures-wall';
import  './index.less';
const NoticeAdd=()=>{
    const pw=useRef();
    let history=useHistory();
    const onFinish =async (values) => {
      values.noticeImg=pw.current.getImgs();
      console.log(values);
      const result=await reqAddNotice(values);
        if(result.code===1){
            message.success('添加成功');
            history.goBack();
        }else{
            message.error(result.message);
        }
    };
      const title=(
          <LinkButton style={{fontSize:20}} onClick={()=>history.goBack()}>公告</LinkButton>
      )
    return (
        <Card title={title}  style={{minHeight:'100%'}}>
          <Form onFinish={onFinish} style={{border:'1px solid #eee',padding:'10px'}}>
            <Form.Item name='noticeTitle'>
          <Input 
            placeholder='请输入标题' 
            style={{border:'none',height:50,marginBottom:10,fontSize:'20px'}} 

            >
            </Input>
          </Form.Item>
        <Form.Item name='noticeContent'>
        <Input.TextArea
        placeholder='请输入公告正文' 
         rows={6}
         style={{fontSize:18}}
         />
         </Form.Item>
         <Form.Item className='notice-add'>
          <PicturesWall ref={pw} />
         </Form.Item>

         <Form.Item>
        <Button type='primary' style={{marginTop:10,float:'right'}} htmlType='submit'>发布公告</Button>
        </Form.Item>
        </Form>
        </Card>
    );
}
export default NoticeAdd;