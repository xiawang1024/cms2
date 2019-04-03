<template>
  <div>
    <h3 @click="al">app详情</h3>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ description }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in appDetail" :key="o.id" class="text item">
        <p>id:{{ o.id }}</p>
        <p>groupId:{{ o.groupId }}</p>
        <p>description:{{ o.description }}</p>
        <p>name:{{ o.name }}</p>
        <p>valueType:{{ o.valueType }}</p>
        <p>value:{{ o.value }}</p>
        <p>createTime{{ o.createTime }}</p>
             
      </div>
    </el-card>
  </div>
</template>
<script>
import {getAppDetail} from "@/api/cms/KvGroup.js"
export default {
    name:'Kvdetail',
    data(){
        return{
            description:'',
            appDetail:[
                {
                "id": 1112658399172104200,
                "groupId": 1112657532821835800,
                "description": "背景图片地址",
                "name": "backgroundImageUrl",
                "valueType": "3",
                "value": "https://www.baidu.com/",
                "createTime": "2019-04-01T10:10:09.000+0000"
                },
                {
                "id": 1112658206171205600,
                "groupId": 1112657532821835800,
                "description": "安卓客户端",
                "name": "Androidname",
                "valueType": "0",
                "value": "https://www.baidu.com/",
                "createTime": "2019-04-01T10:09:23.000+0000"
                },
                {
                "id": 1112658134817706000,
                "groupId": 1112657532821835800,
                "description": "ios客户端",
                "name": "iosname",
                "valueType": "0",
                "value": "https://www.baidu.com/",
                "createTime": "2019-04-01T10:09:06.000+0000"
                }
            ]

            
        }
    },
    created() {
            this.description=this.$route.query.des
            var _this=this

            return new Promise((resolve,reject)=>{
                getAppDetail(_this.$route.query.userid)
                .then((response)=>{
                    console.log(response)
                    // _this.appDetail=response.data
                })
                .catch((reject)=>{
                    console.log(reject)
                })
            })
    },
    methods: {
        al(){
            console.log(this.$route.query)
        }
    },
}
</script>
<style scoped>
    .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
