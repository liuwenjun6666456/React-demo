import React from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {update} from "../../redux/user.redux";
import {Redirect} from 'react-router-dom';

@connect(
    stats => stats.user,
    {update}
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: ''
        };
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    componentWillReceiveProps(){
        setTimeout(()=>{
            this.setState({
                title:this.props.title,
                desc:this.props.desc
            });
        })
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && path !== redirect ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">牛人完善信息列表</NavBar>
                <InputItem value={this.state.title}
                           onChange={v => this.onChange('title', v)}>
                    求职
                </InputItem>
                <TextareaItem value={this.state.desc}
                              onChange={v => this.onChange('desc', v)}
                              rows={3}
                              autoHeight
                              title={'个人简介'}>
                </TextareaItem>
                <Button
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                    type='primary'>保存</Button>
            </div>
        );
    }
}

export default GeniusInfo;