
import lang from './lang';
import valid from './valid';
import select from './select';
import '../plugins/lang';

var base = '', trueBase = false;
if ((window.location.host === 'www.theajack.com' || window.location.host === 'theajack.gitee.io') && window.location.pathname === '/jet/') {
    base = '/jet', trueBase = true;
}

export default {
    history: false,
    trueBase: trueBase,
    base: base,
    index: '/',
    oninit: function () {
        // Jet.import('queryApi');
    },
    router: {
        '/a': {
            name: 'xx',
            component: lang,
        },
        '/b': {
            name: 'xx',
            component: valid,
            children: {
                '/bb': {
                    name: 'select',
                    component: select,
                }
            }
        }
    }
};