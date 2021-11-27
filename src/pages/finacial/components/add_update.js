import React,{useEffect} from "react";
import { Form,Input,Select,DatePicker } from "antd";
import moment from "moment";

const {Option}=Select;
const {TextArea}=Input;

const AddUpdate=React.forwardRef((props,formRef)=>{
    const {cur,isadd}=props;
    const {nickname,billType,billMoney,grade,billDescribe,billTime}=cur;

    //自定义校验验证金额
    const validateMoney=async (_,value)=>{
        if(value<0){
            return Promise.reject('不能小于0');
        }
    }

    const layoutCol={
        labelCol:{span:4},
        wrapperCol:{span:18}
    }

    /*设置/重置表单数据*/
    const resetForm=()=>{
        formRef.current.setFieldsValue(isadd?{
            billType:'收入',
            grade:2019,
            billTime:moment(),
            nickname:'',
            billDescribe:'',
            billMoney:null
        }:{
            nickname,
            billType,
            grade,
            billTime:moment(billTime),
            billDescribe,
            billMoney
        });
    }

    /*重置Form，暴露给父组件*/

    useEffect(()=>{
        resetForm();
    });

    return (
        <Form
            {...layoutCol}
            ref={formRef}
        >
            <Form.Item
                name='nickname'
                label='姓名'
                rules={[
                    {required:true,message:'必须输入'}
                ]}
            >
                <Input placeholder='请输入...'/>
            </Form.Item>
            <Form.Item
                name='grade'
                label='年级'
                rules={[
                    {required:true,message:'必须输入'},
                    {
                        validator:validateMoney
                    }
                ]}
            >
                <Input type='number' placeholder='请输入...'/>
            </Form.Item>
            <Form.Item
                name='billDescribe'
                label='交易描述'
                rules={[
                    {required:true,message:'必须输入'}
                ]}
            >
                <TextArea
                    placeholder="请输入..."
                    autoSize={{ minRows: 2, maxRows: 4 }}
                />
            </Form.Item>
            <Form.Item
                name='billType'
                label='交易类型'
            >
                <Select placeholder='请选择'>
                    <Option value='收入'>收入</Option>
                    <Option value='支出'>支出</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name='billMoney'
                label='金额'
                rules={[
                    {required:true,message:'必须输入'},
                    {
                        validator:validateMoney
                    }
                ]}
            >
                <Input type='number' placeholder='请输入...'/>
            </Form.Item>
            <Form.Item
                name='billTime'
                label='日期'
                rules={[
                    {required:true,message:'必须输入'}
                ]}
            >
                <DatePicker/>
            </Form.Item>
        </Form>
    
    );
});

export default AddUpdate;