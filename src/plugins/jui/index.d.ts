declare type _type = 'success' | 'warn' | 'error' | 'info';

declare interface confirmStatic {
    (text?: string, onconfirm?: Function, type?: _type): void;
    (opt: {
        title?: string;
        text?: string;
        type?: _type;
        onconfirm?(): void;
        oncancel?(): void;
        onclose?(): void;
        html?: string;
        width?: number;
    }): void;
    isOpen(): boolean;
    clear(): void;
    close(): void;
    error(txt?: string, call?: Function): void;
    success(txt?: string, call?: Function): void;
    warn(txt?: string, call?: Function): void;
    info(txt?: string, call?: Function): void;
}

declare interface dialogStatic {
    isOpen(): boolean;
    clear(): void;
    removeAll(): void;
}

declare interface msgStatic {
    (text?: string, type?: _type, time?: number): void;
    (opt: {
        text?: string;
        html?: string;
        type?: _type;
        hover?: boolean;
        time?: number;
        autoClose?: boolean;
        call?(): void;
    }): void;
    isOpen(): boolean;
    clear(): void;
    close(): void;
    error(txt?: string, time?: number): void;
    success(txt?: string, time?: number): void;
    warn(txt?: string, time?: number): void;
    info(txt?: string, time?: number): void;
}

declare interface JuiStatic {
    confirm: confirmStatic;
    dialog: dialogStatic;
    msg: msgStatic;
    init(): void;
    mounted(call: ()=>void): void;
}

declare module 'jetee' {
    class Jet {
        $jui(ele?: string | HTMLElement): object;
        static JUI: JuiStatic;
    }
}

declare let jui: JuiStatic;

export default jui;