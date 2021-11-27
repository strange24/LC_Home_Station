import React from 'react';
import { Form, Input, Button ,Select , message} from 'antd';
import { useHistory } from 'react-router';
import {reqAddRewardPunish,reqUpdateRewardPunish} from '../../api';
const { Option } = Select;

function RewardPunishAdd(info) {
    const old=info.location.state||{};
    let history=useHistory();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
      };
    const onFinish = async(values) => {
      if(old.nickname){
        const rp={
          rewardpunishState:values.rewardpunishState,
          rewardpunishDescription:values.rewardpunishDescription,
          grade:values.grade,
          rewardpunishid:old.rewardpunishid
        }
        console.log(rp);
        console.log(values);
        const result=await reqUpdateRewardPunish(rp);
        if(result.code===1){
          message.success('修改成功');
          history.goBack();
        }else{
          message.error('修改失败');
        }
      }else{
        const result=await reqAddRewardPunish(values);
        if(result.code===1){
          message.success('添加成功');
          history.goBack();
        }else{
          message.error(result.message);
        }
      }
      };
    return (
        <Form 
        {...layout} 
        name="nest-messages" 
        onFinish={onFinish}  
        style={{marginTop:120,marginRight:80}} 
        initialValues={old}
        >
        <Form.Item name='nickname' label="姓名" rules={[{ required: true ,message:'必须填入姓名'}]}>
          <Input disabled={!!old.nickname}/>
        </Form.Item>
        <Form.Item  label="类型" name='rewardpunishState'>
          <Select   key={old.rewardpunishState} allowClear >
                <Option value={0} >奖励</Option>
                <Option value={1} >惩罚</Option>
            </Select> 
        </Form.Item>
        <Form.Item name='grade' label="年级" rules={[{ required: true ,message:'必须填入年级'}]}>
          <Input />
        </Form.Item>
        <Form.Item name='rewardpunishDescription' label="描述" rules={[{ required: true,message:'必须填入描述' }]}>
            <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button style={{marginLeft:20}} onClick={()=>history.goBack()}>取消</Button>
        </Form.Item>
      </Form>
    );
}
export default RewardPunishAdd;