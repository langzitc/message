# React Message Component
---
### 全局配置
``` javascript
import Message from 'message'

Message.config({
    duration: 3000,//延时关闭，设为0不关闭
    maxCount: 20, //最多显示消息个数
    top: 24,//顶部距离
    successIcon: 'icon-success-circle',//成功图标
    warningIcon: 'icon-info',//警告图标
    errorIcon: 'icon-error',//错误图标
    infoIcon: 'icon-info',//信息图标
    loadingIcon: 'icon-loading',//加载图标
    icon: 'icon-info'//默认图标
})
```
### example 
``` javascript
import Message from 'message'
//成功
Message.success('success');

//警告
Message.warning('warning');

//信息
Message.info('info');

//错误
Message.error('error');

//关闭回调
Message.info('2222',3000,()=>{
    console.log('close');
})


//自定义
Message.message({
    type: 'info',
    icon: '****',
    duration: 3000,
    content: '.....',
    onClose: ()=>{}
})

//关闭

let message = Message.success('ssssds');
Message.close(message);

//销毁

Message.destroy();

```
