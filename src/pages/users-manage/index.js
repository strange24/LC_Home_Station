import React, { useEffect, useRef, useState,useCallback } from 'react';
import { reqGetUsers, reqDeleteUsers, reqUpdateUsers } from '../../api';
import { Card, message, Space, Table, Modal, Button, Input } from 'antd';
import LinkButton from '../../components/link-button';
import { UpdateDetail } from './update-detail';
import debThrFunc from '../../utils/debounce_throttle';
import './index.less';

export default function UsersManage() {
  const [role, setRole] = useState(0);
  const [userLists, setUserLists] = useState([]);
  const [showStatus, setShowStatus] = useState(0);
  const [user, setUser] = useState({});
  const [pages, setPages] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [searchGrade, setSearchGrade] = useState();
  const [totals, setTotals] = useState(0);
  const UpdateDetailRef = useRef();
  const pageSize = 10;

  const getAllUsers = async (pageNum,_role) => {
    let req = {
      grade: searchGrade,
      nickname: searchName,
      pageNum: pageNum,
      pageSize: 10,
      role: _role?_role:role
    }
    setLoadingState(true);
    const result = await reqGetUsers(req);
    setLoadingState(false);
    if (result.code === 1) {
      result.data&&setUserLists(result.data.object);
      setTotals(result.data.pages * pageSize);
    } else {
      setUserLists([]);
      setTotals(0);
    }
  }

  const deleteUsers = async (user) => {
    const result = await reqDeleteUsers(user.userid);
    if (result.code === 1) {
      message.success('删除成功');
      getAllUsers(pages);
    } else {
      message.error(result.message);
    }
  }
  const handleCancle = () => {
    setShowStatus(0);
  }
  const updateUser = async () => {
    setShowStatus(0);
    if (user.isUpdate) {
      const newUser = UpdateDetailRef.current.getFieldValue();
      let newRole;
      if (newUser.role === '普通用户') {
        newRole = 0;
      } else if (newUser.role === '团队成员') {
        newRole = 1;
      } else if (newUser.role === '管理员') {
        newRole = 2;
      }
      const updateUser = {
        phone: newUser.phone,
        userid: user.userid,
        nickname: newUser.nickname,
        email: newUser.email,
        avatar: newUser.avatar,
        grade: newUser.grade,
        role: newRole
      }
      const result = await reqUpdateUsers(updateUser);
      if (result.code === 1) {
        message.success('更新用户成功');
        getAllUsers(pages);
      } else {
        message.error(result.message);
      }
    }
  }
  const showDetail = (user) => {
    setShowStatus(1);
    user.isUpdate = false;
    setUser(user);
  }
  const showUpdate = (user) => {
    setShowStatus(1);
    user.isUpdate = true;
    setUser(user);
  }
  const onTabChange = (key) => {
    //避免再次点击同一个tab不发请求的问题
    getAllUsers(1,key);

    setRole(key);
    setPages(1);
    setUserLists([]);
    setSearchGrade();
    setSearchGrade();
  };
  const showModal = (user) => {
    Modal.confirm({
      content: '确认删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        deleteUsers(user);
      }
    })
  }

  const debounce=debThrFunc.debounce_delay((e,isgrade)=>{
    if(isgrade){
      //年级
      setSearchGrade(e.target.value);
    }else{
      //按姓名搜索
      setSearchName(e.target.value);
    }
  },800);

  //改变输入框内容
  const handleChange=useCallback(debounce,[debounce]);


  useEffect(() => {
    getAllUsers(pages);
  }, [pages])// eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      align:'center'
    },
    {
      title: '真实姓名',
      dataIndex: 'nickname',
      align:'center',
      render:value=>value?value:'/'
    },
    {
      title: '年级',
      dataIndex: 'grade',
      align:'center',
      render:value=>value?value:'/'
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      align:'center',
      render:value=>value?value:'/'
    },
    {
      title: '操作',
      align:'center',
      render: (user) => (
        <Space>
          <LinkButton onClick={() => showDetail(user)}>详情</LinkButton>
          <LinkButton onClick={() => showUpdate(user)}>修改</LinkButton>
          <LinkButton onClick={() => showModal(user)}>删除</LinkButton>
        </Space>
      )
    },
  ];
  const tabList = [

    {
      key: '0',
      tab: '普通用户',
    },
    {
      key: '1',
      tab: '团队成员',
    },
    {
      key: '2',
      tab: '管理员',
    },
  ];

  const contentList = {
    0: <Table dataSource={userLists} columns={columns} rowKey='userid' bordered loading={loadingState}
      pagination={{
        onChange: page => {
          setPages(page);
        },
        pageSize: 10,
        total: totals
      }} />,
    1: <Table dataSource={userLists} columns={columns} rowKey='userid' bordered loading={loadingState}
      pagination={{
        onChange: page => {
          setPages(page);
        },
        pageSize: 10,
        total: totals
      }} />,
    2: <Table dataSource={userLists} columns={columns} rowKey='userid' bordered loading={loadingState}
      pagination={{
        onChange: page => {
          setPages(page);
        },
        pageSize: 10,
        total: totals
      }} />,
  };

  const title = (
    <span>
      <Input
        placeholder='按年级...'
        style={{ width: 150, margin: '0 15px' }}
        onChange={(e)=>{handleChange(e,true)}}
      />
      <Input
        placeholder='按姓名...'
        style={{ width: 150, marginRight:'15px'}}
        onChange={(e)=>{handleChange(e,false)}}
      />
      <Button type='primary' onClick={() => getAllUsers(1)}>搜索</Button>
    </span>
  );
  return (
    <div style={{ height: '100%' }}>
      <Card
        className='User-manage'
        style={{ width: '100%', height: "100%" }}
        title={title}
        tabList={tabList}
        onTabChange={key => {
          onTabChange(key);
        }}
      >
        {contentList[role]}
      </Card>
      <Modal
        title="详情"
        visible={showStatus === 1}
        onOk={updateUser}
        onCancel={handleCancle}
        okText="确认"
        cancelText="取消"
      >
        <UpdateDetail user={user} ref={UpdateDetailRef} />
      </Modal>
    </div>
  );
}