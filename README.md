## 组件按需引入实现原理

### 组件单独注册（实现按需引入）

```js
import GuiButton from './src/index.vue'

GuiButton.install = function (Vue) {
  Vue.component(GuiButton.name, GuiButton)
}

export default GuiButton
```
然后，在webpack构建指定entry时为组件集合即多入口配置，output输出时指定library，使用`mini-css-extract-plugin`插件抽离组件独立样式到`lib/theme`目录下。详细webpack配置[请参见](https://github.com/james9527/components-demand-loading/tree/main/build/webpack.prod.multiple.conf.js)，构建完毕后的[效果](https://github.com/james9527/components-demand-loading/tree/main/lib)。

### 按需引入组件方法

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```sh
npm install babel-plugin-component -D
```

然后，将`.babelrc`文件修改为：

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
        "libraryName": "components-library-name",
        "styleLibrary": {
          "name": "theme",
          "base": true
        }
      }
    ]
  ]
}
```
其中，`libraryName`指的是组件库名，与 `package.json` 文件的name属性值一致。

接下来，如果你只希望引入部分组件，比如 按钮组件`gui-button` 和 双图组件`gui-image-double`组件，那么需要在Vue的入口文件中写入以下内容：

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
// 组件库样式（全量加载所需）
// import 'components-library-name/lib/theme/index.css'

import {
  GuiButton,
  GuiImageDouble
} from 'components-library-name'

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
注：按需引入也支持在组件内单独引入，同时在components下进行注册即可。


### 组件批量注册（兼容全量引入）

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

### 全量引入组件方法
可以在Vue的入口文件引入全量组件库js和css文件进行全局安装，不用去修改`.babelrc`文件，全量引入方法如下：

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import componentsLibraryName from 'components-library-name'
// 组件库样式（全量加载所需）
import 'components-library-name/lib/theme/index.css'

// 全局注册
Vue.use(componentsLibraryName)

new Vue({
  components: {
    App
  },
  store,
  el: '#app',
  render: h => h(App)
})
```
也可在组件内部引入，同时在components下进行注册即可。
