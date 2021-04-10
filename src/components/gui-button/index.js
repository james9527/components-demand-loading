import GuiButton from './src/index.vue';

GuiButton.install = function (Vue) {
  Vue.component(GuiButton.name, GuiButton)
}

export default GuiButton;
