import React from 'react';
import { Input,Form } from 'antd';

const { TextArea } = Input;

const WriteArea=React.forwardRef((props,ref)=>{
    return (
        <Form ref={ref}>
            <p style={{color:'#fff'}}>添加goal</p>
            <Form.Item 
            name='goalContent'
            rules={[
                {required:true,message:'必须输入'},
                {max:60,message:'不能超过60个字'}
            ]}
            >
                <TextArea placeholder='请输入...'  autoSize={{ minRows: 3, maxRows: 6 }}/>
            </Form.Item>
        </Form>
    )
});

export default WriteArea;