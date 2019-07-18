
import request from "@/utils/request";
import QS   from "qs";
let Cpath = "http://fupload.test.dianzhenkeji.com";

//直播流
//删除
export function needMerge(data) {
  return request({
    url: Cpath + `/chunk/mergeFile`,
    method: "post",
    data:QS.stringify(data),

    loadingConfig: {
      noLoading: true
    }
  });
}