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
    logoBase64: string;
    indexImg: number;
    dateDoc: string;
    dateHDoc: string;
    userName: string;
}
export class imgPdfVO {
    constructor() { }
}