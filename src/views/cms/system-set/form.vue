

<template>
  <div>
    <el-tabs v-model="activeName" class="formBox" >
      <el-tab-pane label="抓取PC端信息规则" name="first" >
        <div class="formbody" v-loading="loading">
            
          <ul class="forminfo">
            <div class="left">
              <li><label>栏目</label>
                <select v-model="selectCloum" class="dfinput" style="opacity:1" >
                  <option value ="" class="dfinput" slecter>--请选择栏目--</option>
                  <option v-for="item in content" :value="item" :key="item.channelId">{{ item.channelName }}</option>               
                </select>
              </li>
              <li><label>已有规则</label>
                <select v-model="selectRule" class="dfinput" style="opacity:1" >
                  <option value ="" class="dfinput" >--请选择规则--</option>
                  <option v-for="item in ruleContent" :value="item.id" :key="item.channelId">{{ selectCloum.channelName+' / Ruler '+item.id }}</option>                        
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
              <li><label>&nbsp;</label><label>&nbsp;</label>
                
                <button type="submit" class="loginbtn" @click="test" >测试</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit" class="loginbtn" @click="save" >保存</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit" class="loginbtn" @click="saveAs" >另存</button>
              </li>
            </div>
            <div class="right">    
              <li>
                <label>标题：</label>  <textarea name="title" cols="" rows="" :value="testData.title" class="smiltextinput"/>
              </li>
              <li>
                <label>来源：</label>  <textarea name="form" cols="" rows="" :value="testData.form" class="smiltextinput"/>
              </li>
              <li class="topaside">
                <label >正文：</label>  <textarea class="textinput" name="content" cols="" rows="" :value="testData.content" />
              </li>
            </div>  
          </ul>
          <ul class="bottom">
            <h4>已有规则列表：</h4>
            <el-row :gutter="20">
              <el-col v-for="(item,index) in fullRule" :span="6" :key="item.id" ><div class="grid-content bg-purple" :class="{active:checkRuleId==index}" @click="choice(item.id)">{{ item.id }}:{{ item.newsListUrl }}</div></el-col>
        
            </el-row>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="抓取公众号信息规则" name="second">
        <ul>
          <li><label>公众号名称</label><input v-model="weChatData.title" type="text" class="dfinput" ></li>
          <li><label>微信号</label><input v-model="weChatData.id" type="text" class="dfinput" ></li>
          <li><label>功能介绍</label><input v-model="weChatData.info" type="text" class="dfinput" ></li>
          <li><label>页面URL</label><input v-model="weChatData.url" type="text" class="dfinput" ></li>
          <li/><li><label>&nbsp;</label><label>&nbsp;</label>
                
            <button type="submit" class="loginbtn" @click="wxtest" >测试</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="submit" class="loginbtn" @click="wxsave" >保存</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
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
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import {columnList} from "@/api/cms/columnManage.js"
import baseUrl from '@/config/base-url'
let cpath=baseUrl['BASE_URL'].split(":");
let  Cpath=cpath[0].toString()+':'+cpath[1].toString()
//生产地址
// let  Cpath='http://192.168.25.148'
    var str='{"status":"success","data":[{"id":1,"newsListUrl":"http://sports.people.com.cn/GB/22172/31955/index.html","newsListUrlRule":"http://www.hndt.com/nanyang/news/{code}/index.html","newsListTitle":"div.title > a","titleUrl":"ul > li > a","newsListRule":"#articleList > ul","newsRule":"http://www.hndt.com/nanyang/news/latest/{year}/{month}/{code}/index.html","titleRule":"#main > div.content > div.mainContent > div > div.contArticle_tit > h3","contentRule":"#rwb_zw","formRule":"#main > div.content > div.mainContent > div > div.contArticle_author > div.fl > span:nth-child(1)","clumnId":"1083184065324126208","encoding":"GBK"},{"id":2,"newsListUrl":"http://www.hndt.com/nanyang/news/latest/index.html","newsListUrlRule":"http://www.hndt.com/nanyang/news/{code}/index.html","newsListTitle":"div.title > a","titleUrl":"div.title > a","newsListRule":"#articleList > ul","newsRule":"http://www.hndt.com/nanyang/news/latest/{year}/{month}/{code}/index.html","titleRule":"#main > div.content > div.mainContent > div > div.contArticle_tit > h3","contentRule":"#fontzoom","formRule":"#main > div.content > div.mainContent > div > div.contArticle_author > div.fl > span:nth-child(1)","clumnId":"1108260929071616000","encoding":"GBK"},{"id":3,"newsListUrl":"http://sports.people.com.cn/GB/22172/31955/index.html","newsListUrlRule":"http://sports.people.com.cn/GB/{date}/{code}/index.html","newsListTitle":"li a","titleUrl":"ul > li > a","newsListRule":"body > div.w1000.ej_content.mt30.clear.clearfix > div.fl.w655 > div.ej_list_box.clear","newsRule":"http://sports.people.com.cn/n1/{year}/{date}/{code}.html","titleRule":"body > div.clearfix.w1000_320.text_title > h1","contentRule":"#rwb_zw","formRule":"body > div.clearfix.w1000_320.text_title > div > div.fl > a","clumnId":"1108260929071616000","encoding":"GBK"},{"id":4,"newsListUrl":"http://henan.people.com.cn/GB/363904/index.html","newsListUrlRule":"http://henan.people.com.cn/{adress}/{code}/index.html","newsListTitle":"a","titleUrl":"a","newsListRule":"body > div.w1000.ej_content.mt30.clear.clearfix > div.fl.w655 > div.ej_list_box.clear > ul > li","newsRule":"http://henan.people.com.cn/{ti}/{year}/{data}/{code}.html","titleRule":"body > div.clearfix.w1000_320.text_title > h1","contentRule":"body > div.clearfix.w1000_320.text_con > div.fl.text_con_left > div.box_con","formRule":"body > div.clearfix.w1000_320.text_title > div > div.fl > a","clumnId":"1108260634639863808","encoding":"GBK"},{"id":5,"newsListUrl":"http://henan.people.com.cn/GB/356896/index.html","newsListUrlRule":"http://henan.people.com.cn/{adress}/{code}/index.html","newsListTitle":"a","titleUrl":"a","newsListRule":"body > div.w1000.ej_content.mt30.clear.clearfix > div.fl.w655 > div.ej_list_box.clear > ul > li","newsRule":"http://henan.people.com.cn/{ti}/{year}/{data}/{code}.html","titleRule":"body > div.clearfix.w1000_320.text_title > h1","contentRule":"body > div.clearfix.w1000_320.text_con > div.fl.text_con_left > div.box_con","formRule":"body > div.clearfix.w1000_320.text_title > div > div.fl > a","clumnId":"1108260634639863808","encoding":"GBK"},{"id":6,"newsListUrl":"http://www.nydt.cn/Category_32/Index.aspx","newsListUrlRule":"http://www.nydt.cn/{code}/Index.aspx","newsListTitle":"a","titleUrl":"a","newsListRule":"#articleList > ul > li > div > div.title","newsRule":"http://www.nydt.cn/Item/{code}.aspx","titleRule":"#main > div.content > div.mainContent > div > div.contArticle_tit > h3","contentRule":"#fontzoom","formRule":"#main > div.content > div.mainContent > div > div.contArticle_author > div.fl > span:nth-child(1)","clumnId":"1108260634639863808","encoding":"UTF-8"},{"id":7,"newsListUrl":"http://www.hndt.com/nanyang/news/latest/index.html","newsListUrlRule":"http://www.hndt.com/nanyang/news/{code}/index.html","newsListTitle":"div.title > a","titleUrl":"div.title > a","newsListRule":"#articleList > ul","newsRule":"http://www.hndt.com/nanyang/news/latest/{year}/{month}/{code}/index.html","titleRule":"#main > div.content > div.mainContent > div > div.contArticle_tit > h3","contentRule":"#fontzoom","formRule":"#main > div.content > div.mainContent > div > div.contArticle_author > div.fl > span:nth-child(1)","clumnId":"1108260929071616000","encoding":"GBK"},{"id":8,"newsListUrl":"http://www.hndt.com/nanyang/news/latest/index.html","newsListUrlRule":"http://www.hndt.com/nanyang/news/{code}/index.html","newsListTitle":"div.title > a","titleUrl":"div.title > a","newsListRule":"#articleList > ul","newsRule":"http://www.hndt.com/nanyang/news/latest/{year}/{month}/{code}/index.html","titleRule":"#main > div.content > div.mainContent > div > div.contArticle_tit > h3","contentRule":"#fontzoom","formRule":"#main > div.content > div.mainContent > div > div.contArticle_author > div.fl > span:nth-child(1)","clumnId":"1108260929071616000","encoding":"GBK"},{"id":9,"newsListUrl":"http://www.hndt.com/nanyang/news/latest/index.html","newsListUrlRule":"http://www.hndt.com/nanyang/news/{code}/index.html","newsListTitle":"div.title > a","titleUrl":"div.title > a","newsListRule":"#articleList > ul","newsRule":"http://www.hndt.com/nanyang/news/latest/{year}/{month}/{code}/index.html","titleRule":"#main > div.content > div.mainContent > div > div.contArticle_tit > h3","contentRule":"#fontzoom","formRule":"#main > div.content > div.mainContent > div > div.contArticle_author > div.fl > span:nth-child(1)","clumnId":"1108260929071616000","encoding":"GBK"},{"id":10,"newsListUrl":"http://www.hndt.com/nanyang/news/latest/index.html","newsListUrlRule":"http://www.hndt.com/nanyang/news/{code}/index.html","newsListTitle":"div.title > a","titleUrl":"div.title > a","newsListRule":"#articleList > ul","newsRule":"http://www.hndt.com/nanyang/news/latest/{year}/{month}/{code}/index.html","titleRule":"#main > div.content > div.mainContent > div > div.contArticle_tit > h3","contentRule":"#fontzoom","formRule":"#main > div.content > div.mainContent > div > div.contArticle_author > div.fl > span:nth-child(1)","clumnId":"1108260929071616000","encoding":"GBK"},{"id":11,"newsListUrl":"http://www.hndt.com/nanyang/news/latest/index.html","newsListUrlRule":"http://www.hndt.com/nanyang/news/{code}/index.html","newsListTitle":"div.title > a","titleUrl":"div.title > a","newsListRule":"#articleList > ul","newsRule":"http://www.hndt.com/nanyang/news/latest/{year}/{month}/{code}/index.html","titleRule":"#main > div.content > div.mainContent > div > div.contArticle_tit > h3","contentRule":"#fontzoom","formRule":"#main > div.content > div.mainContent > div > div.contArticle_author > div.fl > span:nth-child(1)","clumnId":"1108260929071616000","encoding":"GBK"}]}'
export default {
    name:'Form',
    data(){
        return{
            content:[],
            selectCloum:"",            
            ruleContent:[],
            selectRule:'',
            res:{},
            testData:{},
            loading: false,
            // fullRule:{},
            fullRule:JSON.parse(str).data,
            checkRuleId:'',
            toggle:'',
            saveRes:'',
            activeName: 'second',
            weChatData:{title:'中央纪委国家监委网站',id:'zyjwgjjw',info:'中央纪委国家监委网站官方微信公众号',url:'https://mp.weixin.qq.com/'},
            wxData:'',
        }
    },
    
    watch:{
        selectCloum(){
            this.ruleContent=[],
            this.res={},
            this.testData={},
            this.getRule()
        },
        /** 选择规则          
          */ 
        selectRule(){
            this.res={};
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
                    this.res=this.saveRes;
                    // alert(data.data);
                }
            },
            error:function (data) {
                alert("请求失败");
            }
        });
        }
       
    },
    created(){   

            // this.getFullRule();   
               var _this = this
                 return new Promise((resolve, reject) => {
                   columnList({},1,1000)
                    .then((response) => {
                        _this.$nextTick(()=>{
                            _this.content = response.data.result.content
                            console.log(_this.content)
                        })
                        resolve()
                    })
                    .catch((error) => {
                        reject(error)
                    })
                }) 
               


    },
    
    methods:{
        /** 选择栏目          
        */         
        getRule(){
            this.$.ajax({
                    type:"POST",
                    url:Cpath+":19080/content-grab/newslist/getAllRuleByClumnId",
                    data:{
                        "clumnid" :this.selectCloum.channelId,
                    },
                    success:(data)=> {
                        if(data.status=="success"){
                            return this.ruleContent=data.data;
                           

                        }else {
                             this.res=this.saveRes;
                            // alert(data.data);
                        }
                    },
                    error:function (data) {
                        alert("请求失败");
                    }
                });
        },

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
            return true;
        },
        getFullRule(){
            this.fullRule={};
            this.$.ajax({
                    type:"GET",
                    url:Cpath+":19080/content-grab/newslist/getallrule",
                    
                    success:(data)=> {
                        if(data.status=="success"){
                            return this.fullRule=data.data;
                           

                        }else {
                            alert(data.data);
                        }
                    },
                    error:function (data) {
                        alert("请求失败");
                    }
                });
        },
        test(){
            let flag=this.check();
            if(flag){
                this.loading=true;           
                this.$.ajax({
                    type:"POST",
                        url:Cpath+":19080/content-grab/newslist/getnewslist",
                        data:{
                            "column" : this.res.clumnId,
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
                                this.loading=false;
                                this.testData=data.data;
                            
                            }else {
                                this.loading=false;
                                alert("请求失败")
                            }
                        },
                        error:(data)=> {
                            this.loading=false;
                            alert(data);
                        }
                });
            }
            
        },
        save() {
            var id=this.selectRule;         
            if(id==" " || id==null){
                alert("确定要修改这条规则信息吗？")
            }
            let flag=this.check();        
            if(flag){
                this.loading=true;
                this.$.ajax({
                    type:"POST",            
                    url:Cpath+":19080/content-grab/newslist/saverule",
                    data:{
                        "id":this.selectRule,
                        "column" : this.res.clumnId,
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
                    success:(data)=> {
                        this.loading=false;
                        alert("成功");
                        this.getRule();
                    },
                    error:(data)=> {
                        this.loading=false;
                        alert("失败");
                    }
                });
            } 
        
        },
        saveAs(){
            let flag=this.check();        
            if(flag){
                this.loading=true;
                this.$.ajax({
                    type:"POST",            
                    url:Cpath+":19080/content-grab/newslist/saverule",
                    data:{
                        "id":'',
                        "column" : this.res.clumnId,
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
                    success:(data)=> {
                        this.loading=false;
                        alert("成功");
                        this.getRule();
                    },
                    error:(data)=> {
                        this.loading=false;
                        alert("失败");
                    }
                });
            } 
        },
        choice(e){
            this.checkRuleId=e-1;
            this.res=this.fullRule[e-1];
            this.saveRes=this.res;
            this.selectCloum="";
            this.selectRule="";
            console.log(e)
        },
        stopRequest(){
            return false
        },
         handleClick(tab, event) {
        console.log(tab, event);
        },
        wxcheck(){
            if(this.weChatData.title==""||this.res.title==null){
                alert("公众号号不能为空！");
                return false;
            }
            if(this.weChatData.id==""||this.res.id==null){
                alert("微信号不能为空！");
                return false;
            }
            if(this.weChatData.info==""||this.res.info==null){
                alert("功能介绍不能为空！");
                return false;
            }
            if(this.weChatData.url==""||this.res.url==null){
                alert("URL不能为空！");
                return false;
            }
            return true
        },
        wxtest(){
            //  let flag=this.wxcheck();
            // if(flag){
                this.loading=true;           
                this.$.ajax({
                    type:"GET",
                        url:Cpath+":19080/content-grab/wechatarticle/testwechat?number=gh_840cb6b31ef7",
                        // dataType: "json",
                        success:(data)=> {
                            if(data.status=="success"){
                                // alert(data.data.title);
                                this.loading=false;
                                console.log(data)
                                this.wxData=data.data;
                            
                            }else {
                                this.loading=false;
                                alert("请求失败")
                            }
                        },
                        error:(data)=> {
                            this.loading=false;
                            alert(data);
                        }
                });
            // }
        },
        wxsave(){
            //  let flag=this.wxcheck();
            // if(flag){
                this.loading=true;           
                this.$.ajax({
                    type:"GET",
                        url:Cpath+":19080/content-grab/wechatarticle/saveWechatRule?number=XXTV0373&name=新乡广播电视台",
                        // dataType: "json",
                        success:(data)=> {
                            if(data.status=="success"){
                                // alert(data.data.title);
                                this.loading=false;
                                console.log(data)
                                this.wxData=data.data;
                            
                            }else {
                                this.loading=false;
                                alert("请求失败")
                            }
                        },
                        error:(data)=> {
                            this.loading=false;
                            alert(data);
                        }
                });
            // }
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
    .left{
        float:left;
        width:550px;
        
    }
    .right{
        float:left;
        width:650px;
       
    }
    .formBox{
        margin-left:20px;
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
    .forminfo{
        overflow:hidden;
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
        width:56px;
        height:28px;
        background-color:#409EFF;
        font-size:12px;
        border-radius:5px;
        color:#fff;        
        line-height:28px;
        text-align:center;
        border:none;
        outline:none;

    }
    button:active{
        opacity:0.8;
    }
    textarea{
        width:526px;
        resize:none;    

    }
    .textinput{
         min-height:400px;

         
    }
    
    .topaside{
        overflow:hidden;

    }
    .topaside label{
    
    }
    .topaside textarea{
        
    }




        .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin-bottom:5px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height:36px;
    text-indent:1em;
  }
  .active{
      background:#42B983;
      color:#fff;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>

