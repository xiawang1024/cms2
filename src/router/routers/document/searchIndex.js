import Layout from "@/views/layout/Layout";
import { documentPath } from "../config";
// 组件所在位置
const path = `views/${documentPath}/searchEngine`;
// TODO:左侧菜单 搜搜引擎
const searchEngine = {
  path: `/${documentPath}/searchEngine`,
  component: Layout,
  meta: {
    title: "",
    icon: "searchEngine",
    role: "library"
  },
  name: "library",
  children: [
    
    {
        /**
         * 搜索首页
         */
        path: "searchSpider",
        component: () => import(`@/${path}/searchSpider`),
        name: "searchSpider",
        meta: {
          title: "searchSpider",
          icon: "searchSpider",
          role: "library"
        }
      },{
        /**
         * 搜索列表
         */
        path: "searchList",
        component: () => import(`@/${path}/searchList`),
        name: "searchList",
        meta: {
          title: "searchList",
          icon: "searchSpider",
          role: "library"
        },
        hidden:true
      }
      
  ]
};
export default searchEngine;
