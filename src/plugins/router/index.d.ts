declare interface Router {
    activeRouter(ele: HTMLElement): void;
    back(): void;
    base: string;
    conf: object;
    forward(): void;
    hash: string;
    lastTrueHash: string;
    history: boolean;
    index: string;
    init(ele: HTMLElement): void;
    map: object;
    out: HTMLElement;
    params: object;
    path: string;
    route: Route;
    setBase(base: string, isTrueBase?: boolean): void;
    trueBase: boolean;
    use(opt: {
        router: object;
        index?: string;
        oninit?(): void;
        history?: boolean;
        base?: string;
    }): void;
}

declare interface Route {
    (url: string): void;
    (url: string, push: boolean): void;
    (url: string, push: boolean, call: ()=>void): void;
    (url: string, call: ()=>void): void;
}

declare module 'jetee' {
    class Jet {
        $route: Route;
        static router: Router;
    }
}

declare let router: Router;

export default router;