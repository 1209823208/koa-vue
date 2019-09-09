<template>
    <div>
        <p>文件上传</p>
        <div>
            <input id="file" @change="onFileChange" type="file">
            <button @click="submit">提交</button>
        </div>
    </div>
</template>
<script>
import fileService from '../../service/file-service';
export default {
    data() {
        return {
            rewardList: [],
            fileData: null,
        };
    },
    components: {},
    created() {
    },
    methods: {
        onFileChange(e){
            let files = e.target.files || e.dataTransfer.files;
            if(!files.length)
                return;
            this.fileData = files[0];
        },
        submit(){
            this.uploadAPI();
        },
        async uploadAPI(){
            let file = document.getElementById('file').files[0]
            console.log('file',file);
            console.log('fileData',this.fileData);
            let formData = new FormData();
            formData.append('file', this.fileData);
            console.log('formData', formData)
            let resData = await fileService.upload(formData);
            if(resData.code === 200){
                if(resData.data && resData.data.length > 0) {
                    this.dataList = resData.data;
                }
            }
        },
    },
};
</script>