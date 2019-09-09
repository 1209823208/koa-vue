import MUtil from './axios-service.js';
const _mm = new MUtil();
export default class User {
    login(params_obj) {
        let url = 'login',
            params = { 
                ...params_obj,
            };
        return _mm.post(url, params,{}, false).then((res) => {
            console.log('res', res);
            return res;
        });
    }
}