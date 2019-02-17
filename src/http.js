import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import router from './router'

// axios 配置
axios.defaults.timeout = 20000;
//axios.defaults.baseURL = 'http://127.0.0.1:8080/scerp.front.web';
axios.defaults.baseURL = 'http://121.196.209.122/easycrm';
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers = {"Access-Control-Allow-Headers":"token_id, X-Requested-With, Content-Type"};
// axios.defaults.headers = {"Access-Control-Allow-Headers":"Content-Type"};
// axios.defaults.headers['Content-Type'] = `application/x-www-form-urlencoded`;


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers['token_id'] = store.state.token
            alert(config.headers['token_id'])
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });


// http response 拦截器 
axios.interceptors.response.use(
    response => {
        if(response.data.status == 9) {
            window.location = 'http://www.shdangdang.com/';
        }else if(response.data.status == 7) {
            window.location = 'http://www.shdangdang.com/#/noright';
        }

        return response;
    },
    error => {
        return Promise.reject(error);
    });

export default axios;