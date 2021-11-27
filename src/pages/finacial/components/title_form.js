import React,{useImperativeHandle} from "react";
import {Select,Button,Form,DatePicker,Input,InputNumber} from 'antd';
import { reqGetBills } from "../../../api";
import moment from 'moment';

const { RangePicker } = DatePicker;
const {Option}=Select;

const TitleForm=React.forwardRef((props,ref)=>{
    const {funcs}=props;
    const {setData,setLoading,setTotal,setParam}=funcs;
    /*查询账单*/

    const getRecords=async (values)=>{
        setLoading(true);
        const res=await reqGetBills(values);
        if(res.code){
            if(res.data){
                setData(res.data.object);
                setTotal(res.data.pages);
                setLoading(false);
            }
        }else{
            setData([]);
            setTotal(0);
            setLoading(false);
        }
    };

    /*将方法暴露给父组件，供父组件调用*/
    useImperativeHandle(ref,()=>({
        getRecords
    }));

    const handleFinish=async (values)=>{
        const params={};
        for(let i in values){
            if(values[i]){
                if(i==='duration'){
                    //保存格式化之后的日期数组
                    //取出已选择的时间段
                    const duration=values[i];
                    params.startDate=moment(duration[0]).format('YYYY-MM-DD');
                    params.endDate=moment(duration[1]).format('YYYY-MM-DD');
                }else{
                    let idx=i.substr(1);
                    params[idx]=values[i];
                }
            }
        }
        //发送请求查询数据参数对象为params，更新dataSource
        setParam(params);
    }

    return (
        <Form
            onFinish={handleFinish}
            className='manage_inoutcome_form'
        >
            <Form.Item
                name='_nickname'
                className='financial_form_item'
            >
                <Input placeholder='按姓名...' allowClear/>
            </Form.Item>
            <Form.Item
                name='_grade'
                className='financial_form_item'
            >
                <InputNumber placeholder='按年级...'/>
            </Form.Item>
            <Form.Item
                name='_billType'
                className='financial_form_item'
            >
                <Select placeholder='所有数据'>
                    <Option value=''>全部数据</Option>
                    <Option value='收入'>收入</Option>
                    <Option value='支出'>支出</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name='duration'
                className='financial_form_item'
            >
                <RangePicker/>
            </Form.Item>
            <Form.Item
                className='financial_form_item'
            >
                <Button type='primary' htmlType="submit">搜索</Button>
            </Form.Item>
        </Form>
    );
});

export default TitleForm;