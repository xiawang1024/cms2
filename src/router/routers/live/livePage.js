import Layout from "@/views/layout/Layout";
import { livePath } from "../config";
// 组件所在位置
const path = `views/${livePath}/liveConfig`;
console.log(path);
// TODO:左侧菜单 指挥调度
const livePage = {
  path: `/${livePath}/liveConfig`,
  component: Layout,
  meta: {
    title: "liveConfig",
    icon: "commandDispatch",
    role: "cms"
  },
  name: "live",
  children: [
    {
      /**
       * 直播配置
       */
      path: "liveControl;",
      component: () => import(`@/${path}/liveControl`),
      name: "liveControl",
      //   redirect: '/newCommand/manageClue/discloseList',
      meta: {
        title: "liveControl",
        icon: "allTask",
        role: "cms"
      }
    }
  ]
};
export default livePage;
