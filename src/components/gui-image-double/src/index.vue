<template>
  <div :class="[
    'gui-image-double-wrapper'
  ]">
    <ul class="img-list">
      <li
        v-for="(item, index) in imgList"
        :key="index"
        :style="{marginRight: dataInfo.templateMargin}"
      >
        <a :href="item.scheme" :data-code="templetId + '-' + (index+1)">
          <img v-lazy="item.imageUrl" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GuiImageDouble",
  props: {
    dataInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    templetCode () {
      return this.dataInfo 
          && this.dataInfo.templetCode || 'floorPhotoTemplet'
    },
    imgList() {
      let list =
        this.dataInfo.imgList || this.dataInfo[this.templetCode].imgList || [];
      return list;
    },
    templateCorner () {
      let corner = this.dataInfo
        && this.dataInfo[this.templetCode]
        && this.dataInfo[this.templetCode].templateCorner || '-1'
      return 'template-corner' + corner
    },
    templetId() {
      return this.dataInfo && this.dataInfo.templetId || 'GuiImageDouble'
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less">
@import url('../../../styles/components/gui-image-double.less');
</style>
