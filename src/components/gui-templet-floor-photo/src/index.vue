<template>
    <div :class="[isMargin, isCorner, isBorder]">
        <header class="template-header" :style="{padding: headerPic ? 'unset' : '.2rem'}" v-if="displayName || headerPic">
            <div v-if="!isHeaderBg && displayName">
                <div class="title">{{ displayName }}</div>
                <div class="subtitle">{{ subTitleName }}</div>
            </div>
            <div v-else-if="headerPic">
                <img v-lazy="headerPic" />
            </div>
            <a :href="moreUrl" v-if="moreUrl" :data-code="templetId + '-0'">查看更多</a>
        </header>
        <GuiImageSingle v-if="imgRowNum==1" :data-info="dataInfo" />
        <GuiImageDouble v-if="imgRowNum==2" :data-info="dataInfo" />
        <GuiImageThree v-if="imgRowNum==3" :data-info="dataInfo" />
        <GuiImageFourList v-if="imgRowNum==4" :data-info="dataInfo" />
    </div>
</template>

<script>
import GuiImageSingle from '../../gui-image-single';
import GuiImageDouble from '../../gui-image-double';
import GuiImageThree from '../../gui-image-three';
import GuiImageFourList from '../../gui-image-four-list';

export default {
    name: 'GuiTempletFloorPhoto',
    components: {
        GuiImageSingle,
        GuiImageDouble,
        GuiImageThree,
        GuiImageFourList
    },
    props: {
        dataInfo: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        imgRowNum () {
            let colum = this.dataInfo 
                && this.dataInfo[this.templetCode] 
                && this.dataInfo[this.templetCode].imgRowNum || 0
            return colum
        },
        displayName () {
            return this.dataInfo 
                && this.dataInfo.displayName || ''
        },
        subTitleName () {
            return this.dataInfo 
                && this.dataInfo.subTitleName || ''
        },
        isHeaderBg () {
            return this.dataInfo 
                && this.dataInfo.backImgUrl || ''
        },
        headerBg () {
            let bg = this.dataInfo 
                && this.dataInfo.backImgUrl || '',
                color = this.dataInfo 
                && this.dataInfo.displayBackColor || '#fff',
                title = this.dataInfo 
                && this.dataInfo.displayName || ''

            return title || bg ? {
                backgroundColor: `${color}`,
                backgroundImage: `url(${bg || 'unset'})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '100%',
            } : ''
        },
        headerPic () {
            let bg = this.dataInfo 
                && this.dataInfo.backImgUrl || '';
            return bg
        },
        moreUrl () {
            return this.dataInfo 
                && this.dataInfo.scheme || ''
        },
        templetPromo () {
            return this.dataInfo 
                && this.dataInfo.templetPromo || ''
        },
        templetCode () {
            return this.dataInfo 
                && this.dataInfo.templetCode || 'floorPhotoTemplet'
        },
        isMargin () {
            return this.dataInfo 
                && this.dataInfo[this.templetCode] 
                && this.dataInfo[this.templetCode].templateMargin==0 ? 'template-margin' : ''
        },
        isPadding () {
            return this.dataInfo 
                && this.dataInfo[this.templetCode] 
                && this.dataInfo[this.templetCode].templatePadding==1 ? 'template-padding-floor-image' : ''
        },
        isCorner () {
            let corner = this.dataInfo 
                && this.dataInfo[this.templetCode] 
                && this.dataInfo[this.templetCode].templateCorner || '-1'
            return 'template-corner' + corner
        },
        isBorder () {
            let border = this.dataInfo 
                && this.dataInfo[this.templetCode] 
                && this.dataInfo[this.templetCode].borderDisplay || '-1'
            return 'template-border-display' + border
        },
        templetId() {
            return this.dataInfo && this.dataInfo.templetId || 'floorPhotoTemplet'
        }
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>