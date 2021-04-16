# components-demand-loading

## 组件按需打包实现原理

### 单独注册组件

```js
import GuiButton from './src/index.vue'

GuiButton.install = function (Vue) {
  Vue.component(GuiButton.name, GuiButton)
}

export default GuiButton
```

### 批量注册（兼容全量引入）

```js
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

```

### 按需引入实现

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```sh
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```js
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": false,
      "modules": false
    }]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    [ 
      "component",
      {
        "libraryName": "components-name",
        "styleLibrary": {
          "name": "theme",
          "base": true
        }
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 按钮组件`gui-button` 和 双图组件`gui-image-double`组件，那么需要在 main.js 中写入以下内容：

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
// CMS组件库所需样式（新路径，全量加载所需）
import 'm-cms-components/lib/theme/index.css'
import VueLazyload from 'vue-lazyload'

import {
  GuiButton,
  GuiImageDouble
} from 'components-name'

Vue.use(GuiButton)
Vue.use(GuiImageDouble)

new Vue({
  components: {
    App
  },
  store,
  el: '#app',
  render: h => h(App)
})
```
