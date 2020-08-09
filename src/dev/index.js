
import Jet from '../jetee/index';
import '../plugins/jui';
import '../plugins/lang';
import '../plugins/valid';
import '../plugins/router';
import '../plugins/less';
import '../plugins/stat';

// import Jet from '../../npm/jetee';
// import '../../npm/jui';
// import '../../npm/lang';
// import '../../npm/valid';
// import '../../npm/router';
// import '../../npm/less';
// import '../../npm/stat';

// console.log(Jet);
import html from './html.js';
console.log(html);
// window.aa = html.template;
// import comp from './comp';
// import btn from './btn';
// import lang from './lang';
// import valid from './valid';
// import select from './select';
import router from './router';
// console.log(html);
Jet.router.use(router);
// console.log(html);

Jet.style({
    variable: {
        themeColor: '#f44',
        bg: 'background-color:#4f4',
        // 如使用vscode开发 推荐安装 es6-string-html和 es6-string-css插件
        commonClass: /* css*/`
            .common-class{
                font-weight:bold;
                color:#88f;
            }`
    },
    common: [
        {
            router: ['/a'],
            css: 'body{.test-common1{background-color:#aaa}}'
        }, {
            router: ['/b'],
            css: '.test-common2{color:#f44}'
        }
    ],
    // commonScoped: true,
});
// const hello = 'Hello world!';

// <div j='message'></div><br>
// <i class="j-icon icon-resize"></i>
// <div jload='comp'></div>
// <div jload='comp'></div>
// <div jload='btn'></div>
// <div jload='lang'></div>
// <div jload='lang'></div>
// <div jload='valid'></div>
{/* <div jload='select'></div> */}
// Jet.app('#app', /* html*/`
//     <style>
//     .jetee{color: #b344c9;font-size: 40px;text-align: center;margin-top: 100px;}
//     </style>
//     <div class="jetee" j="message"></div>
//     <script>
//         new Jet({
//             data: {
//                 message: 'Hello Jetee!'
//             }
//         });
//     </script>
// `);
new Jet({
    ele: '#app',
    components: {html},
    style: '.jetee{color: #b344c9;font-size: 40px;text-align: center;margin-top: 100px;}',
    template: `
    <div jcomp="html" ::user='user'></div>
    <div class="jetee" j="message"></div>
    <div j='user'>
        <div j=name>'姓名:'+$</div>
        <div>年龄:<input j='age' type='text' class='j-input' jon='input:logAge'/></div>
        <div j='age'>($<18)?'未成年':'成年人'</div>
    </div>`,
    data: {
        message: 'Hello Jetee!',
        user: {
            name: 'theajack',
            age: 24
        }
    },
    func: {
        logAge () {
            this.$nextTick(() => {
                console.log(this.user.age, this.test);
            });
        }
    }
});

// new Jet({
//     ele: '#app',
//     style: /* css*/`
//         .test-mes{
//             color: ((themeColor));
//             ((bg));
//         }
//     `,
//     components: {
//         comp, btn, lang, valid, select, html
//     },
//     template: /* html*/`
//         <div j='message'></div>
//         <div jcomp='comp' :aaa='message' @log-aha='logHello'></div>
//     `,
//     data: {
//         message: 'Hello Jet',
//         user: {
//             name: 'theajack',
//             age: 24
//         }
//     },
//     func: {
//         logHello () {
//             console.log('hahaha');
//         }
//     }
// });

{/* <div j='message' class='test-mes'></div><br>
        <div j='user' class='test-mes'>
            <span j='age'></span>
        </div><br>
        <div jcomp='comp':aaa='message'></div>
        <div jcomp='lang'></div>
        <div jcomp='html'></div>
        <div>
            <span jrouter='/a'>a</span>
            <span jrouter='/b'>b</span>
            <span jrouter='/b/bb'>bb</span>
        </div>
        <div jout></div> */}