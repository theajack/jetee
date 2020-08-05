
//* ********************工具对象 开始********************
export var _JT = {
    cls: function (a) {
        return _checkSelect(document.getElementsByClassName(a));
    },
    id: function (a) {
        return _checkSelect(document.getElementById(a));
    },
    tag: function (a) {
        return _checkSelect(document.getElementsByTagName(a));
    },
    attr: function (a) {
        return _checkSelect(document.querySelectorAll('[' + a + ']'));
    },
    name: function (a) {
        return _checkSelect(document.getElementsByName(a));
    },
    select: function (a) {
        return _checkSelect(document.querySelectorAll(a));
    },
    body: function () {
        return document.body;
    },
    type: _type,
    ct: _create,
    ajax: _ajax,
    cookie: _cookie,
    storage: _storage,
    load: _load,
    clone: _clone,
    html5: function () {
        if (window.applicationCache) {
            return true;
        }
        return false;
    },
    urlParam: _getUrlParam,
    delay: function (call, time) {
        time = time || 500;
        return setTimeout(function () {
            call.call(this);
        }, time);
    },
    interval: function (bool, call, time) {
        time = time || 500;
        let t = setInterval(function () {
            if (bool.call(this)) {
                clearInterval(t);
                call.call(this);
            }
        }, time);
        return t;
    },
    clearDelay: function (t) {
        return setTimeout(t);
    },
    clearInterval: function (t) {
        return clearInterval(t);
    }
};

//* ********************工具对象 结束********************

//* ********************工具方法 开始********************
export function _clone (obj) {
    if (obj == undefined) {
        return undefined;
    }
    var type = _type(obj);
    if (type == 'htmlelement' || type == 'array') {
        return obj._JT_clone();
    } else if (type == 'json' || type == 'object') {
        var a = new Object();
        for (var attr in obj) {
            if (obj[attr] == null || obj[attr] == undefined) {
                a[attr] = obj[attr];
            } else if (_type(obj[attr]) == 'array') {
                a[attr] = obj[attr]._JT_clone();
            } else if (_type(obj[attr]) == 'json' || _type(obj[attr]) == 'object') {
                a[attr] = _clone(obj[attr]);
            } else {
                a[attr] = obj[attr];
            }
        }
        return a;
    } else if (type == 'number' || type == 'boolean' || type == 'string' || type == 'function') {
        return obj;
    } else {
        return obj;
    }
};
export function _storage (a, b, session) {
    if (typeof a === 'object' && a !== null) {
        for (var k in a) {
            _storage(k, a[k], session);
        }
        return;
    }
    var store = (session) ? sessionStorage : localStorage;
    if (b === undefined) {
        if (a === undefined) {
            var obj = {};
            Object.keys(store).forEach(function (item) {
                obj[item] = store.getItem(item);
            });
            return obj;
        } else if (a === null) {
            Object.keys(store).forEach(function (item) {
                store.removeItem(item);
            });
        } else {
            var d = store.getItem(a);
            try {
                return JSON.parse(d);
            } catch (e) {
                if (d === parseFloat(d).toString()) {
                    return parseFloat(d);
                }
                return d;
            }
        }
    } else if (b === null) {
        store.removeItem(a);
    } else {
        if (typeof b === 'object') {
            store.setItem(a, JSON.stringify(b));
        } else {
            store.setItem(a, b);
        }
        return b;
    }
}
_storage.session = function (a, b) {
    return _storage(a, b, true);
};
export function _cookie (a, b, d, e) {
    if (arguments.length == 1) {
        if (document.cookie.length > 0) {
            var f = document.cookie.indexOf(a + '=');
            if (f != -1) {
                f = f + a.length + 1;
                var g = document.cookie.indexOf(';', f);
                if (g == -1) g = document.cookie.length;
                return unescape(document.cookie.substring(f, g));
            }
        }
        return '';
    } else {
        if (b == null) {
            _cookie(a, '', -1);
        } else {
            var c = a + '=' + escape(b);
            if (d != undefined) {
                var h = new Date();
                h.setDate(h.getDate() + d);
                c += ';expires=' + h.toGMTString();
            }
            if (e != undefined) {
                if (_type(e) == 'boolean') {
                    if (e) {
                        c += (';path=/');
                    }
                } else {
                    c += (';path=' + e);
                }
            }
            document.cookie = c;
            return a + '=' + b;
        }
    }
};
export function _ajax (a) {
    var b = {
        type: a.type || 'get',
        url: a.url || '',
        async: a.async || true,
        data: a.data || null,
        dataType: a.dataType || 'text',
        contentType: a.contentType || 'application/x-www-form-urlencoded',
        beforeSend: a.beforeSend || function () { },
        success: a.success || function () { },
        error: a.error || function () { },
        header: a.header || {}
    };
    b.beforeSend();
    var c;
    if (window.XMLHttpRequest) {
        c = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        c = window.ActiveXObject('Microsoft.XMLHTTP');
    }
    var _d = _convertData(b.data);
    var _t = b.type.toLowerCase();
    // ||_t=='delete'
    if ((_t == 'get') && _d !== '') {
        b.url = b.url + '?' + _d;
    }
    c.open(b.type, b.url, b.async);
    c.responseType = b.dataType;
    if (a.contentType !== null) {
        c.setRequestHeader('Content-Type', b.contentType);
    }
    for (var k in b.header) {
        c.setRequestHeader(k, b.header[k]);
    }
    if (b.type.toLowerCase() == 'get') {
        c.send();
    } else {
        c.send(_d);
    }
    c.onreadystatechange = function () {
        if (c.readyState == 4) {
            if (c.status == 200) {
                b.success(c.response || c.responseText);
            } else {
                b.error(c.response || c.responseText);// errInfo
            }
        }
    };
    return c;


};
export function _load (name, call, ecall) {
    return _JT.ajax({
        url: name,
        async: true,
        success: function (result) {
            call(result);
        },
        error: function (err) {
            if (ecall != undefined)
                ecall(err);
            _warn('加载失败:' + name);
        },
    });
};
function _create (a) {
    return document.createElement(a);
};
function _convertData (a) {
    if (a == undefined) {
        return '';
    }
    var t = _type(a);
    if (t == 'json') {
        var b = '';
        for (var c in a) {
            if (typeof a[c] === 'object') {
                b += (c + '=' + encodeURIComponent(JSON.stringify(a[c])) + '&');
            } else {
                b += (c + '=' + encodeURIComponent(a[c]) + '&');
            }
        }
        b = b.substring(0, b.length - 1);
        return b;
    } else if (t == 'array') {
        return JSON.stringify(a);
    } else if (_type(a) == 'formdata') {
        // if(a.entries!=undefined){
        //   var b = "";
        //   for (var i of a.entries()) {
        //     b += i[0] + "=" + i[1] + "&"
        //   }
        //   b = b.substring(0, b.length - 1);
        //   return b
        // }
        return a;
    } else {
        return a;
    }
}
export function _checkFunction (a) {
    if (a == undefined) {
        return function () { };
    } else {
        var b = _JT.type(a);
        if (b == 'function') {
            return a;
        } else if (b == 'string') {
            return new Function(a);
        } else {
            return function () { };
        }
    }
}
// function _formatParams (a) {
//     var b = [];
//     for (var c in a) {
//         b.push(encodeURIComponent(c) + '=' + encodeURIComponent(a[c]));
//     }
//     return b.join('&');
// }
export function _checkSelect (b) {
    if (b == null || b == undefined) {
        return [];
    } else if (b.length == 1) {
        return b[0];
    }
    return b;
};
export function _type (obj) {
    if (arguments.length == 0) {
        _throw('This function need a argument');
    } else {
        var type = typeof obj;
        if (type == 'object') {
            if (obj === null) {
                return 'null';
            } else {
                var con = obj.constructor;
                switch (con) {
                    case Object: type = 'json'; break;
                    case Array: type = 'array'; break;
                    case HTMLCollection: type = 'htmlcollection'; break;
                    case NodeList: type = 'nodelist'; break;
                    case RegExp: type = 'regexp'; break;
                        // case FormData:type="formdata";break;
                    case Error: type = 'error'; break;
                    case Date: type = 'date'; break;
                    default: if (obj.nodeType === 1 && typeof obj.nodeName === 'string') {
                        type = 'htmlelement';
                    } else {
                        type = 'object';
                    }; break;
                }
            }
        }
        return type;
    }
};
function _getUrlParam () {
    var search = '';
    if (location.search != '') {
        search = location.search.substring(1);
    } else if (location.hash._JT_has('?')) {
        search = location.hash.substring(location.hash.indexOf('?') + 1);
    }
    if (search == '') {
        return null;
    } else {
        var d = decodeURI(search).split('&');
        var a = {};
        for (var c = 0; c < d.length; c++) {
            var b = d[c].split('=');
            a[b[0]] = b[1];
        }
        return a;
    }
};
//* ********************工具方法 结束********************

//* ********************公用方法 开始********************
export function _throw (err) {
    throw new Error(err);
}
export function _warn (info) {
    console.warn('JET warning:\r\n  ' + info);
}
export function _info (info) {
    console.info('JET info:\r\n  ' + info);
}
export function _isUd (o) {
    return (typeof o === 'undefined');
}
export function _checkArg (a, b) {
    return (a == undefined) ? b : a;
};
export function _createEmpty () {
    var a = {};
    a.__proto__ = null;
    return a;
}
export function _isInput (obj) {
    var tag = obj.tagName;
    return (tag == 'INPUT' || tag == 'TEXTAREA' || tag == 'SELECT' || (obj._JT_hasAttr('contenteditable') && obj._JT_attr('contenteditable') != 'false'));
}

//* ********************公用方法 结束********************

//* ********************提取出的方法 开始********************
export function _checkHtmle (a) {
    if (_JT.type(a) == 'string') {
        var e = _JT.ct('div')._JT_html(a);
        if (e._JT_child().length == 1) {
            return e._JT_child(0);
        } else {
            return e._JT_child()._JT_toArray();
        }
    }
    return a;
};
export function _checkCssValue (a, c, d) {
    if (d._JT_has('-=') || d._JT_has('+=')) {
        var e = _getCssNumberValue(d.substring(d.indexOf('=') + 1));
        if (d._JT_has('-=')) {
            e[0] = -e[0];
        }
        var b;
        if (d._JT_has('%')) {
            b = _getCssNumberValue(a.style[c]);
        } else {
            b = _getCssNumberValue(getComputedStyle(a)[c]);
        }
        return (e[0] + b[0]) + e[1];
    }
    return d;
};
function _getCssNumberValue (a, b) {
    if (a == '' || a == undefined) {
        a = '0%';
    }
    if (b == undefined) {
        if (a._JT_has('px')) {
            b = 'px';
        } else if (a._JT_has('%')) {
            b = '%';
        } else if (a._JT_has('em')) {
            b = 'em';
        } else {
            return [parseFloat(a), 'px'];
        }
    }
    return [parseFloat(a.substring(0, a.indexOf(b))), b];
};
export function _attachEvent (obj, event, fun) {
    if (document.addEventListener) {
        obj.addEventListener(event.substring(2), _checkFunction(fun), false);
    } else if (document.attachEvent) {
        obj.attachEvent(event, _checkFunction(fun));
    }
};
export function _argsToArray (args, index) {
    var arr = [];
    for (var i = index || 0; i < args.length; i++) {
        arr.push(args[i]);
    }
    return arr;
}
export function _initCommonStyle () {
    _JT.tag('head')._JT_append(_JT.ct('style')._JT_attr({
        'type': 'text/css',
        'style-type': 'JetTool'
    })._JT_txt('.jet-hide{display:none!important}.jet-unpass{border-color:#f20!important;border-style:solid!important;background-color:rgba(255,0,0,.1)!important;color:red!important}'));
}

export function _jsonToString (obj) {
    let isArray = (obj instanceof Array);
    let str = isArray ? '[' : '{';
    if (isArray) {
        for (let i = 0; i < obj.length; i++) {
            str += _writeSingleString(obj[i]);
        }
    } else {
        for (let k in obj) {
            str += _writeSingleString(obj[k], k);
        }
    }
    if (str.length > 1) {
        str = str.substring(0, str.length - 1);
    }
    return str + (isArray ? ']' : '}');
}

function _writeSingleString (v, k) {
    let prefix = typeof k === 'undefined' ? '' : `"${k}":`;
    let str = '';
    if (v === null) {
        str = `${prefix}null`;
    } else if (typeof v === 'string') {
        v = v.replace(/\n/g, '').replace(/"/g, '\\"');
        str = `${prefix}"${v}"`;
    } else if (typeof v === 'number' || typeof v === 'boolean') {
        str = `${prefix}${v.toString()}`;
    } else if (typeof v === 'undefined') {
        str = `${prefix}undefined`;
    } else if (typeof v === 'function') {
        let funcs = window.Jet.__base__._funcs;
        let id = window.Jet.__base__._funcs_id++;
        funcs[id] = v;
        str = `${prefix}window.Jet.__base__._funcs[${id}]`;

    // let fstr = v.toString();
    // if (fstr.indexOf('(') !== 0 && fstr.indexOf('function') !== 0) {
    //     prefix = '';
    // }
    // str += `${prefix}${fstr}`;
    } else if (typeof v === 'object') {
        if (v.type === 'Jlang') {
            str = `${prefix}new Jet.lang(${_jsonToString(v.data)})`;
        } else {
            str = `${prefix}${_jsonToString(v)}`;
        }
    }
    return str + ',';
}