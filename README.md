# Jetee - 轻量级的渐进式 Web MVVM框架

Jetee是一个前端的轻量级的渐进式 MVVM框架，不依赖任何第三方库。采用数据双向绑定，以数据驱动视图，倡导组件化开发。

----

<!-- toc -->

- [文档](#%E6%96%87%E6%A1%A3)
  * [0. 快速入门](#0-%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8)
    + [0.1 cdn 使用](#01-cdn-%E4%BD%BF%E7%94%A8)
    + [0.2 npm 使用](#02-npm-%E4%BD%BF%E7%94%A8)
      - [0.2.1 new Jet 创建一个Jetee应用](#021-new-jet-%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AAjetee%E5%BA%94%E7%94%A8)
      - [0.2.2 Jet.create + html-loader 创建一个Jetee应用](#022-jetcreate--html-loader-%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AAjetee%E5%BA%94%E7%94%A8)
      - [0.2.3 Jet.create + json 创建一个Jet应用](#023-jetcreate--json-%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AAjet%E5%BA%94%E7%94%A8)
  * [1. 介绍](#1-%E4%BB%8B%E7%BB%8D)
  * [2. 图解](#2-%E5%9B%BE%E8%A7%A3)
  * [3. 一个简单的Jetee实例](#3-%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84jetee%E5%AE%9E%E4%BE%8B)
  * [4. 插件](#4-%E6%8F%92%E4%BB%B6)

<!-- tocstop -->

----

## [文档](https://theajack.gitee.io/jetee/) | [jetee-cli](https://github.com/theajack/jetee-cli)

### 0. 快速入门

#### 0.1 cdn 使用

```html
<!DOCTYPE html>
<html lang="en">
    <head><meta charset="UTF-8"></head>
    <body>
        <div id="app"></div>
        <script src="https://cdn.jsdelivr.net/npm/jetee/jetee.min.js"></script>
        <script>
            new Jet({
                ele: '#app',
                style: '.jetee{color: #b344c9;font-size: 40px;text-align: center;margin-top: 100px;}',
                template: '<div class="jetee" j="message">$ + "!"</div>',
                data: {
                    message: 'Hello Jetee!'
                }
            });
        </script>
    </body>
</html>
```

#### 0.2 npm 使用

安装

```
npm i jetee
```

##### 0.2.1 new Jet 创建一个Jetee应用

```js
import Jet from 'jetee';

new Jet({
    ele: '#app',
    // 如果使用 vscode 开发推荐使用 es6-string-css 和 es6-string-html 插件
    style: /*css*/`.jetee{color: #b344c9;font-size: 40px;text-align: center;margin-top: 100px;}`,
    template: /*html*/`<div class="jetee" j="message">$ + "!"</div>`,
    data: {
        message: 'Hello Jetee!'
    }
});
```

##### 0.2.2 Jet.create + html-loader 创建一个Jetee应用

该种方式需要安装 html-loader 并配合 webpack使用

html 文件: app.html

```html
<style>
    .jetee{color: #b344c9;font-size: 40px;text-align: center;margin-top: 100px;}
</style>
<div class="jetee" j="message">$ + "!"</div>
<script>
    new Jet({
        data: {
            message: 'Hello Jetee!'
        }
    });
</script>
```

```js
import Jet from 'jetee';
import app from './app.html';

Jet.create(app);
// 或者指定一个容器 Jet.create("#app", app);
```

##### 0.2.3 Jet.create + json 创建一个Jet应用

```js
import Jet from 'jetee';

Jet.create({
    // 如果使用 vscode 开发推荐使用 es6-string-css 和 es6-string-html 插件
    style: /*css*/`.jetee{color: #b344c9;font-size: 40px;text-align: center;margin-top: 100px;}`,
    template: /*html*/`<div class="jetee" j="message">$ + "!"</div>`,
    data: {
        message: 'Hello Jetee!'
    }
});
// 或者指定一个容器 Jet.create("#app", {});
```


### 1. 介绍

Jetee 是一款轻量级、渐进式的MVVM框架 [Jetee](https://github.com/theajack/jetee)，详细使用和安装教程请[点击这里](https://theajack.gitee.io/jetee)
Jetee不依赖任何第三方库，采用数据双向绑定，以数据驱动视图。

Jetee可以在非服务器环境中开发。 Jetee可以通过引入script标签的方式局部使用，从而可以与您已有的项目完美结合，实现渐进式的Web开发。

您也可以通过 [jetee-cli](https://www.npmjs.com/package/jetee-cli) 建立项目 或是 手动下载 <a href="https://github.com/theajack/jetee-template" class='link'>Jetee模板</a> 来在服务器环境中开发。

### 2. 图解

在使用和学习Jetee之前，先通过一张图了解一下Jetee是如何工作，以及Jetee能做些什么。

以下是一个标准的Jetee应用的所有主要部分和工作流程。

Jetee将 DOM树映射成Jetee组件树，Jetee组件由`new Jet()`声明， 每一个Jetee组件由源数据、响应数据、函数、Jetee元素树、生命周期和非响应数据构成。 其中Jetee元素树对应的是由Jetee容器中的DOM树映射而成。

Jetee元素分为两大类：绑定元素和工具元素。这些元素都继承自Jetee.Base，Jetee元素是Jetee MVVM模式的核心。 每个Jetee元素由`源数据`、`响应域数据`、`DOM元素`、`响应域函数队列`、`$regist`、`$refresh`还有其他一些方法组成， 其中View对应的就是DOM元素，Modal对应的是源数据，其他部分构成ViewModel，负责源数据与DOM之间的双向绑定。

除此之外，Jetee还包含一些外围设施供开发者开箱即用，帮助更高效的构建Web应用。

Jetee组件包含的特性和Jetee元素包含的修饰属性，为Jetee应用赋予更强大的功能。

![Jetee 图解](https://theajack.gitee.io/jet/src/image/Jet%E5%9B%BE%E8%A7%A3.jpg)

每一个Jetee组件都有它的生命周期，包含以下9个， 大致流程请参考下图:

![Jetee 生命周期](https://theajack.gitee.io/jet/src/image/Jet%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.jpg)

### 3. 一个简单的Jetee实例

以下是一个简单的Jetee组件

[点击这里](https://theajack.gitee.io/jetee/#/code) 可以在线使用这个例子

```html
<div j='message'></div><br>
<div j='user'>
    <div j=name>'姓名:' + $</div>
    <div>年龄:<input j='age' type='text' class='j-input' jon='input:console.log(this.user.age)'/></div>
    <div j='age'>($ < 18)?'未成年':'成年人'</div>
</div>
<script>
    new Jet({
        data:{
            message:'Hello Jetee',
            user:{
                name:'theajack',
                age:24
            }
        },
        func:{
        }
    })
</script>
```

### 4. 插件

Jetee 目前支持以下几个插件：

1. [jetee-router](https://www.npmjs.com/package/jetee-router) : 路由插件
2. [jetee-valid](https://www.npmjs.com/package/jetee-valid) : 表单验证插件
3. [jetee-lang](https://www.npmjs.com/package/jetee-lang) : 国际化语言插件
4. [jetee-jui](https://www.npmjs.com/package/jetee-jui) : 契合Jetee的ui库
5. [jetee-less](https://www.npmjs.com/package/jetee-less) : 运行时less编译插件
6. [jetee-stat](https://www.npmjs.com/package/jetee-stat) : 开发打印性能插件