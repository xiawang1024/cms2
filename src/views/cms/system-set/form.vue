

<template>
    <div>
       
         <div class="placer">
            <span>抓取信息规则</span>
         </div>
        <div class="formbody">
            
            <ul class="forminfo">
                <li><label>栏目</label>
                <select v-model="selectCloum" class="dfinput" style="opacity:1"  >
                    <option value ="" class="dfinput" slecter>--请选择栏目--</option>
                    <option v-for="item in content" :value="item.channelId">{{item.channelName}}</option>               
                </select>
                </li>
                    <li><label>已有规则</label>
                    <select v-model="selectRule" class="dfinput" style="opacity:1"  @change="al" >
                         <option value ="" class="dfinput" >--请选择规则--</option>
                         <option v-for="item in ruleContent" :value="item.id">{{item.id}}</option>
                        
                    </select> 
                    </li>
                <li><label>列表页面URL</label><input name="newslisturl" :value="res.newsListUrl"  type="text" class="dfinput" /></li>
                <li><label>列表页面URL规则</label><input name="newslisturlrule" :value="res.newsListUrlRule" type="text" class="dfinput" /></li>
                <li><label>列表标题规则</label><input name="newslisttitle" :value="res.newsListTitle" type="text" class="dfinput" /></li>
                <li><label>列表标题链接规则</label><input name="titleurl" :value="res.titleUrl" type="text" class="dfinput" /></li>
                <li><label>列表规则</label><input name="newslistrule" :value="res.newsListRule" type="text" class="dfinput" /></li>
                <li><label>详情页面规则</label><input name="newsrule" :value="res.newsRule" type="text" class="dfinput" /></li>
                <li><label>标题标签</label><input name="titlerule" :value="res.titleRule" type="text" class="dfinput" /></li>
                <li><label>正文标签</label><input name="contentrule" :value="res.contentRule" type="text" class="dfinput" /></li>
                <li><label>来源标签</label><input name="formrule" :value="res.formRule" type="text" class="dfinput" /></li>
                    <li><label>编码</label><input name="Encoding" :value="res.encoding" type="text" class="dfinput" /></li>
                <li><label>&nbsp;</label>
                    <button  type="submit" class="loginbtn" @click="test"  >测试</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button  type="submit" class="loginbtn" @click="save"  >保存</button>
                </li>
                    <li>
                    <label>标题：</label>  <textarea name="title" cols="" rows="" :value="testData.title" class="smiltextinput"></textarea>
                    </li>
                    <li>
                    <label>来源：</label>  <textarea name="form"  cols="" rows="" :value="testData.form" class="smiltextinput"></textarea>
                    </li>
                    <li class="topaside">
                    <label >正文：</label>  <textarea class="textinput" name="content"  cols="" rows="" :value="testData.content" ></textarea>
                    </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'form',
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
    created(){    
            console.log(this.$store.getters.token.access_token)   
                this.$.ajax({
                    type:"POST",
                    url:"http://172.20.5.4:53010/cms/channel/page?pageNo=1&pageSize=200&access_token="+this.$store.getters.token.access_token,

                    contentType:'application/json;charset=utf-8',
                    data: JSON.stringify({}),
                    dataType: "json",
                    success:(data)=>{
                        if(data.code==0){
                             this.content=data.result.content;
                          
                        }
                    },
                    error:function (data) {
                        alert("请求失败");
                    }
                });


    },
    
    watch:{
        selectCloum(){
            this.$.ajax({
                    type:"POST",
                    url:"http://172.20.5.4:19080/content-grab/newslist/getAllRuleByClumnId",
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
            url:"http://172.20.5.4:19080/content-grab/newslist/getAllRuleById",
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
    
    methods:{
        al(){       
         return console.log(this.testData);
        },
       
        test(){
            alert(this.res);
             if(this.res.newsListUrl==""||this.res.newsListUrl==null){
            alert("列表页面URL不能为空");
            return false;
            }
            if(this.res.newsListRule==""||this.res.newsListRule==null){
                alert("抓取信息的规则不能为空");
                return false;
            }
            this.$.ajax({
                    type:"POST",
                    url:"http://172.20.5.4:19080/content-grab/newslist/getnewslist",
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
        if(this.res.newsListUrl==""||this.res.newsListUrl==null){
            alert("列表页面URL不能为空");
            return false;
        }
        if(this.res.newsListRule==""||this.res.newsListRule==null){
            alert("抓取信息的规则不能为空");
            return false;
        }
        this.$.ajax({
            type:"POST",
            
            url:"http://172.20.5.4:19080/content-grab/newslist/saverule",
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

