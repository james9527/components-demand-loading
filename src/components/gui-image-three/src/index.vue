<template>
  <div class="gui-image-three-wrapper">
    <ul class="img-list">
      <li v-for="(item, index) in imgList" :key="index">
        <a :href="item.scheme" :data-code="templetId + '-' + (index+1)">
          <img v-lazy="item.imageUrl" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GuiImageThree",
  props: {
    dataInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    templetCode () {
      return this.dataInfo 
          && this.dataInfo.templetCode || 'floorPhotoTemplet'
    },
    imgList() {
      let list = this.dataInfo[this.templetCode].imgList || [];
      return list;
    },
    templetId() {
      return this.dataInfo && this.dataInfo.templetId || 'swiperDefault'
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less">
@import url('../../../styles/components/gui-image-three.less');
</style>