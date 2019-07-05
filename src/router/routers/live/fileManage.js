import Layout from "@/views/layout/Layout";
import { livePath } from "../config";
// 组件所在位置
const path = `views/${livePath}/fileManage`;
console.log(path);
// TODO:左侧菜单 直播
const fileManage = {
  path: `/${livePath}/fileManage`,
  component: Layout,
  meta: {
    title: "fileManage",
    icon: "liveClue",
    role: "live"
  },
  hidden:true,
  name: "fileManage",
  children: [
    
    {
        /**
         * 文件管理
         */
        path: "fileManage",
        component: () => import(`@/${path}/fileManage`),
        name: "fileManage",
        //   redirect: '/newCommand/manageClue/discloseList',
        meta: {
          title: "fileManage",
          icon: "commonManuscript",
          role: "live"
        },
       
      }
      
    
  ]
};
export default fileManage;
