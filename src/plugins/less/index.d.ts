declare class LessStatic {
    toCss(less: string): string;
}

declare module 'jetee' {
    class Jet {
        static less: LessStatic;
    }
}