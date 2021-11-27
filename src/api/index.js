import {BASE_URL} from '../utils/constants';
import ajax from './ajax';

/*用户注册*/
export const reqRegister=(params)=>ajax(BASE_URL+'/user/register',params,'POST');

/*用户登录*/
export const reqLogin=(params)=>ajax(BASE_URL+'/user/login',params,'POST');

/*获取公告*/
export const reqGetNotice=(params)=>ajax(BASE_URL+'/user/notice/select',params);

/*添加反馈信息*/
export const reqAddFeedback=(params)=>ajax(BASE_URL+'/feedback/insert',params,'POST');

/*获取目标*/
export const reqGetGoals=(params)=>ajax(BASE_URL+'/user/goal/select',params);

/*获取/搜索账单*/
export const reqGetBills=(params)=>ajax(BASE_URL+'/bill/select',params);

/*获取总收入/支出*/
export const reqBillTotal=()=>ajax(BASE_URL+'/bill/ie');

/*添加账单*/
export const reqAddBills=(params)=>ajax(BASE_URL+'/bill/add',params,'POST');

/*修改账单*/
export const reqModifyBills=(params)=>ajax(BASE_URL+'/bill/update',params,'PUT');

/*获取总结*/
export const reqGetTotalSummaries=(params)=>ajax(BASE_URL+'/user/summary/selectAll',params);


/*获取奖惩信息*/
export const reqGetPunish=(params)=>ajax(BASE_URL+'/user/rewardpunish/select',params);

/*获取评论*/
export const reqGetComments=(summaryid)=>ajax(BASE_URL+'/user/comment/select',summaryid);

/*添加评论*/
export const reqAddComment=(params)=>ajax(BASE_URL+'/user/comment/insert',params,'POST');

/*按年级获取名人榜信息*/
export const reqGetCelebrities=(celebrityGrade)=>ajax(BASE_URL+'/user/celebrity/select',celebrityGrade);

// 删除名人
export const reqDeleteCelebrities=(celebrityid)=>ajax(BASE_URL+'/manage/celebrity/delete',{celebrityid},'DELETE');

//修改名人
export const reqUpdateCelebrities=(celebrity)=>ajax(BASE_URL+'/manage/celebrity/update',celebrity,'PUT');

/*添加goal*/
export const reqAddGoal=(params)=>ajax(BASE_URL+'/user/goal/insert',params,'POST');

/*获取认证信息*/
export const reqGetCtf=()=>ajax(BASE_URL+'/attestation/select');

/*提交认证*/
export const reqSubmitCtf=(userid)=>ajax(BASE_URL+'/attestation/insert',{userid},'POST');

/*同意认证*/
export const reqAgreeCtf=(userid)=>ajax(BASE_URL+'/attestation/agree',{userid},'POST');

/*拒绝认证*/
export const reqRefuseCtf=(userid)=>ajax(BASE_URL+'/attestation/refuse',{userid},'DELETE');

/*根据userid查找头像*/
export const reqQueryAvatar=(userid)=>ajax(BASE_URL+'/user/select',{userid});

/*用户修改密码*/
export const reqChangePsd=(params)=>ajax(BASE_URL+'/user/update',params,'PUT');

/*根据年级获取团队成员接口*/
export const reqGetMembers=(grade)=>ajax(BASE_URL+'/team',{grade});

/*判断用户是否点赞*/
export const reqgetThumbState=(params)=>ajax(BASE_URL+'/user/summary/judge',params);

/*点赞/取消点赞*/
export const reqThumb=(params)=>ajax(BASE_URL+'/user/summary/thumb',params,'POST');

/*删除评论*/
export const reqDeleteComment=(commentid)=>ajax(BASE_URL+'/user/comment/delete',{commentid},'DELETE');

/*查询点赞量*/
export const reqQueryThumb=(summaryid)=>ajax(BASE_URL+'/user/summary/three',{summaryid})

/*获取每月账单*/
export const reqGetMonthBill=()=>ajax(BASE_URL+'/bill/semester');







// 获取反馈信息
export const reqGetFeedback=(pageNum)=>ajax('/lc/feedback/select',{pageNum,pageSize:6});


// 获取用户信息
export const reqGetUsers=(user)=>ajax('/lc/manage/user/select',user);
// export const reqGetUsers=()=>ajax('/lc/users.json');


// 删除用户
export const reqDeleteUsers=(userid)=>ajax('/lc/manage/user/delete',{userid},'DELETE');


// 删除图片
export const reqDeleteImg=(fileName)=>ajax('/lc/delete',{fileName},'DELETE');


// 上传图片
export const reqAddImg=(multipartFile)=>ajax('/lc/upload',{multipartFile},'POST');

// 修改用户信息
export const reqUpdateUsers=(user)=>ajax('/lc/manage/user/update',user,'PUT');


// 查看公告
export const reqGetNotices=(pageNum)=>ajax('/lc/user/notice/select',{pageNum,pageSize:6});


// 删除公告
export const reqDeleteNotice=(noticeid)=>ajax('/lc/manage/notice/delete',{noticeid},'DELETE');

// 添加公告
export const reqAddNotice=(notice)=>ajax('/lc/manage/notice/insert',notice,'POST');



// 查看用户空间
export const reqGetUserSpace=(userid)=>ajax('/lc/user/home/select',{userid});
// export const reqGetUserSpace=()=>ajax('/lc/userSpace.json');



// 修改用户空间
export const reqUpdateUser=(user)=>ajax('/lc/user/home/update',user,'PUT');



// 删除个人总结
export const reqDeletePersonalSummary=(summaryid)=>ajax('/lc/user/summary/delete',{summaryid},'DELETE');


// 获取个人总结
export const reqGetPersonalSummary=(params)=>ajax('/lc/user/summary/select',params);
// export const reqGetPersonalSummary=()=>ajax('/lc/PersonalSummary.json');



// 添加个人总结
export const reqAddSummary=(summary)=>ajax('/lc/user/summary/add',summary,'POST');

// 修改个人总结
export const reqUpdateSummary=(summary)=>ajax('/lc/user/summary/update',summary,'PUT');


// 根据userid获取心愿
export const reqGetGoalByUserid=(userid,pageNum,pageSize)=>ajax('/lc/user/goal/selectbyid',{userid,pageNum,pageSize});


// 获取奖惩
export const reqGetRewardPunish=(info)=>ajax('/lc/user/rewardpunish/select',info);
// export const reqGetRewardPunish=(state=null)=>ajax('/lc/rewardpunish.json',{state});


// 添加奖惩
export const reqAddRewardPunish=(rewardpunish)=>ajax('/lc/user/rewardpunish/insert',rewardpunish,'POST');

// 修改奖惩
export const reqUpdateRewardPunish=(rewardpunish)=>ajax('/lc/user/rewardpunish/update',rewardpunish,'PUT');

// 删除奖惩
export const reqDeleteRewardPunish=(rewardpunishid)=>ajax('/lc/user/rewardpunish/delete',{rewardpunishid},'DELETE');


// 根据真实姓名获取奖惩
// export const regGetRewardPunishByNickname=(pageNum,nickname)=>ajax(BASE_URL+'/user/rewardpunish/select/nickname',{pageNum,nickname,pageSize:10});

// 修改goal的完成状态
export const reqUpdateGoalState=(goal)=>ajax('/lc/user/goal/update',goal,'PUT');


// 添加名人
export const reqAddCelebrity=(celebrity)=>ajax('/lc/manage/celebrity/insert',celebrity,'POST');

// 获取照片(含分页)
export const reqGetAlbum=(params)=>ajax('/lc/picture/getPicture',params);

// 相册上传照片
export const reqUploadAlbum=(img)=>ajax('/lc/picture/upload',img,'POST');

// 删除相册照片
export const reqDeleteAlbum=(name)=>ajax('/lc/picture/delete',{name},'DELETE');