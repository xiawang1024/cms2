<template>
  <div class="box">
    <el-row class="atLeft" style="minWidth:1000px;marginRight:10px;" >
      <el-table :data="componentsList" >  
        <el-table-column prop="name" label="组件名字"/>
        <el-table-column prop="url" label="链接地址"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="prime" :disabled="scope.$index==0" @click="handleUp(scope.$index,scope.row)">上移</el-button>
            <el-button size="mini" type="prime" :disabled="scope.$index==componentsList.length-1" @click="handleDown(scope.$index,scope.row)">下移</el-button>
            <el-button size="mini" type="prime" @click="handleEdite(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="atLeft">
      <el-row>
        <el-button class="btn" type="primary" icon="el-icon-circle-plus" @click="add(&quot;banner&quot;)">焦点图</el-button>
      </el-row>
      <el-row>
        <el-button class="btn" type="primary" icon="el-icon-circle-plus" @click="add(&quot;newsList&quot;)">新闻列表</el-button>
      </el-row>
      <el-row>
        <el-button class="btn" type="primary" icon="el-icon-circle-plus" @click="add(&quot;advertisement&quot;)">广告位</el-button>
      </el-row>
      <el-row/>
      <el-button class="btn" type="primary" icon="el-icon-circle-plus" @click="add(&quot;comment&quot;)">评论列表</el-button>
    </el-row>
        
       
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
      <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="130px" :btn-loading = "isLoading"/>
    </el-dialog>
  </div>
</template>
<script>
export default {
    name:'AppPages',
    data(){
        return{
            dialogVisible:false,
            isLoading:false,
            dialogTitle:'',
            formData:{},
            formSettings:[{
                items:[
                    {
                      label: 'URL',
                      name: 'componentPath',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      required: true,
                      placeholder: '请输入URL'
                    }
                ]
            }],
            currentType:'',
            //加载时获取的列表
            componentsList:[
                {
                    name:'轮播图',
                    url:'http:www.baidu.com'
                }
            ]
        }
    },
    created(){
    console.log(this.$route.query.name)
        //发送请求数据


    },
    methods:{
        add(type){
            switch (type){
                case 'banner':
                    this.dialogTitle='添加焦点图';
                    this.formData={};
                    this.currentType='banner';
                    break;
                case 'newsList':
                    this.dialogTitle='添加新闻列表';
                    this.formData={};
                    this.currentType='newsList';
                    break;
                 case 'advertisement':
                    this.dialogTitle='添加广告位';
                    this.formData={};
                    this.currentType='advertisement';
                    break;
                     case 'comment':
                    this.dialogTitle='添加评论';
                    this.formData={};
                    this.currentType='comment';
                    break;
                
            }  
            this.dialogVisible=true
            
        },
        submitSave(res){
            switch(this.currentType){
                case 'banner':
                    this.componentsList.push({
                    name:'轮播图',
                    url:res.componentPath
                    })
                    break;
                case 'newsList':
                    this.componentsList.push({
                    name:'新闻列表',
                    url:res.componentPath
                    })
                    break;
                 case 'advertisement':
                    this.componentsList.push({
                    name:'广告',
                    url:res.componentPath
                    })
                    break;
                     case 'comment':
                    this.componentsList.push({
                    name:'评论',
                    url:res.componentPath
                    })
                    break;
            }
          
               
            this.dialogVisible=false;
            
        },
        handleDown(index,row){
           
            console.log(row)
            let obj=this.componentsList[index];
            console.log(obj)
            this.componentsList.splice(index,1);
            this.componentsList.splice(index+1,0,obj);
        },
        handleUp(index,row){
            console.log(row)
            let obj=this.componentsList[index];
            console.log(obj)
            this.componentsList.splice(index,1);
            this.componentsList.splice(index-1,0,obj);
        },
        handleDelete(index,row){
            this.componentsList.splice(index,1)
        }   
        
    }
}
</script>
<style scoped>
        .box{
            margin:30px;
            /* width:1500px; */
            min-width: 1100px;
            
        }
        .atLeft{
            float: left;
        }
        .atRight{
            float: right;
        }
        .btn{
            margin: 10px;
        }
</style>