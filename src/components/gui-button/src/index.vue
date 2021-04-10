<template>
    <div class="gui-button" :class="['gui-button', {'gui-button-disabled': disabled}]">
        <span>{{ text }}</span>
    </div>
</template>

<script>
export default {
    name: "gui-button",
    props: {
        text: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentVal: this.value
        }
    },
    methods: {
        handleClick() {
            console.log('handleClick')
        }
    }
}
</script>

<style lang="less" scoped>
    @import url('../../../assets/styles/index.less');
    @import url('./gui-button.less');;
</style>