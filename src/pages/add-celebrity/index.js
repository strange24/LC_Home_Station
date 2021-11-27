import React,{useRef} from 'react';
import {Form,Input,Button, message} from 'antd';
import {PicturesWall} from '../../components/pictures-wall';
import {reqAddCelebrity,reqUpdateCelebrities} from '../../api';
import { useHistory } from 'react-router';
export default function AddCelebrity(info){
    const celebrity=info.location.state?info.location.state:{};
    let history=useHistory();
    const pw=useRef();
    const [form]=Form.useForm();
    const onFinish = async(values) => {
        values.celebrityPhoto=pw.current.getImgs();
        if(celebrity.celebrityid){
            values.celebrityid=celebrity.celebrityid;
            const result=await reqUpdateCelebrities(values);
            if(result.code===1){
                message.success('修改成功');
                history.goBack();
            }else{
                message.error(result.msg);
            }
        }else{
            const result=await reqAddCelebrity(values);
            if(result.code===1){
                message.success('添加成功');
                history.goBack();
                form.resetFields();
            }else{
                message.error('添加失败');
            }
        }   
    };
    const backToManage=()=>{
        history.goBack();
    }
    return (
        <div>
            <Form
            form={form}
            style={{width:'70%',margin:'100px 10%'}}
            bordered='true'
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            // initialValues={{
            //     remember: true,
            // }}
            initialValues={celebrity}
            onFinish={onFinish}
            autoComplete="off"
            >
            <Form.Item
                label="姓名"
                name="celebrityName"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="年级"
                name="celebrityGrade"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="简介"
                name="celebrityIntroduction"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="寄语"
                name="celebrityTalk"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item label='照片'>
                <PicturesWall ref={pw}  img={celebrity.celebrityPhoto}/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                offset: 8,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                提交
                </Button>
                <Button type="primary" style={{marginLeft:20}} onClick={backToManage}>
                取消
                </Button>
            </Form.Item>
            </Form>
        </div>
    );
}