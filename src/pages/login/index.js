import React,{useState,useRef} from 'react';
import { Form,Button, Checkbox,Input,message } from "antd";
import "./index.less";
import { UserOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import storageUtils from '../../utils/storageUtils';
import {Redirect} from 'react-router-dom';
import {reqRegister,reqLogin} from '../../api';
import {IMG_URL,IMG_BED_URL} from '../../utils/constants';

export default function Login(props){
    const [isregister, setisregister] = useState(false);
    const formRef=useRef();
    const [img_src, setimg_src] = useState(IMG_URL+'/lc/kaptcha/'+Date.now());

    const onFinish =async (values) => {
        //请求登录
        if(isregister){
            const {username,password,repassword,tryCode}=values;
            if(password!==repassword){
                message.warning('密码不一致');
                formRef.current.setFieldsValue({
                    username,
                    password,
                    tryCode:'',
                    repassword:''
                });  
                //切换验证码
                setimg_src(IMG_URL+'/lc/kaptcha/'+Date.now());
            }else{
                const res=await reqRegister({username,password,tryCode});
                if(res.code===1){
                    message.success('注册成功!');
                    setisregister(false);
                    resetForm();
                    //切换验证码
                    setimg_src(IMG_URL+'/lc/kaptcha/'+Date.now());
                }else{
                    message.warning(res.msg);
                }  
            }
        }else{
            const {username,password,tryCode}=values;
            //发请求登录
            const res=await reqLogin({username,password,tryCode});
            if(res.code===1){
                message.success('登录成功');
                storageUtils.addUser(res.data);
                props.history.replace('/');
            }else{
                message.warning(res.msg);
            }
        }
    };
    
    //重置Form
    const resetForm=()=>{
        formRef.current.resetFields();
    }

    const layoutCol={
        labelCol:{span:5},
        wrapperCol:{span:19}
    }

    if(storageUtils.getUser().username){
        return <Redirect to='/#firstPage'></Redirect>
    }

    //切换登录注册
    const handleLoginRgs=(value)=>{
        setisregister(value);
        resetForm();
        //切换验证码
        setimg_src(IMG_URL+'/lc/kaptcha/'+Date.now());
    }

    return (
        <div className='login_wrapper'>
            <div className='login_box'>
                <div className='login_left animate__animated animate__fadeInRight'>
                    <p className='left_title' onClick={()=>{props.history.replace('/')}}>LeCheng</p>
                    <span className={isregister?'':'selected'} onClick={()=>{handleLoginRgs(false)}}>登录</span> <span style={{fontSize:'21px'}}>/</span>&nbsp; 
                     <span className={isregister?'selected':''} onClick={()=>{handleLoginRgs(true)}}>注册</span>
                    <Form
                        ref={formRef}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        {...layoutCol}
                        >
                        <Form.Item
                            name="username"
                            label='用户名'
                            rules={[
                            {
                                required: true,
                                message: '必须输入!',
                            },
                            ]}
                        >
                            <Input suffix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入..." />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label='密码'
                            rules={[
                                {
                                    required: true,
                                    message: '必须输入!',
                                }
                            ]}
                        >
                            <Input.Password placeholder="请输入..."/>
                        </Form.Item>
                        {
                            isregister?(
                                <Form.Item
                                    name="repassword"
                                    label='确认密码'
                                    rules={[
                                    {
                                        required: true,
                                        message: '必须输入!',
                                    },
                                    ]}
                                >
                                    <Input.Password placeholder="请输入..."/>
                                </Form.Item>
                            ):''
                        }
                        <Form.Item 
                        label='验证码'
                        name='tryCode'
                        rules={[
                            {required:true,message:'必须输入'}
                        ]}
                        wrapperCol={{span:8}}
                        >
                            <Input/>
                        </Form.Item>
                        <img src={img_src} 
                                alt='pic' 
                                className='validate_icon'
                                onClick={()=>{setimg_src(IMG_URL+'/lc/kaptcha/'+Date.now())}}
                        ></img>
                        {
                            isregister?'':(
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住密码</Checkbox>
                                    </Form.Item>

                                    <span className="login-form-forgot" style={{color:'#7546C8'}}>
                                        <QuestionCircleOutlined /> 忘记密码
                                    </span>
                                </Form.Item>
                            )
                        }
                        <Form.Item
                            wrapperCol={{span:24}}
                        >
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {isregister?'注册':'登录'}
                            </Button>
                        </Form.Item>
                        </Form>
                </div>
                <div className='login_right'>
                    <img src={IMG_BED_URL+'logo.png'} alt='avatar'></img>
                    <p className='nickname'>乐程</p>
                    <p>○ Practice makes perfect.</p>
                    <p>○ What's past is prologue.</p>
                    <p>○ Action speaks louder than words.</p>
                </div>
            </div>
        </div>
    );
}