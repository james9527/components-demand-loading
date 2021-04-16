<template>
    <ul :class="['gui-fast-entries', isMargin ? 'mrg' : '', isPadding ? 'pdd' : '']" :style="{backgroundColor: tempBgColor}">
        <li class="item" v-for="(item, index) in shortcutList" :key="index" :style="{justifyContent: 'space-around', width: calcItemWidth}">
            <a :href="item.menuLink">
                <dl>
                    <dt class="icon" :style="{backgroundImage: `url(${item.menuImg || 'none'})`}"></dt>
                    <dd class="name" :style="{color: tempTxtFontColor}">{{ item.menuName }}</dd>
                </dl>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'GuiFastEntries',
    props: {
        dataInfo: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        isMargin () {
            const obj = this.dataInfo;
            return (obj && obj.tagShortcutTemplet && obj.tagShortcutTemplet.templateMargin === 0) ? true : false;
        },
        isPadding () {
            const obj = this.dataInfo;
            return (obj && obj.tagShortcutTemplet && obj.tagShortcutTemplet.templatePadding === 0) ? true : false;
        },
        tempTxtFontColor() {
            const obj = this.dataInfo;
            return obj && obj.templateContentFontColor;
        },
        tempBgColor () {
            const obj = this.dataInfo;
           return obj && obj.templateBgColor || '#fff';
        },
        shortcutList() {
            const obj = this.dataInfo;
            let list = (obj && obj.tagShortcutTemplet && obj.tagShortcutTemplet.shortcutList) ? obj.tagShortcutTemplet.shortcutList : [];
            return list;
        },
        calcItemWidth() {
            const obj = this.dataInfo;
            let list = (obj && obj.tagShortcutTemplet && obj.tagShortcutTemplet.shortcutList) ? obj.tagShortcutTemplet.shortcutList : [];
            let width = '';
            switch (list.length) {
                case 6:
                    width = '25%';
                    break;
                case 8:
                    width = '18%';
                    break;
                default:
                    break;
            }
            return width;
        }
    },
    data() {
        return {
        }
    }
}
</script>

<style lang="less">
@import url('../../../styles/components/gui-fast-entries.less');
</style>
