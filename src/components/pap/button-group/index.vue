<template>
	<el-row style="margin-top: 6px; float: right;">
		<el-button size="mini" style="margin-left:5px"  v-for="(buttoninfo,index) in buttonArray" v-if="authCheck(buttoninfo.auth) && (buttoninfo.details === undefined || buttoninfo.details.length === 0)" :key='index'
      :buttoninfo='buttoninfo' :type="buttoninfo.type ? buttoninfo.type : 'primary'" :icon="buttoninfo.icon" :disabled=buttoninfo.disabled @click="onSubmit(buttoninfo.click)"
		>{{buttoninfo.name}}
		</el-button>
		<el-dropdown style="margin-left: 5px;" type="info" trigger="click" :key='index' v-for="(buttoninfo,index) in buttonArray" v-if="authCheck(buttoninfo.auth) && (buttoninfo.details && buttoninfo.details.length > 0)">
			<el-button  size="mini" :type="buttoninfo.type ? buttoninfo.type : 'primary'" :icon="buttoninfo.icon">
				{{buttoninfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
			</el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item :key='detailindex' v-if="authCheck(buttondetailinfo.auth)" v-for="(buttondetailinfo,detailindex) in buttoninfo.details">
					<el-button  size="mini" type="text" :icon="buttondetailinfo.icon" :disabled=buttondetailinfo.disabled @click="onSubmit(buttondetailinfo.click)">
						{{buttondetailinfo.name}}
					</el-button>
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<slot></slot>
	</el-row>
</template>

<script>
/* eslint-disable */
  export default{
    name:'button-group',
    props:{
      /**
			 * buttonArray: [
				 {name:'新建',click:'creat',type:'primary',icon:'el-icon-search'},
				 {name:'编辑',click:'edit',disabled:true},
				 {name:'文档',icon:'el-icon-document',click:'query',
							details:[{name:'导出',icon:'el-icon-download',click:'export-click'},{name:'导入',icon:'el-icon-upload2',click:'import-click'}
							]
						}
				 ]
       */
      buttonArray:{
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return {

      }
    },
    methods:{
			authCheck (btnCode) {
					return true
			},
      onSubmit(clickMethod){
        if(clickMethod){
          this.$emit(clickMethod)
        }
      },
    }
  }
/* eslint-disable */
</script>

<style scoped>
	.el-row{
		margin-bottom: 10px;
	}
	.el-button--text{
		color: #000000;
	}
</style>
