import Jet from 'jetee';

declare class LangStatic {
    constructor(data: object);
    type: 'Jlang';
    data: object;
    static list: Array<string>;
    static used: boolean;
    static use(list: Array<string>): void;
    static jets: Array<Jet>;
    static init(obj?: string | HTMLElement): void;
    static type: string;
}

declare module 'jetee' {
    class Jet {
        static lang: LangStatic;
    }
}

declare let lang: LangStatic;

export default lang;