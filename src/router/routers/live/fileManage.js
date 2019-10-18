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
    icon: "fileManage",
    role: "live"
  },
  name: "live",
  children: [
    
    {
        /**
         * 音视频转码
         */
        path: "ARTranscode",
        component: () => import(`@/${path}/ARTranscode`),
        name: "ARTranscode",
        meta: {
          title: "ARTranscode",
          icon: "videoTranscode",
          role: "live"
        }
      }
      ,
    {
        /**
         * 图片转码
         */
        path: "imageTanscode",
        component: () => import(`@/${path}/imageTranscode`),
        name: "imageTanscode",
        meta: {
          title: "imageTanscode",
          icon: "imageTranscode",
          role: "live"
        }
      }
      
  ]
};
export default fileManage;
