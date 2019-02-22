<template>
  <el-upload
    :http-request="imageUpload"
    :show-file-list="false"
    :before-upload="beforeImageUpload"
    :disabled="uploadLoading"
    action="unquire"
    accept="image/jpeg, image/jpg, image/png"
  >
    <el-button
      :loading="uploadLoading"
      :disabled="uploadLoading"
      class="upload-button"
      size="small"
      type="primary"
    >{{ uploadLoading ? "图片上传中" : "上传图片" }}</el-button>
  </el-upload>
</template>

<script>
export default {
  name: 'UploadBtn',
  props: {
    value: {
      type: [String],
      default: ''
    },
    imageSize: {
      type: [Number],
      default: 5
    }
  },
  data: function() {
    return {
      uploadLoading: false,
      uploadFinish: false
    }
  },
  methods: {
    /**
     * 上传图片前判断图片大小
     * @param file
     * @return {boolean}
     */
    beforeImageUpload(file) {
      const size = file.size / 1024 / 1024 < this.imageSize // 上传图片大小不超过10M
      if (!size) {
        this.$message.warning(`上传图片大小不能超过 ${this.imageSize}MB!`)
      }
      console.log(size)
      return size
    },
    /**
     * 上传图片
     * @param item
     */
    imageUpload(item) {
      const _this = this
      _this.uploadLoading = true
      console.log(item)
      this.imageFormat(item)
        .then(resImg => {
          console.log(resImg)
          _this.$api.program
            .pictureUpload(resImg.data)
            .then(res => {
              console.log(resImg)
              if (res.data !== '') {
                _this.$emit('input', `http://${res.data}`)
                _this.$nextTick(() => {
                  _this.$refs.image.src = resImg.src
                })
                _this.$message.success('图片上传成功！')
              } else {
                _this.$message.error('上传失败!')
              }
            })
            .catch(err => {
              console.error(err)
            })
            .finally(() => {
              _this.uploadLoading = false
              _this.uploadFinish = true
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 图片上传
     * @param file
     * @return {Promise<any>}
     */
    imageFormat(file) {
      console.log(file)
      const reader = new FileReader()
      if (file.hasOwnProperty('file')) {
        reader.readAsDataURL(file.file)
      } else {
        reader.readAsDataURL(file)
      }
      return new Promise(resolve => {
        reader.onload = function() {
          const image = new Image()
          image.src = this.result.toString()
          image.onload = () => {
            const compressUrl = compress(image) // 压缩图片
            const blob = base64ToBlob(compressUrl.split(',')[1], 'image/jpeg') // 压缩成jpeg格式
            const formData = new FormData()
            formData.append('file', blob, 'jpg')
            resolve({
              data: formData,
              src: image.src
            })
          }
        }
      })
    },
    updateUrl(event) {
      console.log('event========', event)
    }
  },
  template: '#upload'
}
/**
 * 压缩图片
 * @param img
 * @return {string}
 */
const compress = img => {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  const width = img.width
  const height = img.height
  canvas.width = width
  canvas.height = height
  context.fillStyle = '#fff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(img, 0, 0, canvas.width, canvas.height)
  const base64Data = canvas.toDataURL('image/jpeg', 0.92)
  canvas = context = null
  img = null
  return base64Data
}

/**
 * base64转化为blob二进制文件
 * @param b64Data
 * @param contentType
 * @return {Blob}
 */
const base64ToBlob = (b64Data, contentType) => {
  contentType = contentType || ''

  const byteCharacters = atob(b64Data) // 解码base64数据为二进制字符串
  const buffer = [] // 注意，Blob第一个参数必须是一个数组

  // 类型数组用来处理二进制文件
  const aBuffer = new ArrayBuffer(byteCharacters.length)
  const uBuffer = new Uint8Array(aBuffer)
  for (let i = 0; i < byteCharacters.length; i++) {
    uBuffer[i] = byteCharacters.charCodeAt(i) // 得到Unicode编码，存进类型数组
  }
  buffer.push(uBuffer)
  //  普通数组是无法生成二进制文件的
  const blob = new Blob(buffer, {
    // 生成一个二进制文件
    type: contentType
  })
  return blob
}
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to .fade-leave-active {
  opacity: 0;
}
</style>
