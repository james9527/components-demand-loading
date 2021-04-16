import GuiButton from './components/gui-button/index.js';
import GuiFastEntry from './components/gui-fast-entry/index.js';
import GuiImageSingle from './components/gui-image-single/index.js';
import GuiImageDouble from './components/gui-image-double/index.js';
import GuiImageThree from './components/gui-image-three/index.js';
import GuiImageFourList from './components/gui-image-four-list/index.js';
import GuiTempletFloorPhoto from './components/gui-templet-floor-photo/index.js';

const components = {
  GuiButton,
  GuiFastEntry,
  GuiImageSingle,
  GuiImageDouble,
  GuiImageThree,
  GuiImageFourList,
  GuiTempletFloorPhoto
}

const install = function (Vue, opts = {}) {
  if (install.installed) return;

  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: process.env.VERSION,
  install,
  ...components
}