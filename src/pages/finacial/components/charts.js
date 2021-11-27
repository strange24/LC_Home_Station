import React,{useEffect,useState} from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card,Button,message } from "antd";
import {reqBillTotal,reqGetMonthBill} from '../../../api';

export default function Charts(props){
    const [total, settotal] = useState({});
    const [total_bill, settotal_bill] = useState([]);
    //获取总/月账单数据
    const getTotalBills=async(value)=>{
        const res=await Promise.all([reqBillTotal(),reqGetMonthBill()]);
        if(value){
            message.success('已刷新');
        }
        if(res[0].code===1){
            settotal(res[0].data);
        }else{
            settotal([]);
        }
        if(res[1].code===1){
            settotal_bill(res[1].data);
        }else{
            settotal_bill([]);
        }
    }

    useEffect(()=>{
        getTotalBills();
    },[]);

    const getLineOption=(bills)=>{
        let arr=[];
        //后面的月份直接注释掉这一行
        let data=[...bills.splice(2),...bills];
        data.forEach(item=>{
            arr.push({
                month:item.ieid+'月',
                '收入':item.income,
                '支出':item.expend
            })
        })
        return {
            legend: {},
            tooltip: {},
            dataset: {
                dimensions: ['month', '收入', '支出'],
                source: arr
            },
            xAxis: {type: 'category'},
            yAxis: {},
            series: [
                {type: 'bar'},
                {type: 'bar'}
            ]
        };
    }

    const getPieOption=(values)=>{
        const {income,expend}=values;
        return {
            title: {
                text: '总数据统计',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '金额(元)',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        {value: income, name: '总收入'},
                        {value: expend, name: '总支出'},
                        {value: income-expend, name: '余额'},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    }

    const extra=(
        <Button type='primary' onClick={()=>{getTotalBills(true)}}>刷新</Button>
    );

    return (
        <div>
            <Card title='数据统计' extra={extra} className='charts_wrapper'>
                <div className='chart01'>
                    <ReactEcharts option={getLineOption(total_bill)}/>
                </div>
                <div className='chart02'>
                    <ReactEcharts option={getPieOption(total)}/>
                </div>
            </Card>
        </div>

    );
}