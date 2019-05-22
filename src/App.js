import React from 'react';
import Message from './message'
Message.config({
  top: 30
});
let test = null;
function App() { 
  return (
    <div className="App">
        <div style={{marginTop:"30px",textAlign: "center"}}>
          <button style={{padding: "15px"}} onClick={()=>{
            Message.success('success',3000,()=>{
              console.log('close');
            })
          }}>success</button>  
        </div>      
        <div style={{marginTop:"30px",textAlign: "center"}}>
          <button style={{padding: "15px"}} onClick={()=>{
            Message.warning('warning')
          }}>warning</button>  
        </div>      
        <div style={{marginTop:"30px",textAlign: "center"}}>
          <button style={{padding: "15px"}} onClick={()=>{
            Message.info('info')
          }}>info</button>  
        </div>      
        <div style={{marginTop:"30px",textAlign: "center"}}>
          <button style={{padding: "15px"}} onClick={()=>{
            Message.error('error')
          }}>error</button>  
        </div>    
        <div style={{marginTop:"30px",textAlign: "center"}}>
          <button style={{padding: "15px"}} onClick={()=>{
            Message.loading('加载中',100000)
          }}>loading</button>  
        </div>         
        <div style={{marginTop:"30px",textAlign: "center"}}>
          <button style={{padding: "15px"}} onClick={()=>{
            Message.destroy()
          }}>clear</button>  
        </div>    
        <div style={{marginTop:"30px",textAlign: "center"}}>
          <button style={{padding: "15px"}} onClick={()=>{
            test = Message.info('test')
          }}>打开</button>  
          <button style={{padding: "15px"}} onClick={()=>{
            Message.close(test);
          }}>手动关闭</button>            
        </div>                                                                                                                      
    </div>
  );
}

export default App;
