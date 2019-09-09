import MUtil from './axios-service.js';
const _mm = new MUtil();
class File {
    upload(params) {
        let url = 'file/upload';
        let headers = {
            'Content-Type': 'multipart/form-data'
        };
        return _mm.post(url, params, headers,false).then((res) => {
            console.log('res', res);
            return res;
        });
    }
}
export default new File();