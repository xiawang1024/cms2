import Layout from "@/views/layout/Layout";
import {
  systemSetPath
} from "../config";
// 组件所在位置
const path = `views/${systemSetPath}`;
console.log(path);
// TODO:左侧菜单 直播
const systemSet = {
  path: `/${systemSetPath}/systemSetPath`,
  component: Layout,
  meta: {
    title: "liveConfig",
    icon: "liveClue",
    role: "systemSet"
  },
  name: "live",
  children: [

    {
      /**
       * 数据权限配置
       */
      path: 'dataPermission',
      component: () => import(`@/${path}/dataPermission`),
      name: 'dataPermission',
      meta: {
        title: 'dataPermission',
        icon: 'password',
        role: 'systemSet'
      },
    }
  ]
};
export default systemSet;
