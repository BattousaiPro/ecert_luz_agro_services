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

    rutCop: string;
    codCop: number;
    nombreCompleto: string;
    direccionSector: string;
    cuotaParticipacion: number;
    fec_inc: string;
}
export class imgPdfVO {
    constructor() { }
}