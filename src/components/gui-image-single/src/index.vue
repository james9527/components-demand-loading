<template>
  <div class="gui-image-single-wrapper">
      <a 
        :href="imgList.length && imgList[0].scheme" 
        :data-code="templetId+'-1'"
        :class="['singlePic']">
        <img 
          class="img"
          :src="imgList.length && imgList[0].imageUrl" 
          onerror="this.src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'GuiImageSingle',
  data () {
    return {
    }
  },
  props: {
    dataInfo: {
      type: Object,
      default: ()=>{}
    }
  },
  created () {
  },
  computed:{
    templetCode () {
      return this.dataInfo 
          && this.dataInfo.templetCode || 'floorPhotoTemplet'
    },
    isPadding () {
      return this.dataInfo 
          && this.dataInfo[this.templetCode] 
          && this.dataInfo[this.templetCode].templatePadding==1 ? 'template-padding' : ''
    },
    imgList () {
      return this.dataInfo 
          && this.dataInfo[this.templetCode] 
          && this.dataInfo[this.templetCode].imgList || []
    },
    templetId() {
      return this.dataInfo && this.dataInfo.templetId || 'GuiImageSingle'
    }
  },
}
</script>

<style lang="less" scoped>
@import url('./gui-image-single.less');
</style>