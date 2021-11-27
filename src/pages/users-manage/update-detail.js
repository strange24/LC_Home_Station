import React, { useEffect, useState } from 'react';
import { Form, Input, Select  } from 'antd';
const { Option } = Select;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
export const  UpdateDetail=React.forwardRef((user,ref) =>{

    const [form]=Form.useForm();
    const [users,setUsers]=useState({});
       useEffect(()=>{
          setUsers(user.user);
        },[user])
        const onFinish = (values) => {
          console.log(values);
        };
        const handlechange=(value)=>{
            console.log(value);
        }
        form.setFieldsValue({
            username:users.username,
            nickname:users.nickname,
            phone:users.phone,
            email:users.email,
            grade:users.grade,
            avatar:users.avatar,
            role:users.role,
        })
        if(user.user.role===0){
            user.user.role="普通用户"
        }else if(user.user.role===1){
            user.user.role="团队成员"
        }else if(user.user.role===2){
            user.user.role="管理员"
        }
   return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} ref={ref} initialValues={user.user} form={form}>
            <Form.Item
                label="用户名"
                name="username"
            >
                <Input   disabled />
            </Form.Item>
            <Form.Item
                label="真实姓名"
                name="nickname"
            >
                <Input disabled={!users.isUpdate}  />
            </Form.Item>
            <Form.Item
                label="年级"
                name="grade"
                rules={[
                ]}
            >
                <Input disabled={!users.isUpdate} value={users.grade} />
            </Form.Item>
            <Form.Item
                label="电话"
                name="phone"
                rules={[
                ]}
            >
                <Input disabled={!users.isUpdate} value={users.phone} />
            </Form.Item>
            <Form.Item
                label="邮箱"
                name="email"
                rules={[
                    {type:'email',message:'请输入正确的邮箱格式'}
                ]}
            >
                <Input disabled={!users.isUpdate} value={users.email} />
            </Form.Item>
            {/* <Form.Item
                label="头像"
                name="avatar"
            >
               <PicturesWall  imgs={users.avatar} disabled={!users.isUpdate} ref={pw}/>
            </Form.Item> */}
            <Form.Item  label="角色" name='role' >
            <Select  onChange={(value)=>handlechange(value)} style={{ width: 120 }}  allowClear >
                <Option value="普通用户" disabled={!users.isUpdate}>普通用户</Option>
                <Option value="团队成员" disabled={!users.isUpdate}>团队成员</Option>
                <Option value="管理员" disabled={!users.isUpdate}>管理员</Option>
            </Select> 
             </Form.Item>
            </Form>
   )
})