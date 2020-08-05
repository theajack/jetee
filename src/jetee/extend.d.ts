interface Array {
    $push(item: any): void;
    $pushArray(arr: Array<any>): void;
    $prep(item: any): void;
    $prepArray(arr: Array<any>): void;
}

