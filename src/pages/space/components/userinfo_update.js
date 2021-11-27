import React ,{useRef}from 'react';
import { Form, Input,  Button, message,Select,InputNumber } from 'antd';
import {PicturesWall} from '../../../components/pictures-wall';
import {reqUpdateUser} from '../../../api';
import {useHistory} from 'react-router';
import PasswordForm from './update_password';
import '../index.less';

function UpdateUserInfo(users) {
    const user=users.location.state;
    const ispsd=user.updatepsd;
    let history=useHistory();
    const pw=useRef();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 },
      };
      const onFinish = async(values) => {
          values.userid=user.userid;
        values.avatar=pw.current.getImgs();
        console.log(values);
        const result=await reqUpdateUser(values);
        if(result.code===1){
            message.success(result.msg);
            history.goBack();
        }else{
            message.error(result.msg);
        }
      };
    return (
        ispsd?(
            <PasswordForm/>
        ):(
            <Form {...layout} name="nest-messages" onFinish={onFinish}  style={{marginTop:20}} initialValues={user}>
                <Form.Item name='nickname' label="真实姓名" >
                    <Input />
                </Form.Item>
                <Form.Item name='grade' label="年级" >
                    <InputNumber style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item name='email' label="邮箱" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='phone' label="电话">
                    <Input />
                </Form.Item>
                <Form.Item  label="角色">
                    <Select defaultValue={user.role===0?'普通用户':'团队成员'} disabled>
                        <Select.Option value='0'>普通用户</Select.Option>
                        <Select.Option value='1'>团队成员</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name='selfIntroduction' label="自我介绍">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name='avatar' label="头像">
                    <PicturesWall  img={user.avatar} ref={pw}/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                    提交
                    </Button>
                    <Button type="primary" style={{marginLeft:20}} onClick={()=>history.goBack()}>取消</Button>
                </Form.Item>
            </Form>
        )
    )
}
export default UpdateUserInfo;