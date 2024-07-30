export class pathImgsVO {
    basepath: string;
    imgs: imgVO[];
}

export class imgVO {
    pathImg: string;
    base64: string;
}

export interface imgPdfVO {
    basePath: string;
}
export class imgPdfVO {
    constructor() { }
}