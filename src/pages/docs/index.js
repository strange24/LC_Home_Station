import React,{useState} from 'react';
import Version01 from './components/version01';
import Version02 from './components/version02';
import  "./index.less";

const data=['Version2.0','Version1.0'];

export default function IntroductionDoc(props){
    const [cur, setcur] = useState(props.location.state.cur);//版本

    return (
        <div className='doc_wrapper'>
            <div className='doc_left'>
                <p onClick={()=>{props.history.goBack()}}>&lt;首页</p>
                <h1>功能介绍</h1>
                <ul>
                {
                    data.map((item,index)=>{
                        return (
                            <li 
                            key={index}
                            style={{backgroundColor:index===cur?'#7546C8':''}}
                            onClick={()=>{setcur(index)}}
                            >{item}</li>
                        );
                    })
                }
                </ul>
            </div>
            <div className='doc_right'>
            {
                cur===0?<Version02/>:<Version01/>
            }
            </div>
        </div>
    );
}