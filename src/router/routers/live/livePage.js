import Layout from "@/views/layout/Layout";
import { livePath } from "../config";
// 组件所在位置
const path = `views/${livePath}/liveConfig`;
console.log(path);
// TODO:左侧菜单 直播
const livePage = {
  path: `/${livePath}/liveConfig`,
  component: Layout,
  meta: {
    title: "liveConfig",
    icon: "liveClue",
    role: "live"
  },
  name: "live",
  children: [
    
    {
        /**
         * 直播文件管理
         */
        path: "streamFileManage",
        component: () => import(`@/${path}/streamFileManage`),
        name: "streamFileManage",
        //   redirect: '/newCommand/manageClue/discloseList',
        meta: {
          title: "streamFileManage",
          icon: "commonManuscript",
          role: "live"
        }
      }
      ,
    {
        /**
         * 直播流管理
         */
        path: "directStream",
        component: () => import(`@/${path}/directStream`),
        name: "directStream",
        //   redirect: '/newCommand/manageClue/discloseList',
        meta: {
          title: "directStream",
          icon: "manageClue",
          role: "live"
        }
      },
      {
        /**
         * 流地址管理
         */
        path: "streamAdressManage",
        component: () => import(`@/${path}/streamAdressManage`),
        name: "streamAdressManage",
        //   redirect: '/newCommand/manageClue/discloseList',
        meta: {
          title: "streamAdressManage",
          icon: "allTask",
          role: "live"
        }
      },{
        /**
         * 视频编辑
         */
        path: "videoEdit",
        component: () => import(`@/${path}/videoEdit`),
        name: "videoEdit",
        //   redirect: '/newCommand/manageClue/discloseList',
        meta: {
          title: "videoEdit",
          icon: "allTask",
          role: "live"
        },
        hidden:true
      },
  ]
};
export default livePage;
