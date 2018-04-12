/**
 * Created by liuwenjun on 2018/4/11.
 */
import React from 'react';
import './logo.css';
import logoImg from '../../asset/timg.png';
class Logo extends React.Component {
    render() {
        return (
            <div className="logo-container">
                <img src={logoImg} alt=""/>
            </div>
        )
    }
}

export default Logo;