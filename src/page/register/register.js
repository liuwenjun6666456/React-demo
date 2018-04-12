/**
 * Created by liuwenjun on 2018/4/11.
 */
import React from 'react';
import {List, InputItem, WingBlank, WhiteSpace, Button,Radio} from 'antd-mobile';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.state={
            type:'genius'
        }
    }

    register() {
        this.props.history.push('register');
    }

    render() {
        const RadioItem=Radio.RadioItem
        return (
            <div>
                <h2>注册页面</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户名</InputItem>
                        <InputItem>密码</InputItem>
                        <InputItem>确认密码</InputItem>
                        <RadioItem checked={this.state.type=='genius'}>
                           牛人
                        </RadioItem>
                        <RadioItem checked={this.state.type=='boss'}>
                            Boss
                        </RadioItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary">登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;