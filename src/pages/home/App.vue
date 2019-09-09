<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your home.js App"/>
    <p class="title">-----POSTS List---</p>
    <button @click="add">add</button>
    <div class="list" v-for="(dataItem,dataIndex) in dataList" :key="dataIndex">
        <div class="left">
            <div>
                <span>{{dataItem.name}}:</span>
                <span>{{dataItem.title}}</span>
            </div>
            <div>{{dataItem.content}}</div>
           
        </div>
        <div class="right">
            <button @click="edit(dataIndex)">编辑</button>
            <button @click="del(dataItem.id)">删除</button>
        </div>
    </div>
    <!-- 编辑  -->
    <div class="edit" v-if="isShowEdit">
        <div>
            name: <textarea v-model="currentEditData.name"></textarea>
        </div>
        <div>
            title: <textarea v-model="currentEditData.title"></textarea>
        </div>
        <div>
            content: <textarea v-model="currentEditData.content"></textarea>
        </div>
        <button @click="editFun()">save</button>
    </div>
  </div>
</template>

<script>
import HelloWorld from '../../components/HelloWorld'
import PostService from '../../service/post-service'

export default {
    name: 'app',
    data(){
        return{
            dataList: [],
            currentIndex: -1,
            isShowEdit: false,
            currentEditData: {},
        }
    },
    components: {
        HelloWorld
    },
    created() {
        this.init();
    },
    methods: {
        init(){
            this.getAllPostData();
        },
        add(){
            this.currentIndex = 'add';
            this.isShowEdit = true;
            this.currentEditData = {
                name: '',
                title: '',
                content: '',
            }
        },
        edit(dataIndex){
            this.isShowEdit = true;
            this.currentIndex = dataIndex;
            this.currentEditData = {
                name: this.dataList[this.currentIndex].name,
                title: this.dataList[this.currentIndex].title,
                content: this.dataList[this.currentIndex].content,
            }
        },
        del(id){
            this.fetchDelData(id);
        },
        editFun(){
            this.fetcheditFun();
        },
        async getAllPostData(){
            let resData = await PostService.fetchData();
            if(resData.code === 200){
                if(resData.data && resData.data.length > 0) {
                    this.dataList = resData.data;
                }
            }
        },
        async fetcheditFun(){
            let params = {
                name: this.currentEditData.name,
                content: this.currentEditData.content,
                title: this.currentEditData.title,
            };
            let resData;
            if( this.currentIndex !== 'add'){
                params.id = this.dataList[this.currentIndex].id;
                resData = await PostService.editData(params);
            }else{
                resData = await PostService.addData(params);
            }        
            if(resData.code === 200){
                this.isShowEdit = false;
                this.init();
            }
        },
        async fetchDelData(id){
            let params = {
                id,
            }
            let resData = await PostService.delData(params);
            if(resData.code === 200){
                this.init();
            }
        },
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
p.title{
  color: green;
}
.list{
    width: 450px;
    display: flex;
    margin: auto;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333333;

}

</style>
