<template>
  <div class="gui-image-four-list-wrapper">
    <ul class="img-list">
      <li v-for="(item, index) in imgList" :key="index">
        <a :href="item.scheme" :data-code="templetId + '-' + (index+1)">
          <img v-lazy="item.imageUrl" />
        </a>
      </li>
    </ul>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: "GuiImageFourList",
  props: {
    dataInfo: {
      type: Object,
      default: ()=>{}
    }
  },
  computed: {
    templetCode () {
      return this.dataInfo 
          && this.dataInfo.templetCode || 'floorPhotoTemplet'
    },
    imgList() {
      let list = this.dataInfo
        && this.dataInfo[this.templetCode]
        && this.dataInfo[this.templetCode].imgList || [];
      return list;
    },
    templetId() {
      return this.dataInfo && this.dataInfo.templetId || 'GuiImageFourList'
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import url('./gui-image-four-list.less');
</style>
