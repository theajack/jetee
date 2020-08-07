interface Array {
    $push(item: any): void;
    $pushArray(arr: Array<any>): void;
    $prep(item: any): void;
    $prepArray(arr: Array<any>): void;
    $insert(item: any, index: number): void;
    $insertArray(arr: Array<any>, index: number): void;
    $remove(...args: Array<any>): void;
    $removeByIndex(index: number, num?: number): void;
    $clear(): void;
    $replace(arr: Array<any>): void;
}
