/**
 * Created by liuwenjun on 2018/4/11.
 */
import React from 'react';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux';
import {login} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom'

@connect(
    stats => stats.user,
    {login}
)
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pwd: '',
        };
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    register() {
        this.props.history.push('register');
    }

    handleLogin() {
        this.props.login(this.state);
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <h2>登陆</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? <h3 style={{color: 'red'}}>{this.props.msg}</h3> : null}
                        <InputItem
                            onChange={v => this.handleChange('username', v)}
                        >用户名</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem
                            onChange={v => this.handleChange('pwd', v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.handleLogin} type="primary">登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;