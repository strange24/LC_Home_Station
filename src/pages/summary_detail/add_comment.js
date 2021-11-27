import React,{useReducer } from "react";
import { Form, Button,  Input, message } from 'antd';
import storageUtils from "../../utils/storageUtils";
import { reqAddComment } from "../../api";

const { TextArea } = Input;


const Editor = ({ onChange, onSubmit, submitting, value,parentNickname }) => (
  <>
    <Form.Item>
      <TextArea 
      rows={4} 
      onChange={onChange} 
      value={value} 
      placeholder={parentNickname?'回复'+parentNickname+':':'请输入...'}
      />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        发送
      </Button>
    </Form.Item>
  </>
);

const AddComment=(props)=>{
  const {replyobj,getComments,getThumbs}=props;
  const {parentCommentid,parentNickname,summaryid}=replyobj;

  const initialState={comments:[],submitting:false,value:''};

    const reducer=(state,action)=>{
        const {type,comments,submitting,value}=action;
        switch(type){
            case 'value':
                return {...state,value};
            case 'submit':
                return {...state,submitting};
            case 'whole':
                return {comments,value,submitting};
            default:
                return state;
        }
    }

    const [state,dispatch]=useReducer(reducer,initialState);


    const handleSubmit =async () => {
        if (!state.value) {
          return;
        }

        //准备添加评论的参数
        const userid=storageUtils.getUser().userid;
        const params={userid,summaryid,content:state.value,parentCommentid};

        // 发送请求添加评论
        const res=await reqAddComment(params);
        if(res.code){
          //重新获取评论
          getComments();
          //重新获取评论数
          getThumbs(summaryid);
          //重置textArea
          dispatch({type:'value',value:''});
        }else{
          message.error('评论失败');
        }
    };
    
    const handleChange = e => {
        dispatch({type:'value',value:e.target.value});
    };

    const { submitting, value } =state;

    return (
        <Editor
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitting={submitting}
        value={value}
        parentNickname={parentNickname}
        />
    );
}

export default AddComment;
