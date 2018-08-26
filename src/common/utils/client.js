import axios from 'axios';
import { Toast, Indicator } from 'mint-ui';

const apiUrl = 'https://api.douban.com';
axios.interceptors.request.use(function (config) {
    config.headers.token = localStorage.token;
    // config.url = apiUrl + config.url;
    config.url = config.url;
    Indicator.open();
    return config
})

axios.interceptors.response.use(function (res) {
    Indicator.close();
    let data = res.data;
    return data;
    switch(data.code) {
		case 1000:
			return data;
			break;
		case 404:
			// router.push({path:'/error-404'});
			break;
		case 1104:
        case "1104":
			Toast({
				message: "请登录",
				position: 'middle',
				duration: 1000
			});
			location.href = '/#/login'
			break;
        default:
			Toast({
				message: data.message,
				position: 'middle',
				duration: 1000
			});
			return data;
			break;
	}
}, function () {
    Indicator.close();
})

const getData = function (url, data) {
    return axios.get(url + "?" + formatQueryData(data))
}
const postData = function (url, data) {
    return axios.post(url, data)
}

function formatQueryData(data) {
    if(!data || data == '') {
        return '';
    }
    let list = [];
    for(let i in data) {
        if(typeof data[i] == 'object') {
            for(let subIndex in data[i]) {
                data[i][subIndex] != '' && list.push(i + '.' + subIndex + '=' + data[i][subIndex]);
            }
        }
        else{
            list.push(i + '=' + data[i])
        }
    }
    return list.join("&")
}

export default {
    getData,
    postData
}