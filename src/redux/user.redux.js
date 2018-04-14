import axios from 'axios';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
    msg: '',
    username: '',
    type: ''
}

export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                msg: '',
                ...action.payload,
                redirectTo: getRedirectPath(action.payload),
            }
        case LOAD_DATA:
            return {
                ...state,
                isAuth: true,
                ...action.payload
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
    let url = (type === 'boss') ? '/bossinfo' : '/geniusinfo';
    return url;
}

function authSuccess(data) {
    return {type: AUTH_SUCCESS, payload: data};
}


function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}

export function login({username, pwd}) {
    if (!username || !pwd) {
        return errorMsg('用户名密码不能为空');
    }
    return dispatch => {
        axios.post('/user/login', {username, pwd})
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(authSuccess(res.data.data));
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
                    dispatch(authSuccess({username, pwd, type}));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }

}

export function loadData(userInfo) {
    return {type: LOAD_DATA, payload: userInfo};
}

export function update(data) {
    return dispatch => {
        axios.post('/user/update',data)
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }

}