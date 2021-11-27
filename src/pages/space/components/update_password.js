import React,{useRef} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Form,Input,message} from 'antd';
import { reqChangePsd } from "../../../api";
import storageUtils from "../../../utils/storageUtils";
import './index.less';

const PasswordForm=(props)=>{
    const {userid,username}=storageUtils.getUser();
    const formRef=useRef();

    const layoutCol={
        labelCol:{span:4},
        wrapperCol:{span:20}
    }

    const handleFinish=async (values)=>{
        const {newPassword,password,confirmpsd}=values;
        if(newPassword!==confirmpsd){
            message.warning('密码不一致');
            formRef.current.setFieldsValue({
                password,
                newPassword,
                confirmpsd:''
            });
        }else{
            //发送请求修改密码
            const params={
                userid,
                username,
                password,
                newPassword
            }
            //发送请求修改密码
            const res=await reqChangePsd(params);
            if(res.code===1){
                message.warning('密码已修改，请重新登录');
                formRef.current.resetFields();
                storageUtils.removeUser();
                //跳转登录页面
                props.history.replace('/login');
            }else{
                message.error(res.msg);
            }
        }
    }

    return (
        <div className='psd_wrapper'>
            <Form 
            className='psd_content' 
            {...layoutCol}
            ref={formRef}
            onFinish={handleFinish}
            >
                <Form.Item
                    label='原密码'
                    name='password'
                    rules={[
                        {required:true,message:'请输入...'}
                    ]}
                >
                    <Input.Password placeholder="请输入..." />
                </Form.Item>
                <Form.Item
                    label='新密码'
                    name='newPassword'
                    rules={[
                        {required:true,message:'请输入...'}
                    ]}
                >
                    <Input.Password placeholder="请输入..." />
                </Form.Item>
                <Form.Item
                    label='确认密码'
                    name='confirmpsd'
                    rules={[
                        {required:true,message:'请输入...'}
                    ]}
                >
                    <Input.Password placeholder="请输入..." />
                </Form.Item>
                <Form.Item>
                    <Button 
                    type='primary' 
                    style={{marginLeft:'82px'}}
                    onClick={()=>{props.history.goBack()}}
                    >取消</Button>
                    <Button 
                    htmlType='submit' 
                    type='primary' 
                    style={{marginLeft:'10px'}}
                    >修改</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default withRouter(PasswordForm);