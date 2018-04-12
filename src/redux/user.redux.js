import axios from 'axios';

const REGISTER_SUCCESS = 'REGISTER_SUCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const initState = {
    isAuth: '',
    msg: '',
    username: '',
    pwd: '',
    type: ''
}

export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                msg: '',
                isAuth: true,
                ...action.payload,
                redirectTo:getRedirectPath(action.payload),
            }
        case LOGIN_SUCCESS:
            return {
                 ...state,
                msg: '',
                isAuth: true,
                ...action.payload,
                redirectTo: getRedirectPath(action.payload),
            }
        case ERROR_MSG:
            return {
                ...state,
                msg: '',
                isAuth: false,
                msg: action.msg
            }
        default:
            return state;
    }

}

export function getRedirectPath({type}) {
    //根据用户信息，跳转地址 boss列表或者牛人列表
    let url=(type==='boss')?'/boss':'/genius';
    return url;
}
function loginSuccess(data){
    return {type: LOGIN_SUCCESS, payload: data};
}
function registerSuccess(data){
    return {type: REGISTER_SUCCESS, payload: data};
}

function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}
export function login({username, pwd}) {
    if (!username || !pwd ) {
        return errorMsg('用户名密码不能为空');
    }
    return dispatch => {
        axios.post('/user/login', {username, pwd})
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(loginSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }

}


export function register({username, pwd, repeatPwd, type}) {
    if (!username || !pwd || !type) {
        return errorMsg('用户名密码必须输入');
    }
    if (pwd !== repeatPwd) {
        return errorMsg('两次密码不一致');
    }
    return dispatch => {
        axios.post('/user/register', {username, pwd, type})
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(registerSuccess({username, pwd, type}));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }

}

