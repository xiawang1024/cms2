

<template>
  <div>
       
    <div class="placer">
      <span>抓取信息规则</span>
    </div>
    <div class="formbody">
            
      <ul class="forminfo">
        <li><label>栏目</label>
          <select v-model="selectCloum" class="dfinput" style="opacity:1" >
            <option value ="" class="dfinput" slecter>--请选择栏目--</option>
            <option v-for="item in content" :value="item.channelId" :key="item.channelId">{{ item.channelName }}</option>               
          </select>
        </li>
        <li><label>已有规则</label>
          <select v-model="selectRule" class="dfinput" style="opacity:1" >
            <option value ="" class="dfinput" >--请选择规则--</option>
            <option v-for="item in ruleContent" :value="item.id" :key="item.channelId">{{ item.id }}</option>
                        
          </select> 
        </li>
        <li><label>列表页面URL</label><input name="newslisturl" v-model="res.newsListUrl" type="text" class="dfinput" ></li>
        <li><label>列表页面URL规则</label><input name="newslisturlrule" v-model="res.newsListUrlRule" type="text" class="dfinput" ></li>
        <li><label>列表标题规则</label><input name="newslisttitle" v-model="res.newsListTitle" type="text" class="dfinput" ></li>
        <li><label>列表标题链接规则</label><input name="titleurl" v-model="res.titleUrl" type="text" class="dfinput" ></li>
        <li><label>列表规则</label><input name="newslistrule" v-model="res.newsListRule" type="text" class="dfinput" ></li>
        <li><label>详情页面规则</label><input name="newsrule" v-model="res.newsRule" type="text" class="dfinput" ></li>
        <li><label>标题标签</label><input name="titlerule" v-model="res.titleRule" type="text" class="dfinput" ></li>
        <li><label>正文标签</label><input name="contentrule" v-model="res.contentRule" type="text" class="dfinput" ></li>
        <li><label>来源标签</label><input name="formrule" v-model="res.formRule" type="text" class="dfinput" ></li>
        <li><label>编码</label><input name="Encoding" v-model="res.encoding" type="text" class="dfinput" ></li>
        <li><label>&nbsp;</label>
          <button type="submit" class="loginbtn" @click="test" >测试</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="submit" class="loginbtn" @click="save" >保存</button>
        </li>
        <li>
          <label>标题：</label>  <textarea name="title" cols="" rows="" :value="testData.title" class="smiltextinput"/>
        </li>
        <li>
          <label>来源：</label>  <textarea name="form" cols="" rows="" :value="testData.form" class="smiltextinput"/>
        </li>
        <li class="topaside">
          <label >正文：</label>  <textarea class="textinput" name="content" cols="" rows="" :value="testData.content" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {columnList} from "@/api/cms/columnManage.js"
import baseUrl from '@/config/base-url'
baseUrl['BASE_URL']='http://10.1.3.43:53010'
let cpath=baseUrl['BASE_URL'].split(":");
let  Cpath=cpath[0].toString()+':'+cpath[1].toString()
console.log(Cpath)
export default {
    name:'Form',
    data(){
        return{
            content:[],
            selectCloum:"",
            ruleContent:[],
            selectRule:'',
            res:{},
            testData:{}


        }
    },
    
    watch:{
        selectCloum(){
            this.ruleContent=[],
            this.res={},
            this.testData={},
            this.$.ajax({
                    type:"POST",
                    url:Cpath+":19080/content-grab/newslist/getAllRuleByClumnId",
                    data:{
                        "clumnid" :this.selectCloum,
                    },
                    success:(data)=> {
                        if(data.status=="success"){
                            return this.ruleContent=data.data;
                           

                        }else {
                            alert(data.data);
                        }
                    },
                    error:function (data) {
                        alert("请求失败");
                    }
                });
        },
        selectRule(){
            this.$.ajax({
            type:"POST",
            url:Cpath+":19080/content-grab/newslist/getAllRuleById",
            data:{
                "ruleid" : this.selectRule,
            },
            success:(data)=> {
                if(data.status=="success"){
                     return this.res=data.data;
                   
                }else {
                    alert(data.data);
                }
            },
            error:function (data) {
                alert("请求失败");
            }
        });
        }
       
    },
    created(){      
               var _this = this
                 return new Promise((resolve, reject) => {
                   columnList({},1,1000)
                    .then((response) => {
                        _this.$nextTick(()=>{
                            _this.content = response.data.result.content
                        })
                        resolve()
                    })
                    .catch((error) => {
                        reject(error)
                    })
                }) 


    },
    
    methods:{
        check(){
            if(this.res.newsListUrl==""||this.res.newsListUrl==null){
                alert("列表页面URL不能为空");
                return false;
            }
            if(this.res.newsListUrlRule==""||this.res.newsListUrlRule==null){
                alert("列表页面URL规则不能为空");
                return false;
            }
            if(this.res.newsListTitle==""||this.res.newsListTitle==null){
                alert("列表标题规则不能为空");
                return false;
            }
            if(this.res.titleUrl==""||this.res.titleUrl==null){
                alert("列表标题链接规则不能为空");
                return false;
            }
            if(this.res.newsListRule==""||this.res.newsListRule==null){
                alert("抓取信息的规则不能为空");
                return false;
            }
            if(this.res.newsRule==""||this.res.newsRule==null){
                alert("详情页面规则不能为空");
                return false;
            }
            if(this.res.titleRule==""||this.res.titleRule==null){
                alert("标题标签不能为空");
                return false;
            }
            if(this.res.contentRule==""||this.res.contentRule==null){
                alert("正文标签不能为空");
                return false;
            }
            if(this.res.formRule==""||this.res.formRule==null){
                alert("来源标签不能为空");
                return false;
            }
            if(this.res.encoding==""||this.res.encoding==null){
                alert("编码不能为空");
                return false;
            }
            
        },
        test(){
            this.check(),
            this.$.ajax({
                    type:"POST",
                    url:Cpath+":19080/content-grab/newslist/getnewslist",
                    data:{
                        "column" : this.selectCloum,
                        "newslisturl":this.res.newsListUrl,
                        "newslisturlrule":this.res.newsListUrlRule,
                        "newslisttitle":this.res.newsListTitle,
                        "titleurl":this.res.titleUrl,
                        "newslistrule":this.res.newsListRule,
                        "newsrule":this.res.newsRule,
                        "titlerule":this.res.titleRule,
                        "contentrule":this.res.contentRule,
                        "formrule":this.res.formRule,
                        "encoding":this.res.encoding,
                    },
                    // dataType: "json",
                    success:(data)=> {
                        if(data.status=="success"){
                            // alert(data.data.title);
                            this.testData=data.data;
                        
                        }else {
                            alert("请求失败")
                        }
                    },
                    error:function (data) {
                        alert(data);
                    }
                });
        },
        save() {
        var id=this.selectRule;
         
        if(id==" " || id==null){
            alert("确定要修改这条规则信息吗？")
        }
        this.check(),
        this.$.ajax({
            type:"POST",
            
            url:Cpath+":19080/content-grab/newslist/saverule",
            data:{
                "id":this.selectRule,
				"column" : this.selectCloum,
                 "newslisturl":this.res.newsListUrl,
                "newslisturlrule":this.res.newsListUrlRule,
                "newslisttitle":this.res.newsListTitle,
                "titleurl":this.res.titleUrl,
                "newslistrule":this.res.newsListRule,
                "newsrule":this.res.newsRule,
                "titlerule":this.res.titleRule,
                "contentrule":this.res.contentRule,
                "formrule":this.res.formRule,
                "encoding":this.res.encoding,
            },
            success:function (data) {
                alert("成功");
            },
            error:function (data) {
                alert("失败");
            }
        });
    }

    }
}
</script>
<style scoped>
    *{
        padding:0;
        margin:0;
    }
    a{
        text-decoration: none;
        color:black;
    }
    .place,.placer{
         width:100%;
         height: 40px;
         background-color:#EDF6FA;
          overflow: hidden;
          line-height:40px;
          font-size:14px;
    }
    .placer{
        background-color:#fff;
        height:45px;
    }
    .placer span{
        font-weight:bold;
        float:left;        
        margin-left:20px;
        border-bottom:3px solid #66C9F3;
    }
    .place span{
        font-weight:bold;
        float:left;
    }
    .placeul{
        float:left;
    }
    .placeul li {
        list-style: none;
        float: left;
    }
    .formbody{
        position:relative;       
        margin:0 40px;      
        text-align:left;        
    }
    .formbody li{
        list-style:none;
    }
       label{
        display:inline-block;
        width:120px;
        height:34px;
        font-size:14px;

    }
    input,select{
        width:347px;
        height:34px;
        margin:8px 0;
        border:1px solid #999;
        font-size:14px;
    }
    button{
        width:111px;
        height:35px;
        background-color:#4198CA;
        border-radius:5px;
        color:#fff;
        font-weight:bold;
        line-height:35px;
        text-align:center;
        border:none;
        outline:none;

    }
    button:active{
        opacity:0.8;
    }
    .textinput{
         height:222px;
    }
    textarea{
        width:526px;

    }
    .topaside{
        overflow:hidden;

    }
    .topaside label{
       float:left
    }
    .topaside textarea{
        float:left
    }
        
</style>

