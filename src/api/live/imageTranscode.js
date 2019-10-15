
import request from "@/utils/request";

let Cpath = "/live-stream";


// {
//     "createTime": "string",
//     "createUser": "string",
//     "imageId": "string",
//     "inputPath": "string",
//     "outputPart": "string",
//     "processTimes": 0,
//     "size1": 0,
//     "size2": 0,
//     "size3": 0,
//     "size4": 0,
//     "state": 0,
//     "title": "string",
//     "updateTime": "string"
//   }

// 添加图片
export function creatimage(data) {
  return request({
    url:
      Cpath +`/editimage/creatimage`,
    method: "post",

  });
}

//删除

export function deleteimage(id) {
    return request({
      url:
        Cpath +`/editimage/deletebyid?id=${id}`,
      method: "delete",
  
    });
  }

  //分页条件检索
  export function imageList(data) {
    return request({
      url:
        Cpath +
        `/editimage/page?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&order=${data.order}&createUser=${data.createUser}&title=${data.title}&state=${data.state}`,
      method: "get"
    });
  }

  //重新转码

  export function retrayImage(id) {
    return request({
      url:
        Cpath +`/editimage/updatebyid?id=${id}`,
      method: "get",
  
    });
  }