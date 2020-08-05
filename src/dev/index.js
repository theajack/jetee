
import Jet from '../jetee/index';

import '../plugins/jui';
import '../plugins/lang';
import '../plugins/valid';
import '../plugins/router';
import '../plugins/less';
import '../plugins/render-time';
import html from './html.html';


import comp from './comp';
import btn from './btn';
import lang from './lang';
import valid from './valid';
import select from './select';
import router from './router';
console.log(html);
Jet.router.use(router);

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


new Jet({
    ele: '#app',
    style: /* css*/`
        .test-mes{
            color: ((themeColor));
            ((bg));
        }
    `,
    components: {
        comp, btn, lang, valid, select, html
    },
    template: /* html*/`
        <div j='message' class='test-mes'></div><br>
        <div j='user' class='test-mes'>
            <span j='age'></span>
        </div><br>
        <div jcomp='comp'></div>
        <div jcomp='lang'></div>
        <div jcomp='html'></div>
        <div>
            <span jrouter='/a'>a</span>
            <span jrouter='/b'>b</span>
            <span jrouter='/b/bb'>bb</span>
        </div>
        <div jout></div>
    `,
    data: {
        message: 'Hello Jet',
        user: {
            name: 'theajack',
            age: 24
        }
    },
    func: {
    }
});