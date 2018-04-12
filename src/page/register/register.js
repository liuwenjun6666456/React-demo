/**
 * Created by liuwenjun on 2018/4/11.
 */
import React from 'react';
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom'
@connect(
    stats => stats.user,
    {register}
)
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            username: '',
            pwd: '',
            repeatPwd: '',
            type: 'genius'
        }
    }

    handleRegister() {
        this.props.register(this.state);
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <h2>注册页面</h2>
                <WingBlank>
                    <List>
                        {this.props.msg?<h3 style={{color:'red'}}>{this.props.msg}</h3>:null}
                        <InputItem
                            onChange={v => this.handleChange('username', v)}
                        >用户名</InputItem>
                        <InputItem
                            type='password'
                            onChange={v => this.handleChange('pwd', v)}
                        >密码</InputItem>
                        <InputItem
                            type='password'
                            onChange={v => this.handleChange('repeatPwd', v)}
                        >确认密码</InputItem>
                        <RadioItem
                            onChange={v => this.handleChange('type', 'genius')}
                            checked={this.state.type == 'genius'}>
                            牛人
                        </RadioItem>
                        <RadioItem
                            onChange={v => this.handleChange('type', 'boss')}
                            checked={this.state.type == 'boss'}>
                            Boss
                        </RadioItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary">登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.handleRegister} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;