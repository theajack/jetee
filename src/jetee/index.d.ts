import './extend';

declare interface jetTool {
    ajax: Function;
    attr: Function;
    back: Function;
    body: Function;
    checkArg: Function;
    clearDelay: Function;
    clearInterval: Function;
    clone: Function;
    cls: Function;
    cookie: Function;
    copy: Function;
    ct: Function;
    delay: Function;
    each: Function;
    even: Function;
    forward: Function;
    height: Function;
    html5: Function;
    id: Function;
    initTip: Function;
    interval: Function;
    isMobile: Function;
    jump: Function;
    load: Function;
    name: Function;
    open: Function;
    random: Function;
    ready: Function;
    reload: Function;
    s: Function;
    scroll: Function;
    scrollTo: Function;
    select: Function;
    sign: Function;
    storage: Function;
    tag: Function;
    toFunc: Function;
    toString: Function;
    type: Function;
    urlParam: Function;
    width: Function;
}
export class JetDom {
    constructor(opt: {
        ele: HTMLElement;
        jet: Jet;
    })
    name: string;
    html: string;
    text: string;
    value: string;
    class: string;
    outerHtml: string;
    attr: any;
    css: any;
}

declare interface JetTools {
    name: string;
    _calls: object;
    _components: object;
    _data: object;
    _ele: HTMLElement;
    _jetTools: Array<object>;
    _jets: Array<object>;
}

declare interface JetOptions {
    ele?: string | HTMLElement;
    data?: object;
    func?: object;
    components?: object;
    template?: string;
    style?: string;
    par?: string;
    name?: string;
}

export default class Jet {
    constructor(opt: JetOptions);
    $child: object;
    $dom: object;
    _tools: JetTools;
    $: jetTool;
    $DOM(ele: HTMLElement): JetDom;
    $getData(): any;
    $init(ele?: HTMLElement): any;
    $makeChange(path?: string): void;
    $nextTick(cb: void): void;
    $regist(path: string, call: ()=>void): void;

    $storage: Function;
    $ajax: Function;
    $cookie: Function;

    static create(html: string): void;
    static create(ele: string | HTMLElement, html: string): void;
    static $: jetTool;
    static _unnamedJets: object;
    static comp: object;
    static root: Jet;
    static version: string;
}