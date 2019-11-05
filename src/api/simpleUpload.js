import request from "@/utils/request";
import QS from "qs";
import baseUrl from "@/config/base-url";
// let Cpath = "http://fupload.test.dianzhenkeji.com";
// let Cpath = "http://fupload.test.dianzhenkeji.com";
let Cpath = baseUrl.SIMPLE_MERGE_URL
//直播流
//删除
export function needMerge(data) {
  return request({
    url: Cpath + `/chunk/mergeFile`,
    method: "post",
    data: QS.stringify(data),

    loadingConfig: {
      noLoading: true
    },
    timeout: 20000
  });
}
