import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './style.module.scss';
function getKey() {
    return `message${(new Date()).getTime()}`;
}
class Message extends Component {
    static config = {
        duration: 3000,
        maxCount: 20,
        top: 24,
        successIcon: 'icon-success-circle',
        warningIcon: 'icon-info',
        errorIcon: 'icon-error',
        infoIcon: 'icon-info',
        loadingIcon: 'icon-loading',
        icon: 'icon-info'    
    };    
    state = {
        messages: []
    };
    asyncQuene = {};
    addMessage = ({
        content,
        duration = Message.config.duration,
        type = 'message',
        icon = null,
        onClose = ()=>{}
    }) => {
        const key = getKey();
        this.setState(state=>{
            const messages = Array.from(state.messages);
            if(!icon){
                switch(type) {
                    case 'success': 
                        icon = Message.config.successIcon;
                    break;
                    case 'warning': 
                        icon = Message.config.warningIcon;
                    break;
                    case 'error': 
                        icon = Message.config.errorIcon;
                    break;
                    case 'info': 
                        icon = Message.config.infoIcon;
                    break;      
                    case 'loading': 
                        icon = Message.config.loadingIcon;
                    break; 
                    default: 
                        icon = Message.config.icon;                
                    break;                                         
                }                
            }
            let time = (new Date()).getTime();
            if(state.messages.length){
                let ot = state.messages[state.messages.length-1];
                let rd = (time + duration) - (ot.time + ot.duration);
                if(rd < 500 && rd > -500){
                    duration = duration + (500-rd);
                }
            }            
            messages.push({
                content,
                key,
                type,
                status: false,
                icon,
                time,
                duration
            });
            return {
                ...state,
                messages
            }
        },()=>{
            console.log(duration)
            if(duration !== 0){
                this.asyncQuene[key] = setTimeout(()=>{
                    this.setState(state=>{
                        const messages = state.messages.filter(e=>e.key!==key);
                        return {
                            ...state,
                            messages
                        }
                    },()=>{
                        delete this.asyncQuene[key];
                        onClose();
                    })      
                },duration);
            }
        })
        return key;
    }
    close = key => {
        this.setState(state=>{
            let messages = Array.from(state.messages).filter(e=>e.key!==key);
            if(this.asyncQuene[key]){
                clearTimeout(this.asyncQuene[key]);
                delete this.asyncQuene[key];
            }
            return {
                ...state,
                messages
            }
        });
    }
    onTransChange = (index, status) => {
        if(this.state.messages[index]){
            this.setState(state=>{
                let messages = Array.from(state.messages);
                messages[index].status = status;
                return {
                    ...state,
                    messages
                }
            })
        }
    }
    componentWillUnmount() {
        Object.keys(this.asyncQuene).forEach(e=>{
            clearTimeout(this.asyncQuene[e]);
        })
        this.asyncQuene = {};
    }
    render() {      
        return (
            <div className={styles.messagebox} style={{top: Message.config.top}}>          
                <TransitionGroup className={styles.wrap} >
                    {this.state.messages.map((e,index)=>(
                    <CSSTransition
                    key={e.key}
                    in={e.status}
                    timeout={300}
                    classNames="mtrans-node"
                    unmountOnExit
                    onEnter={() => this.onTransChange(index,false)}
                    onExited={() => this.onTransChange(index,true)}
                    >
                        <span className={classnames(styles.box,styles[e.type])}>
                            <i className={classnames('iconfont',e.icon)}></i>
                            <span className={styles.label}>{e.content}</span>
                        </span>              
                    </CSSTransition>                       
                    ))}
                </TransitionGroup>          
            </div>
        );
    }
}
export default Message; 