
import Jet from '../jetee/index';

import '../plugins/jui/jui';
import '../plugins/lang';
import '../plugins/valid';

import comp from './comp';
import btn from './btn';
import lang from './lang';
import valid from './valid';

// const hello = 'Hello world!';

new Jet({
    ele: '#app',
    name: 'online',
    components: {
        comp, btn, lang, valid
    },
    template: /* html*/`
        <div j='message'></div><br>
        <i class="j-icon icon-resize"></i>
        <div jload='comp'></div>
        <div jload='comp'></div>
        <div jload='btn'></div>
        <div jload='lang'></div>
        <div jload='lang'></div>
        <div jload='valid'></div>
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


// let main = () => {
//     console.log(hello);
//     // alert(hello);
// };

// main();