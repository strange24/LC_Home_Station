import React from 'react';
import debThrFunc from '../utils/debounce_throttle';

export default function Test(){
    const handleClick=debThrFunc.debounce(()=>{
        console.log('防抖');
    },1000);

    return (
        <div>
            <button onClick={handleClick}>防抖</button>
            <button>节流</button>
        </div>
    );
}