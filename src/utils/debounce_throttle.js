/*防抖节流函数*/

const debThrFunc={
    //立即执行
    debounce:(fn,wait)=>{
        let timeout = null;
        return function () {
            if(timeout) clearTimeout(timeout);
            if(!timeout) fn.apply(this,arguments);
            timeout = setTimeout(() => {
                timeout=null;
            }, wait);
        };
    },
    //延迟执行
    debounce_delay:(fn,wait)=>{
        let timeout=null;
        return function(){
            if(timeout) clearTimeout(timeout);
            timeout=setTimeout(()=>{
                fn.apply(this,arguments);
                timeout=null;
            },wait);
        }
    },
    throttle:(fn,wait)=>{
        let flag=true;
        return function(){
            if(!flag) return;
            flag=false;
            if(!flag) fn.apply(this,arguments);
            setTimeout(()=>{
                flag=true;
            },wait);
        }
    }
}

export default debThrFunc;