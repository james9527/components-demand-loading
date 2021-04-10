import GuiFastEntry from './src/index.vue';

GuiFastEntry.install = function (Vue) {
  Vue.component(GuiFastEntry.name, GuiFastEntry)
}

export default GuiFastEntry;
