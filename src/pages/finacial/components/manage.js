import React,{useState,useRef,useEffect} from "react";
import { Card,Table,Button} from "antd";
import './index.less';
import moment from 'moment';
import {Modal,message} from 'antd';
import AddUpdate from './add_update';
import TitleForm from "./title_form";
import FooterCon from "./footer";
import {PAGE_SIZE} from '../../../utils/constants';
import { reqAddBills,reqModifyBills } from "../../../api";

export default function Manage(){
    const [isvisible, setisvisible] = useState(false);
    const [isadd, setisadd] = useState(false);
    const [cur, setcur] = useState({});
    const [records, setrecords] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [total, settotal] = useState();
    const formRef=useRef();//加在子组件的Form上
    const searchRef=useRef();
    const [param, setparam] = useState({nickname:'',grade:'',billType:''});
    const [curpage, setcurpage] = useState(1);//当前页码
    const [billid, setbillid] = useState();
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

    //修改记录
    const handleModify=(values)=>{
        setbillid(values.billid);
        //调用子组件的visibleAdd方法改变状态
        setisvisible(true);
        setisadd(false);
        setcur(values);
    }

    //添加记录
    const handleAdd=()=>{
        setisvisible(true);
        setisadd(true);
    }

    //修改/添加成功后的回调
    const addUpdateSuccess=(msg)=>{
        //重新获取余额信息
        footerRef.current.initBill();
        //重新获取表格数据
        const values={...param,pageSize:PAGE_SIZE,pageNum:1};
        searchRef.current.getRecords(values);  
        message.success(msg);
        setisvisible(false);
    }

    //关闭Modal
    //添加/修改记录
    const handleOk=async ()=>{
        //先进行表单验证
        const data=await formRef.current.validateFields().catch(err=>console.log(err));
        if(data){
            const {billTime}=data; 
            data.billTime=moment(billTime).format('YYYY-MM-DD');

            if(isadd){
                //发送请求添加
                const res=await reqAddBills(data);
                if(res.code){
                    addUpdateSuccess('添加成功');
                }
            }else{
                //修改数据
                const res=await reqModifyBills({...data,billid});
                if(res.code){
                    addUpdateSuccess('修改成功');
                }else{
                    message.warning(res.msg);
                }
            }
        }
    }

    const handleCancel=()=>{
        setisvisible(false);
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
        },
        {
            title:'操作',
            align:'center',
            render:values=>{
                return (
                    <div className='manage_operation'>
                        <span onClick={()=>{handleModify(values)}}>修改</span>
                    </div>
                );
            }
        }
    ];

    const title=(

        <TitleForm funcs={{setData,setLoading,setTotal,setParam}} param={param} ref={searchRef}/>
    );

    const extra=(
        <Button type='primary' onClick={handleAdd}>添加</Button>
    );

    const footer=(
        <FooterCon ref={footerRef}/>
    );

    return (
        <div className='card_item'>
            <Card 
                title={title} 
                extra={extra}
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
            <Modal 
                title={isadd?'添加记录':'修改记录'}
                visible={isvisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
                okText='确定'
                cancelText='取消'
                className='manage_modal'
            >
                <AddUpdate ref={formRef} isadd={isadd} cur={cur}/>
            </Modal>
        </div>
    );
}
