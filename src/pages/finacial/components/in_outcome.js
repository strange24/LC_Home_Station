import React,{useState,useRef,useEffect} from "react";
import { Card,Table} from "antd";
import './index.less';
import moment from 'moment';
import TitleForm from "./title_form";
import FooterCon from "./footer";
import {PAGE_SIZE} from '../../../utils/constants';

export default function InOutcome(){
    const [records, setrecords] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [total, settotal] = useState();
    const searchRef=useRef();
    const [param, setparam] = useState({nickname:'',grade:'',billType:''});
    const [curpage, setcurpage] = useState(1);//当前页码
    const footerRef=useRef();

    //供子组件调用
    const setData=(value)=>{
        setrecords(value);
    }

    //供子组件修改loading状态
    const setLoading=(value)=>{
        setisloading(value);
    }

    //设置总条数
    const setTotal=(total_page)=>{
        settotal(total_page*PAGE_SIZE);
    }

    //调用子组件的getRecords方法获取分页数据
    const handleGetPageData=(cur)=>{
        setcurpage(cur);
        const values={...param,pageSize:PAGE_SIZE,pageNum:cur};
        searchRef.current.getRecords(values);
    }

    useEffect(()=>{
        setcurpage(1);
        const values={...param,pageSize:PAGE_SIZE,pageNum:1};
        searchRef.current.getRecords(values);  
    },[param]);

    //修改搜索的参数
    const setParam=(value)=>{
        setparam(value);
    }

    const columns = [
        {
            title: '序号',
            dataIndex: 'billid',
            align:'center'
        },
        {
        title: '姓名',
        dataIndex: 'nickname',
        align:'center'
        },
        {
        title: '年级',
        dataIndex: 'grade',
        align:'center',
        render:grade=>grade+'级'
        },
        {
            title: '交易描述',
            dataIndex: 'billDescribe',
            align:'center'
        },
        {
            title: '交易类型',
            dataIndex: 'billType',
            align:'center'
        },
        {
            title: '金额(元)',
            align:'center',
            render:item=>(
                item.billType==='支出'?<span style={{color:'red'}}>-{item.billMoney}</span>:
                <span style={{color:'#01ac01'}}>+{item.billMoney}</span>
            )
        },
        {
            title: '交易日期',
            dataIndex: 'billTime',
            align:'center',
            render:billTime=>moment(billTime).format('YYYY-MM-DD')
        }
    ];

    const title=(

        <TitleForm funcs={{setData,setLoading,setTotal,setParam}} param={param} ref={searchRef}/>
    );

    const footer=(
        <FooterCon ref={footerRef}/>
    );

    return (
        <div className='card_item'>
            <Card 
                title={title} 
                className='financial_record'
                style={{height:'calc(100% - 30px)'}}
            >
                <Table 
                    dataSource={records} 
                    columns={columns} 
                    bordered
                    loading={isloading}
                    footer={()=>footer}
                    rowKey='billid'
                    pagination={{
                        total:total,
                        current:curpage,
                        pageSize:PAGE_SIZE,
                        onChange:handleGetPageData
                    }}
                />
            </Card>
        </div>
    );
}
