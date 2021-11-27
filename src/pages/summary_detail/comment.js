import React, { Fragment, useState, useEffect, useCallback,useImperativeHandle } from 'react';
import { Comment, Avatar,Modal } from 'antd';
import { IMG_BED_URL, IMG_URL } from '../../utils/constants';
import AddComment from './add_comment';
import { reqGetComments,reqDeleteComment } from "../../api";
import moment from "moment";
import storageUtils from '../../utils/storageUtils';

const CommentPart=React.forwardRef((props,ref)=>{
    const [comments, setcomments] = useState([]);
    const { summaryid,summaryuserid,getThumbs } = props;
    const curuserid = storageUtils.getUser().userid;//当前登录用户的id
    const [replyobj, setreplyobj] = useState({parentCommentid:-1,parentNickname:''});

    //父组件点击评论图标
    const addPureComment=()=>{
        setreplyobj({parentCommentid:-1,parentNickname:''});
    }

    useImperativeHandle(ref,()=>({
        addPureComment
    }))
    
    //获取评论
    const getComments = useCallback(async () => {
        const res = await reqGetComments({ summaryid });
        if (res.code) {
            setcomments(res.data);
        }else{
            setcomments([]);
        }
    }, [summaryid]);

    useEffect(() => {
        getComments();
    }, [getComments]);

    //评论回复
    const handleReply=(values)=>{
        setreplyobj(values);
    }

    //删除评论
    const deleteComment=async (commentid)=>{
        Modal.confirm({
            content: '确定要删除此评论吗？',
            okText:'确定',
            cancelText:'取消',
            onOk:()=>{
                reqDeleteComment(commentid).then(res=>{
                    if(res.code===1){
                        getComments();
                        //重新获取评论数
                        getThumbs(summaryid);
                    }
                }).catch(err=>console.log(err));
            }
        })
    }   

    const CommentItem = (props) => {
        const { children, item } = props;
        const { avatar, commentid, content, createTime, nickname, userid, parentNickname } = item;

        return (
            <Comment
                actions={[
                    summaryuserid===curuserid?(
                        <p key={commentid} style={{ color: '#7546C8' }}>
                            <span 
                            style={{ cursor: 'pointer',fontSize:'13px' }} 
                            onClick={()=>{handleReply({parentNickname:nickname,parentCommentid:commentid})}}
                            >回复</span>
                            <span 
                            style={{ cursor: 'pointer' }}
                            onClick={()=>{deleteComment(commentid)}}
                            >&nbsp;删除</span>
                        </p>
                    ):(
                        <p key={commentid} style={{ color: '#7546C8' }}>
                            <span 
                            style={{ cursor: 'pointer',fontSize:'13px' }} 
                            onClick={()=>{handleReply({parentNickname:nickname,parentCommentid:commentid})}}
                            >回复</span>
                            {
                                userid === curuserid ? (
                                    <span 
                                    style={{ cursor: 'pointer' }}
                                    onClick={()=>{deleteComment(commentid)}}
                                    >&nbsp;删除</span>
                                ) : ''
                            }
                        </p>
                    )
                ]}
                author={<p>{parentNickname?nickname+' 回复 '+parentNickname:nickname}</p>}
                avatar={
                    <Avatar
                        src={avatar ? IMG_URL + avatar : IMG_BED_URL + 'pihua.jpg'}
                        alt='Amethyst'
                    />
                }
                datetime={moment(createTime).format('MM月DD日 HH:mm:ss')}
                content={
                    <p>
                        {content}
                    </p>
                }
            >
                {children}
            </Comment>
        );
    }

    //构造评论标签
    const getCommentsElem = (values) => {
        const arr=values.reduce((pre,cur)=>{
            if (!cur.childComments.length) {
                pre.push(
                    <CommentItem item={cur} key={cur.commentid} />
                )
            } else {
                pre.push(
                    <CommentItem item={cur} key={cur.commentid}>
                        {getCommentsElem(cur.childComments)}
                    </CommentItem>
                )
            }
            return pre;
        },[]);

        return arr;
    }

    //获取评论条数
    const getCommentLength=(arr)=>{
        let len=arr.length;
        arr.forEach(item=>{
            if(item.childComments.length){
                len+=item.childComments.length;
            }
        });
        return len;
    }

    return (
        <Fragment>
            <p>评论{getCommentLength(comments)}</p>
            {comments && getCommentsElem(comments)}
            <div id='add_comment' name='add_comment'>
                <AddComment replyobj={{...replyobj,summaryid}} getComments={getComments} getThumbs={getThumbs}/>  
            </div>
        </Fragment>
    );
})

export default CommentPart;