declare type Ele = string | HTMLElement;

declare interface ValidStatic {
    addRegExp(name: string, reg: string | RegExp, text?: string): void;
    addValid(ele: Ele, type: string): void;
    addValidText(json: object): void;
    addValidText(name: string, text: string): void;
    clearValid(ele: Ele): void;
    init(ele: Ele): void;
    onOneFail(ele: HTMLElement, err: string): void;
    onOnePass(ele: HTMLElement): void;
    resetValid(ele: Ele): void;
    useAlert: boolean;
    validInput(ele: Ele, tip?: boolean): void;
    validate(ele: string): void;
    validate(opt: {
        ele: Ele,
        fail?(call: (opt: {
            obj: HTMLElement;
            error: string;
        })=>void): void;
        pass?(): void;
    }): void;
    language: string;
    showInPlaceHolder: boolean;
    useDefaultStyle: boolean;
    useJUI: boolean;
    useOnInput: boolean;
}

declare module 'jetee' {
    class Jet {
        static valid: ValidStatic;
    }
}

declare let valid: ValidStatic;

export default valid;