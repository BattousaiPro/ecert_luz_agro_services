export class pathImgsVO {
    basepath: string;
    imgs: imgVO[];
}

export class imgVO {
    pathImg: string;
    base64: string;
}

export interface certificadoPdfVO {
    logoBase64: string;
    indexImg: string;
    dateDoc: string;
    dateHDoc: string;
    userName: string;

    rutCop: string;
    codCop: number;
    nombreCompleto: string;
    direccionSector: string;
    cuotaParticipacion: string;
    fec_inc: string;

    lastPage: boolean;
}
export class certificadoPdfVO {
    constructor() { }
}

export interface imgPdfVO {
    basePath: string;
    logoBase64: string;
    indexImg: string;
    dateDoc: string;
    dateHDoc: string;
    userName: string;

    rutCop: string;
    codCop: number;
    nombreCompleto: string;
    direccionSector: string;
    cuotaParticipacion: string;
    fec_inc: string;

    lastPage: boolean;
}
export class imgPdfVO {
    constructor() { }
}