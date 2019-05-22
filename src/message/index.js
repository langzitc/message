import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message'
const factory = {
    instance: null,
    div: null,
    get getInstance() {
        if(!this.instance){
            this.div = document.createElement('div');
            document.body.appendChild(this.div);
            this.instance = ReactDOM.render(<Message />,this.div);              
        }
        return this.instance;
    },
    destroy() {
        if(this.div&&this.instance){
            ReactDOM.unmountComponentAtNode(this.div);
            document.body.removeChild(this.div);
            this.div = null;
            this.instance = null;               
        }
    }
};
export default {
    message(options) {
        let instance = factory.getInstance;
        return instance.addMessage(options);
    },
    info(content, duration, onClose) {
        return this.message({
            content,
            duration,
            onClose,
            type: 'info'
        });
    },    
    warning(content, duration, onClose) {
        return this.message({
            content,
            duration,
            onClose,
            type: 'warning'
        });
    },
    success(content, duration, onClose) {
        return this.message({
            content,
            duration,
            onClose,
            type: 'success'
        });
    },
    error(content, duration, onClose) {
        return this.message({
            content,
            duration,
            onClose,
            type: 'error'
        });
    },
    loading(content, duration, onClose) {
        return this.message({
            content,
            duration,
            onClose,
            type: 'loading'
        });
    },
    close(key) {
        let instance = factory.getInstance;
        instance.close(key);        
    },
    config(options) {
        Object.assign(Message.config,options);
    },
    destroy() {
        factory.destroy();        
    }
}