# Jetee - 轻量级的渐进式 Web MVVM框架

Jetee是一个前端的轻量级的渐进式 MVVM框架，不依赖任何第三方库。采用数据双向绑定，以数据驱动视图，倡导组件化开发。

----

<!-- toc -->

----

## [文档](https://theajack.gitee.io/jet/) | [jetee-cli](https://github.com/theajack/jet-js-cli)

### 介绍

Jetee 是一款轻量级、渐进式的MVVM框架 [Jetee](https://theajack.gitee.io/jet)，详细使用和安装教程请[点击这里](https://theajack.gitee.io/jet)
Jetee不依赖任何第三方库，采用数据双向绑定，以数据驱动视图。

Jetee可以在非服务器环境中开发。 Jetee可以通过引入script标签的方式局部使用，从而可以与您已有的项目完美结合，实现渐进式的Web开发。

您也可以通过 [jetee-cli](https://www.npmjs.com/package/jet-js-cli) 建立项目 或是 手动下载 <a href="https://theajack.gitee.io/jet/jet-template.zip" download='jet-template.zip' class='link'>Jetee模板</a> 来在服务器环境中开发。

### 图解

在使用和学习Jetee之前，先通过一张图了解一下Jetee是如何工作，以及Jetee能做些什么。

以下是一个标准的Jetee应用的所有主要部分和工作流程。

Jetee将 DOM树映射成Jetee组件树，Jetee组件由`new Jet()`声明， 每一个Jetee组件由源数据、响应数据、函数、Jetee元素树、生命周期和非响应数据构成。 其中Jetee元素树对应的是由Jetee容器中的DOM树映射而成。

Jetee元素分为两大类：绑定元素和工具元素。这些元素都继承自Jetee.Base，Jetee元素是Jetee MVVM模式的核心。 每个Jetee元素由`源数据`、`响应域数据`、`DOM元素`、`响应域函数队列`、`$regist`、`$refresh`还有其他一些方法组成， 其中View对应的就是DOM元素，Modal对应的是源数据，其他部分构成ViewModel，负责源数据与DOM之间的双向绑定。

除此之外，Jetee还包含一些外围设施供开发者开箱即用，帮助更高效的构建Web应用。

Jetee组件包含的特性和Jetee元素包含的修饰属性，为Jetee应用赋予更强大的功能。

![Jetee 图解](https://theajack.gitee.io/jet/src/image/Jet%E5%9B%BE%E8%A7%A3.jpg)

每一个Jetee组件都有它的生命周期，包含以下9个， 大致流程请参考下图:

![Jetee 生命周期](https://theajack.gitee.io/jet/src/image/Jet%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.jpg)

### 一个基本的Jetee实例

以下是一个简单的Jetee组件
[点击这里](https://theajack.gitee.io/jet/#/code) 可以在线使用这个例子
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
[点击这里](https://theajack.gitee.io/jet/#/code) 可以在线使用这个例子