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

<style lang="less">
    @import url('../../../styles/components/gui-button.less');;
</style>