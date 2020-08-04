
import {
    _JT, _checkCssValue, _checkSelect, _checkArg, _checkHtmle, _attachEvent,
    _checkFunction, _clone, _argsToArray
} from './util';

//* ********************扩展原型方法 开始********************
var EleProto = HTMLElement.prototype;
var CollProto = HTMLCollection.prototype;
var NodeProto = NodeList.prototype;
export var ArrProto = Array.prototype;
var StrProto = String.prototype;
EleProto._JT_css = function (d, a) {
    if (a == undefined) {
        if (_JT.type(d) == 'json') {
            for (var b in d) {
                if (d[b]._JT_has('!important')) {
                    this.style.setProperty(b, _checkCssValue(this, b, d[b].substring(0, d[b].indexOf('!important'))), 'important');
                } else {
                    this.style.setProperty(b, _checkCssValue(this, b, d[b]));
                }
            }
            return this;
        } else {
            return getComputedStyle(this)[d];
        }
    } else {
        if (typeof a === 'number') {
            a = a + 'px';
        }
        if (a._JT_has('!important')) {
            this.style.setProperty(d, _checkCssValue(this, d, a.substring(0, a.indexOf('!important'))), 'important');
        } else {
            this.style.setProperty(d, _checkCssValue(this, d, a));
        }
        return this;
    }
};
EleProto._JT_attr = function (c, b) {
    if (b == undefined) {
        if (_JT.type(c) == 'json') {
            for (var a in c) {
                if (a.trim() !== '')
                    this.setAttribute(a, c[a]);
            }
            return this;
        } else {
            return this.getAttribute(c);
        }
    } else {
        if (c.trim() !== '')
            this.setAttribute(c, b);
        return this;
    }
};
CollProto._JT_attr = NodeProto._JT_attr = function (d, c) {
    if (c == undefined && _JT.type(d) != 'json') {
        var a = [];
        this._JT_each(function (b) {
            a._JT_append(b._JT_attr(d));
        });
        return a;
    } else {
        this._JT_each(function (a) {
            a._JT_attr(d, c);
        });
        return this;
    }
};
EleProto._JT_hasAttr = function (a) {
    return this.hasAttribute(a);
};
EleProto._JT_removeAttr = function (b) {
    var c = b.split(' ');
    if (c.length > 1) {
        var d = this;
        c._JT_each(function (a) {
            d.removeAttribute(a);
        });
    } else {
        this.removeAttribute(b);
    }
    return this;
};
CollProto._JT_removeAttr = NodeProto._JT_removeAttr = function (b) {
    this._JT_each(function (a) {
        a._JT_removeAttr(b);
    });
    return this;
};
EleProto._JT_findTag = function (a) {
    return _checkSelect(this.getElementsByTagName(a));
};
EleProto._JT_findAttr = function (a) {
    return _checkSelect(this.querySelectorAll('[' + a + ']'));
};
EleProto._JT_findClass = function (a) {
    return _checkSelect(this.getElementsByClassName(a));
};
EleProto._JT_select = function (a) {
    return _checkSelect(this.querySelectorAll(a));
};
EleProto._JT_addClass = function (a) {
    if (a._JT_has(' ')) {
        var b = a.split(' ');
        var c = this;
        b._JT_each(function (i) {
            c._JT_addClass(i);
        });
    } else if (a.trim() !== '') {
        if (_JT.html5()) {
            this.classList.add(a);
        } else {
            if (!this._JT_hasClass(a)) {
                this.className += ' ' + a;
            }
        }
    }
    return this;
};
CollProto._JT_addClass = NodeProto._JT_addClass = function (a) {
    this._JT_each(function (b) {
        b._JT_addClass(a);
    });
    return this;
};
EleProto._JT_removeClass = function (a) {
    if (a == undefined) {
        this.className = '';
    } else if (a.trim() !== '') {
        if (a._JT_has(' ')) {
            var c = a.split(' ');
            var d = this;
            c._JT_each(function (i) {
                d._JT_removeClass(i);
            });
        } else {
            if (_JT.html5()) {
                this.classList.remove(a);
            } else {
                if (this._JT_hasClass(a)) {
                    var b = new RegExp('(\\s|^)' + a + '(\\s|$)');
                    this.className = this.className.replace(b, ' ').trim();
                }
            }
        }
    }
    return this;
};
CollProto._JT_removeClass = NodeProto._JT_removeClass = function (a) {
    this._JT_each(function (b) {
        b._JT_removeClass(a);
    });
    return this;
};
EleProto._JT_val = function (a) {
    if (a == undefined && arguments.length == 0) {
        return this.value;
    } else {
        if (this.tagName == 'INPUT' || this.tagName == 'TEXTAREA' || this.tagName == 'SELECT') {
            this.value = _checkArg(a, '');
        }
        return this;
    }
};
CollProto._JT_val = NodeProto._JT_val = function (v) {
    if (v == undefined) {
        var a = [];
        this._JT_each(function (b) {
            a._JT_append(b._JT_val());
        });
        return a;
    } else {
        this._JT_each(function (b) {
            b._JT_val(v);
        });
        return this;
    }
};
EleProto._JT_txt = function (a) {
    if (a == undefined && arguments.length == 0) {
        return this.innerText;
    } else {
        this.innerText = _checkArg(a, '');
        return this;
    }
};
CollProto._JT_txt = NodeProto._JT_txt = function (v) {
    if (v == undefined && arguments.length == 0) {
        var a = [];
        this._JT_each(function (b) {
            a._JT_append(b._JT_txt());
        });
        return a;
    } else {
        this._JT_each(function (b) {
            b._JT_txt(v);
        });
        return this;
    }
};
EleProto._JT_html = function (a) {
    if (a == undefined) {
        return this.innerHTML;
    } else {
        this.innerHTML = a;
        return this;
    }
};
CollProto._JT_html = NodeProto._JT_html = function (v) {
    if (v == undefined) {
        var a = [];
        this._JT_each(function (b) {
            a._JT_append(b._JT_html());
        });
        return a;
    } else {
        this._JT_each(function (b) {
            b._JT_html(v);
        });
        return this;
    }
};
EleProto._JT_allHtml = function (a) {
    if (a == undefined) {
        return this.outerHTML;
    } else {
        this.outerHTML = a;
        return this;
    }
};
CollProto._JT_allHtml = NodeProto._JT_allHtml = function (v) {
    var a = [];
    this._JT_each(function (b) {
        a._JT_append(b._JT_allHtml(v));
    });
    return a;
};
EleProto._JT_hasClass = function (a) {
    if (a.trim() === '') {
        return true;
    }
    if (_JT.html5()) {
        return this.classList.contains(a);
    }
    return new RegExp('(\\s|^)' + a + '(\\s|$)').test(this.className);
};
EleProto._JT_next = function (i) {
    if (i != undefined) {
        return this._JT_parent()._JT_child(this._JT_index() + i);
    } else {
        return this._JT_parent()._JT_child(this._JT_index() + 1);
    }
};
EleProto._JT_prev = function (i) {
    if (i != undefined) {
        return this._JT_parent()._JT_child(this._JT_index() - i);
    } else {
        return this._JT_parent()._JT_child(this._JT_index() - 1);
    }
};
EleProto._JT_child = function (i) {
    if (i == undefined) {
        return this.children;
    } else {
        return this.children[i];
    }
};
EleProto._JT_clone = function () {
    return this.cloneNode()._JT_html(this._JT_html());
};
EleProto._JT_parent = function (i) {
    if (i == undefined) {
        return this.parentElement;
    } else {
        var p = this;
        for (var j = 0; j < i; j++) {
            p = p.parentElement;
        }
        return p;
    }
};
EleProto._JT_prepend = function (a) {
    var t = _JT.type(a);
    if (t == 'array' || t == 'htmlcollection' || t == 'nodelist') {
        var b = this;
        a._JT_each(function (item) {
            b.insertBefore(_checkHtmle(item), b.children[0]);
        });
    } else if (t == 'string') {
        this.insertBefore(_checkHtmle(a), this.children[0]);
    } else {
        this.insertBefore(_checkHtmle(a), this.children[0]);
    }
    return this;
};
CollProto._JT_prepend = NodeProto._JT_prepend = function (a) {
    this._JT_each(function (c) {
        c._JT_prepend(a);
    });
    return this;
};
EleProto._JT_append = function (b, a) {
    if (a == undefined) {
        var type = _JT.type(b);
        if (type == 'array' || type == 'htmlcollection' || type == 'nodelist') {
            for (var i = 0; i < b.length; i++) {
                this._JT_append(b[i]);
            }
        } else if (type == 'string') {
            this._JT_append(_checkHtmle(b));
        } else {
            this.appendChild(_checkHtmle(b));
        }
    } else {
        this.insertBefore(_checkHtmle(b), this.children[a]);
    }
    return this;
};
CollProto._JT_append = NodeProto._JT_append = function (b, a) {
    this._JT_each(function (c) {
        c._JT_append(b, a);
    });
    return this;
};
EleProto._JT_toArray = function () {
    return [this];
};
CollProto._JT_toArray = NodeProto._JT_toArray = function (bool) {
    if (bool != false) {
        var a = [];
        for (var i = 0; i < this.length; i++) {
            a.push(this[i]);
        }
        return a;
    } else {
        return this;
    }
};
EleProto._JT_index = function () {
    var a = this._JT_parent()._JT_child();
    for (var i = 0; i < a.length; i++) {
        if (a[i] == this) {
            return i;
        }
    }
    return -1;
};
EleProto._JT_on = function (a, b, d) {
    if (_JT.type(a) == 'string') {
        return this._JT_event('on' + a, b, d);
    } else {
        for (var c in a) {
            a['on' + c] = a[c];
            delete a[c];
        }
        return this._JT_event(a, b);
    }
};
CollProto._JT_on = NodeProto._JT_on = function (a, c, d) {
    this._JT_each(function (b) {
        b._JT_on(_JT.clone(a), c, d);
    });
    return this;
};
EleProto._JT_clk = function (b, d) {
    return this._JT_event('onclick', b, d);
};
CollProto._JT_clk = NodeProto._JT_clk = function (a, c) {
    this._JT_each(function (b) {
        b._JT_clk(a, c);
    });
    return this;
};
EleProto._JT_event = function (a, b, d) {
    if (_JT.type(a) == 'string') {
        if (d === true) {
            _attachEvent(this, a, b);
        } else {
            this[a] = _checkFunction(b);
        }
    } else {
        for (var c in a) {
            if (a[c] != undefined) {
                if (b === true) {
                    _attachEvent(this, c, a[c]);
                } else {
                    this[c] = _checkFunction(a[c]);
                }
            }
        }
    }
    return this;
};
CollProto._JT_event = NodeProto._JT_event = function (a, c, d) {
    this._JT_each(function (b) {
        b._JT_event(a, c, d);
    });
    return this;
};
EleProto._JT_empty = function () {
    return this._JT_html('');
};
CollProto._JT_empty = NodeProto._JT_empty = function () {
    this._JT_each(function (a) {
        a._JT_empty();
    });
    return this;
};
EleProto._JT_remove = function () {
    if (this.parentNode === null) return;
    this.parentNode.removeChild(this);
};
CollProto._JT_remove = NodeProto._JT_remove = function (a) {
    if (a == undefined) {
        for (var i = 0; i < this.length;) {
            this[i]._JT_remove();
        }
    } else {
        if (_JT.type(a) == 'number') {
            for (var i = 0; i < this.length; i++) {
                if (i == a) {
                    this[i]._JT_remove();
                    return this;
                }
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == a) {
                    this[i]._JT_remove();
                    return this;
                }
            }
        }
    }
};
EleProto._JT_each = function (b, d) {
    b(this, 0, d);
    return this;
};
CollProto._JT_each = NodeProto._JT_each = function (b, d) {
    var arr = this._JT_toArray();// removeClass 情况下
    for (var a = 0; a < arr.length; a++) {
        b(arr[a], a, d);
    }
    return this;
};
ArrProto._JT_each = function (b, d) {
    for (var a = 0; a < this.length; a++) {
        b(this[a], a, d);
    }
    return this;
};
ArrProto._JT_clone = function () {
    var a = new Array();
    this.forEach(function (item) {
        a.push(_clone(item));
    });
    return a;
};
ArrProto._JT_empty = function () {
    this.length = 0;
    return this;
};
EleProto._JT_last = function () {
    return this._JT_child()._JT_last();
};
EleProto._JT_first = function () {
    return this._JT_child()._JT_first();
};
CollProto._JT_last = NodeProto._JT_last = ArrProto._JT_last = function () {
    return this[this.length - 1];
};
CollProto._JT_first = NodeProto._JT_first = ArrProto._JT_first = function () {
    return this[0];
};
EleProto._JT_exist = function (call) {
    if (call != undefined) {
        _checkFunction(call)(this);
    }
    return true;
};
CollProto._JT_exist = NodeProto._JT_exist = ArrProto._JT_exist = function (call, callf) {
    if (this.length > 0) {
        if (this.length == 1) {
            _checkFunction(call)(this[0]);
        } else {
            _checkFunction(call)(this);
        }
        return true;
    }
    _checkFunction(callf)();
    return false;
};
EleProto._JT_content = function (a) {
    if (this.tagName == 'INPUT' || this.tagName == 'TEXTAREA' || this.tagName == 'SELECT') {
        if (a == undefined && arguments.length == 0) {
            return this.value;
        } else {
            try {
                this.value = _checkArg(a, '');
            } catch (e) {

            }
        }
    } else {
        if (a == undefined && arguments.length == 0) {
            return this.innerText;
        } else {
            this.innerText = _checkArg(a, '');
        }
    }
    return this;
};
ArrProto._JT_remove = function (b, order) {
    var index = this.indexOf(b);
    if (order == false) {
        this[index] = this[this.length--];
    } else {
        this._JT_removeByIndex(index);
    }
    return this;
};
ArrProto._JT_removeByIndex = function (b, n) {
    this.splice(b, n || 1);
    return this;
};
ArrProto._JT_insert = function (b, i) {
    this.splice(i, 0, b);
    return this;
};
ArrProto._JT_insertArray = function (arr, i) {
    // var _arr=arr._JT_clone();//深拷贝
    var _arr = arr.slice(0);// 浅拷贝
    _arr.splice(0, 0, i, 0);
    ArrProto.splice.apply(this, _arr);
    return this;
};
ArrProto._JT_append = function () {
    ArrProto.push.apply(this, arguments);
    return this;
};
ArrProto._JT_prepend = function (b) {
    if (arguments.length == 1) {
        return this._JT_insert(b, 0);
    } else {
        return this._JT_insertArray(_argsToArray(arguments), 0);
    }
};
StrProto._JT_has = function (s) {
    if (_JT.type(s) == 'string') {
        if (this.includes == undefined) {
            return (this.indexOf(s) != -1);
        } else {
            return this.includes(s);
        }
    } else {
        if (this.match(s) == null) {
            return false;
        } else {
            return true;
        }
    }
};
StrProto._JT_replaceAll = function (a, b) {
    if (_JT.type(a) == 'array') {
        var s = this;
        a.forEach(function (item) {
            s = s._JT_replaceAll(item[0], item[1]);
        });
        return s;
    }
    if (_JT.type(b) == 'array') {
        if (_JT.type(a) == 'string') {
            var s = this.split(a);
            var d = s[0];
            s._JT_each(function (a, i) {
                if (i > 0) {
                    d += (b[i - 1] + a);
                }
            });
            return d;
        } else {
            var e = '';
            var f = this;
            var g = this.match(a);
            if (g != null) {
                g._JT_each(function (a, i) {
                    // var c = f.split(a);
                    e += (f.substring(0, f.indexOf(a)) + b[i]);
                    f = f.substring(f.indexOf(a) + a.length);
                });
                e += f;
                return e;
            }
            return this;
        }
    } else {
        if (_JT.type(a) == 'string') {
            return this.replace(new RegExp(a, 'g'), b);
        } else {
            return this.replace(a, b);
        }
    }
};
//* ********************扩展原型方法 结束********************

