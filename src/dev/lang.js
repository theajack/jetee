import Jet from '../jetee/index';
// const hello = 'Hello world!';

export default {
    name: 'lang',
    template: /* html*/`
        <span j='message' class='test-common1'></span> 
        <span j='message2'></span><br>
        <button jon='click:Jet.lang.type="cn"'>设置中文</button>
        <button jon='click:Jet.lang.type="en"'>设置英文</button>
    `,
    data: {
        message: new Jet.lang({
            en: 'hello',
            cn: '你好',
        }),
        message2: new Jet.lang({
            en: ' world',
            cn: ',世界',
        })
    }
};