import { Request, Response } from "express";
import { Like } from "typeorm";
import * as pdf from 'pdf-creator-node';
import * as fs from 'fs';
import { AppDataSource } from "../data-source";
import { Kapmae } from "../entity/Kapmae";
import { GenericResponse, StatusCode } from "../vo/GenericResponse";
import { imgPdfVO, imgVO, pathImgsVO } from "../vo/pathImgVO";
import * as path from "path";

export class KapmaeController {

    //private static baeePath: string = 'C:/repoBattousaiPro/ecert/001_Docs/entregas_ejemplos/Socios';
    //private static baeePath: string = <string>(process.env.BASE_PATH_DOCUMENT || 'C:/repoBattousaiPro/ecert/001_Docs/entregas_ejemplos/Socios');
    //private static baeePath: string = <string>(process.env.BASE_PATH_DOCUMENT || 'C:/repoBattousaiPro/ecert/ecert_luz_agro_services/') + 'src/templatePdf/Socios';
    //private static baeePath: string = <string>(process.env.BASE_PATH_DOCUMENT || './') + 'src/templatePdf/Socios';
    private static baeePath: string = <string>(process.env.BASE_PATH_DOCUMENT || 'basePath');
    //private static baeePath: string = './src/templatePdf/Socios';
    private static repository = AppDataSource.getRepository(Kapmae);

    constructor() { }

    /*static getAll = async (request: Request, response: Response) => {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Kapmae[] = [];
        try {
            dataResponse = await this.repository.find({
                select: ['rut_cop', 'ape_pat', 'ape_mat', 'nombres', 'cod_cop', 'sec_cop']
            });
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': ' + error;
            resp.data = null;
            console.log(JSON.stringify(resp));
            return response.status(200).send(resp);
        }
        if (dataResponse.length === 0) {
            resp.code = '-2';
            resp.message = StatusCode.ERROR + ', Sin Registros';
            resp.data = null;
            return response.status(200).send(resp);
        }
        //resp.data = this.convertToVOs(dataResponse);
        resp.data = dataResponse;
        return response.send(resp);
    }*/

    static new = async (request: Request, response: Response) => {
        // console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Kapmae = new Kapmae();
        try {
            const {
                rut_cop, ape_pat, ape_mat, nombres, cod_cop, cod_lli, cod_ant, cod_nvo, cod_ori,
                sec_cop, ano_inc, mto_inc, fec_inc, ano_tra, kap_tra, fec_tra, acc_tra, acc_ret,
                acc_apo, fec_act, est_tra, est_bon, dir_pos, nro_te1, nro_te2, nro_te3, nro_te4,
                com_pos, obs_cap, nro_sol, fec_sol, fec_apr, fec_can, est_sol, sec_cte, area,
                sec_imp, est_reg, acc_con, aju_acc
            } = request.body;
            try {
                let toNew: Kapmae = await this.repository.findOneBy({
                    rut_cop, cod_cop
                });
                if (toNew) {
                    resp.code = '-4';
                    resp.data = null;
                    resp.message = 'Socio ya existe';
                    return response.status(200).send(resp);
                }
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-3';
                resp.message = StatusCode.ERROR + ': ' + error;
                resp.data = null;
                console.log(JSON.stringify(resp));
                return response.status(200).send(resp);
            }

            try {
                const newElement = Object.assign(new Kapmae(), {
                    rut_cop, ape_pat, ape_mat, nombres, cod_cop, cod_lli, cod_ant, cod_nvo, cod_ori,
                    sec_cop, ano_inc, mto_inc, fec_inc, ano_tra, kap_tra, fec_tra, acc_tra, acc_ret,
                    acc_apo, fec_act, est_tra, est_bon, dir_pos, nro_te1, nro_te2, nro_te3, nro_te4,
                    com_pos, obs_cap, nro_sol, fec_sol, fec_apr, fec_can, est_sol, sec_cte, area,
                    sec_imp, est_reg, acc_con, aju_acc
                });
                //console.log(JSON.stringify(newElement));
                dataResponse = await this.repository.save(newElement);
                resp.data = { rut_cop: dataResponse.rut_cop, cod_cop: dataResponse.cod_cop };
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-2';
                resp.message = StatusCode.ERROR;
                resp.data = null;
            }
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return response.send(resp);
    }

    static edit = async (request: Request, response: Response) => {
        // console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Kapmae = new Kapmae();
        let elementToEdit: Kapmae = new Kapmae();
        try {
            const { rut_cop, cod_cop } = request.body;
            elementToEdit = await this.repository.findOneBy({ rut_cop, cod_cop });
            if (!elementToEdit) {
                resp.code = '-3';
                resp.data = new Kapmae();
                // console.log('Socio no existe');
                return response.status(200).send(resp);
            }
            try {
                //console.log(JSON.stringify(elementToEdit));
                elementToEdit = this.getObjectEdit(request, elementToEdit);
                dataResponse = await this.repository.save(elementToEdit);
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-1';
                resp.message = StatusCode.ERROR;
                resp.data = null;
            }
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-2';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return response.send(resp);
    }

    static delete = async (request: Request, response: Response) => {
        // console.log('method delete');
        let resp: GenericResponse = new GenericResponse();
        let RegistroToRemove: Kapmae = new Kapmae();
        try {
            const { rut_cop, cod_cop } = request.body;
            RegistroToRemove = await this.repository.findOneBy({ rut_cop, cod_cop });
            if (!RegistroToRemove) {
                resp.code = '1';
                resp.data = new Kapmae();
                resp.message = StatusCode.ERROR + ': Socio no existe';
                return response.status(200).send(resp);
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar al Socio';
            resp.data = null;
            return response.status(200).send(resp);
        }

        try {
            const removeVal: Kapmae = await this.repository.remove(RegistroToRemove);
            resp.data = null;
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return response.send(resp);
    }

    static findByFilter = async (request: Request, response: Response) => {
        // console.log('method findByFilter');
        let resp: GenericResponse = new GenericResponse();
        const { rut_cop, nombres, ape_pat, ape_mat, cod_cop, sec_cop, com_pos, limit, pageSize } = request.body;
        try {
            const [results, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        rut_cop: rut_cop ? Like('%' + rut_cop + '%') : null,
                        nombres: nombres ? Like(nombres + '%') : null,
                        ape_pat: ape_pat ? Like(ape_pat + '%') : null,
                        ape_mat: ape_mat ? Like(ape_mat + '%') : null,
                        cod_cop: cod_cop ? cod_cop : null,
                        sec_cop: {
                            descrip: sec_cop ? Like('%' + sec_cop + '%') : null,
                        },
                        com_pos: {
                            descrip: com_pos ? Like('%' + com_pos + '%') : null,
                        },
                    },
                    order: { rut_cop: "ASC" },
                    take: limit,
                    skip: (pageSize - 1) * limit,
                    relations: {
                        sec_cop: true,
                        com_pos: true,
                    },
                }
            );
            resp.data = {
                totalReg,
                nextPage: pageSize + 1,
                previousPage: pageSize,
                results,
            };
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return response.send(resp);
    }

    static findImgByCodCop = async (request: Request, response: Response) => {
        // console.log('method findImgByCodCop');
        let resp: GenericResponse = new GenericResponse();
        let pathImg: pathImgsVO = new pathImgsVO();
        let imgVo: imgVO = new imgVO();
        try {
            const code: number = parseInt(request.params.codCop);
            console.log('code: [' + code + ']');
            const codeStr = '/' + String(code) + '_';
            let filesResultServices: string[] = [];
            let filesResult: string[] = [];
            console.log('this.baeePath: ' + this.baeePath);
            await this.readAllFiles(this.baeePath, filesResultServices);
            // console.log('filesResultServices: [' + filesResultServices.length + '] Imagenes');
            for (let index = 0; index < filesResultServices.length; index++) {
                // console.log('method filesResultServices[index]: [' + filesResultServices[index] + ']');
                const codeNameFile = filesResultServices[index].replace(this.baeePath, '');
                // console.log('codeStr: [' + codeStr + ']');
                // console.log('codeNameFile: [' + codeNameFile + ']');
                if (codeNameFile.includes(codeStr)) {
                    filesResult.push(filesResultServices[index]);
                }
            }
            // console.log('filesResult: [' + filesResult.length + '] Imagenes');
            // console.log('filesResult JSON: [' + JSON.stringify(filesResult) + '] Imagenes');
            if (filesResult.length > 0) {
                pathImg.imgs = [];
                for (let index = 0; index < filesResult.length; index++) {
                    imgVo = new imgVO();
                    imgVo.base64 = await this.base64_encode(filesResult[index]);
                    filesResult[index] = filesResult[index].replace(this.baeePath, '');
                    imgVo.pathImg = filesResult[index];
                    pathImg.imgs.push(imgVo);
                }
            }
            pathImg.basepath = this.baeePath;
            resp.data = pathImg;
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return response.send(resp);
    }

    static getPdfDocumentImg = async (request: Request, response: Response) => {
        // console.log('method getPdfDocumentImg');
        let resp: GenericResponse = new GenericResponse();
        try {
            const { imgs, rutCop, codCop } = request.body;
            // console.log('imgs.rutCop: ' + imgs.rutCop);
            // console.log('imgs.codCop: ' + imgs.codCop);
            let respElementSocio: Kapmae[] = await this.repository.find({
                where: { rut_cop: rutCop, cod_cop: codCop },
                relations: {
                    sec_cop: true,
                },
            });
            if (!respElementSocio) {
                resp.code = '-3';
                resp.data = new Kapmae();
                // console.log('Socio no existe');
                return response.status(200).send(resp);
            }
            let elementSocio: Kapmae = respElementSocio[0];

            const template = await this.readFile('./templatePdf/html/imgSocios.html');
            let base64: string = await this.base64_encodeInternal('./templatePdf/img/Luzagro.jpg');

            // console.log('**********************************************');
            let listImgPdf: imgPdfVO[] = [];
            for (let index = 0; index < imgs.length; index++) {
                const element: imgPdfVO = new imgPdfVO();
                let dat = new Date();
                let itemIndex = '00000000' + (index + 1);
                //element.basePath = this.baeePath + imgs[index];
                element.basePath = await this.base64_encode(this.baeePath + imgs[index]);
                element.logoBase64 = base64;
                element.indexImg = itemIndex.substring((itemIndex.length - 9), itemIndex.length);
                element.dateDoc = dat.getDate() + '/' + (dat.getMonth() + 1) + '/' + dat.getFullYear();
                element.dateHDoc = dat.getHours() + ':' + dat.getMinutes() + ':' + dat.getSeconds();
                element.userName = 'UserTestPdf';

                element.rutCop = elementSocio.rut_cop;
                element.codCop = elementSocio.cod_cop;
                element.nombreCompleto = elementSocio.nombres + ' ' + elementSocio.ape_pat + ' ' + elementSocio.ape_mat;
                element.direccionSector = elementSocio.sec_cop.descrip;
                element.cuotaParticipacion = 1;
                element.fec_inc = elementSocio.fec_inc.getDate() + '/' + (elementSocio.fec_inc.getMonth() + 1) + '/' + elementSocio.fec_inc.getFullYear(); elementSocio.fec_inc;// 06/10/2003
                listImgPdf.push(element);
            }
            // console.log('JSON.stringify(listImgPdf): ' + JSON.stringify(listImgPdf));
            const options = {
                format: "A4",
                orientation: "portrait",
                border: "1mm",
            };
            const document = {
                html: template,
                data: {
                    body: {
                        imgs: listImgPdf
                    }
                },
                path: './pdfs/myNewPdf.pdf'
            };
            // console.log('method getPdfDocumentImg - 4');
            pdf
                .create(document, options)
                .then(async (res) => {
                    // console.log(res);
                    var bitmap: Buffer = await fs.readFileSync(res.filename);
                    resp.data = bitmap.toString('base64');
                    return response.send(resp);
                })
                .catch((error) => {
                    // console.log(JSON.stringify(error));
                    resp.code = '-1';
                    resp.message = StatusCode.ERROR;
                    resp.data = null;
                    return response.send(resp);
                });
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-2';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return response.send(resp);
        }
    }

    static async readFile(inputPath: string): Promise<string> {
        // console.log('method readFile');
        let urlPath = path.join(__dirname.replace('\\controller', ''), inputPath);
        // console.log('urlPath: ' + urlPath);
        return await fs.readFileSync(urlPath, 'utf-8');
    }

    static async base64_encodeInternal(inputPath: string): Promise<string> {
        // console.log('method readFile');
        let urlPath = path.join(__dirname.replace('\\controller', ''), inputPath);
        // console.log('urlPath: ' + urlPath);
        var bitmap: Buffer = await fs.readFileSync(urlPath);
        return bitmap.toString('base64');
    }

    static async base64_encode(file: string): Promise<string> {
        var bitmap: Buffer = await fs.readFileSync(file);
        return bitmap.toString('base64');
    }

    static async readAllFiles(path: string, arrayOfFiles = []) {
        const files: string[] = fs.readdirSync(path);
        files.forEach(file => {
            const stat = fs.statSync(`${path}/${file}`);
            if (stat.isDirectory()) {
                this.readAllFiles(`${path}/${file}`, arrayOfFiles);
            } else {
                arrayOfFiles.push(`${path}/${file}`);
            }
        })
        return arrayOfFiles;
    }

    private static getObjectEdit(request: Request, elementToEdit: Kapmae): Kapmae {
        const {
            rut_cop, ape_pat, ape_mat, nombres, cod_cop, cod_lli, cod_ant, cod_nvo, cod_ori,
            sec_cop, ano_inc, mto_inc, fec_inc, ano_tra, kap_tra, fec_tra, acc_tra, acc_ret,
            acc_apo, fec_act, est_tra, est_bon, dir_pos, nro_te1, nro_te2, nro_te3, nro_te4,
            com_pos, obs_cap, nro_sol, fec_sol, fec_apr, fec_can, est_sol, sec_cte, area,
            sec_imp, est_reg, acc_con, aju_acc
        } = request.body;
        // TODO: cambiar los If's a un metodo que retorne solo el objecto a editar.
        if (typeof rut_cop !== 'undefined' && rut_cop !== null && rut_cop !== '') {
            // console.log('rut_cop: [' + rut_cop + ']');
            elementToEdit.rut_cop = rut_cop;
        }
        if (typeof ape_pat !== 'undefined' && ape_pat !== null && ape_pat !== '') {
            // console.log('ape_pat: [' + ape_pat + ']');
            elementToEdit.ape_pat = ape_pat;
        }
        if (typeof ape_mat !== 'undefined' && ape_mat !== null && ape_mat !== '') {
            // console.log('ape_mat: [' + ape_mat + ']');
            elementToEdit.ape_mat = ape_mat;
        }
        if (typeof nombres !== 'undefined' && nombres !== null && nombres !== '') {
            // console.log('nombres: [' + nombres + ']');
            elementToEdit.nombres = nombres;
        }
        if (typeof cod_cop !== 'undefined' && cod_cop !== null && cod_cop !== '') {
            // console.log('cod_cop: [' + cod_cop + ']');
            elementToEdit.cod_cop = cod_cop;
        }
        if (typeof cod_lli !== 'undefined' && cod_lli !== null && cod_lli !== '') {
            // console.log('cod_lli: [' + cod_lli + ']');
            elementToEdit.cod_lli = cod_lli;
        }
        if (typeof cod_ant !== 'undefined' && cod_ant !== null && cod_ant !== '') {
            // console.log('cod_ant: [' + cod_ant + ']');
            elementToEdit.cod_ant = cod_ant;
        }
        if (typeof cod_nvo !== 'undefined' && cod_nvo !== null && cod_nvo !== '') {
            // console.log('cod_nvo: [' + cod_nvo + ']');
            elementToEdit.cod_nvo = cod_nvo;
        }
        if (typeof cod_ori !== 'undefined' && cod_ori !== null && cod_ori !== '') {
            // console.log('cod_ori: [' + cod_ori + ']');
            elementToEdit.cod_ori = cod_ori;
        }
        if (typeof sec_cop !== 'undefined' && sec_cop !== null && sec_cop !== '') {
            // console.log('sec_cop: [' + sec_cop + ']');
            elementToEdit.sec_cop = sec_cop;
        }
        if (typeof ano_inc !== 'undefined' && ano_inc !== null && ano_inc !== '') {
            // console.log('ano_inc: [' + ano_inc + ']');
            elementToEdit.ano_inc = ano_inc;
        }
        if (typeof mto_inc !== 'undefined' && mto_inc !== null && mto_inc !== '') {
            // console.log('mto_inc: [' + mto_inc + ']');
            elementToEdit.mto_inc = mto_inc;
        }
        if (typeof fec_inc !== 'undefined' && fec_inc !== null && fec_inc !== '') {
            // console.log('fec_inc: [' + fec_inc + ']');
            elementToEdit.fec_inc = fec_inc;
        }
        if (typeof ano_tra !== 'undefined' && ano_tra !== null && ano_tra !== '') {
            // console.log('ano_tra: [' + ano_tra + ']');
            elementToEdit.ano_tra = ano_tra;
        }
        if (typeof kap_tra !== 'undefined' && kap_tra !== null && kap_tra !== '') {
            // console.log('kap_tra: [' + kap_tra + ']');
            elementToEdit.kap_tra = kap_tra;
        }
        if (typeof fec_tra !== 'undefined' && fec_tra !== null && fec_tra !== '') {
            // console.log('fec_tra: [' + fec_tra + ']');
            elementToEdit.fec_tra = fec_tra;
        }
        if (typeof acc_tra !== 'undefined' && acc_tra !== null && acc_tra !== '') {
            // console.log('acc_tra: [' + acc_tra + ']');
            elementToEdit.acc_tra = acc_tra;
        }
        if (typeof acc_ret !== 'undefined' && acc_ret !== null && acc_ret !== '') {
            // console.log('acc_ret: [' + acc_ret + ']');
            elementToEdit.acc_ret = acc_ret;
        }
        if (typeof acc_apo !== 'undefined' && acc_apo !== null && acc_apo !== '') {
            // console.log('acc_apo: [' + acc_apo + ']');
            elementToEdit.acc_apo = acc_apo;
        }
        if (typeof fec_act !== 'undefined' && fec_act !== null && fec_act !== '') {
            // console.log('fec_act: [' + fec_act + ']');
            elementToEdit.fec_act = fec_act;
        }
        if (typeof est_tra !== 'undefined' && est_tra !== null && est_tra !== '') {
            // console.log('est_tra: [' + est_tra + ']');
            elementToEdit.est_tra = est_tra;
        }
        if (typeof est_bon !== 'undefined' && est_bon !== null && est_bon !== '') {
            // console.log('est_bon: [' + est_bon + ']');
            elementToEdit.est_bon = est_bon;
        }
        if (typeof dir_pos !== 'undefined' && dir_pos !== null && dir_pos !== '') {
            // console.log('dir_pos: [' + dir_pos + ']');
            elementToEdit.dir_pos = dir_pos;
        }
        if (typeof nro_te1 !== 'undefined' && nro_te1 !== null && nro_te1 !== '') {
            // console.log('nro_te1: [' + nro_te1 + ']');
            elementToEdit.nro_te1 = nro_te1;
        }
        if (typeof nro_te2 !== 'undefined' && nro_te2 !== null && nro_te2 !== '') {
            // console.log('nro_te2: [' + nro_te2 + ']');
            elementToEdit.nro_te2 = nro_te2;
        }
        if (typeof nro_te3 !== 'undefined' && nro_te3 !== null && nro_te3 !== '') {
            // console.log('nro_te3: [' + nro_te3 + ']');
            elementToEdit.nro_te3 = nro_te3;
        }
        if (typeof nro_te4 !== 'undefined' && nro_te4 !== null && nro_te4 !== '') {
            // console.log('nro_te4: [' + nro_te4 + ']');
            elementToEdit.nro_te4 = nro_te4;
        }
        if (typeof com_pos !== 'undefined' && com_pos !== null && com_pos !== '') {
            // console.log('com_pos: [' + com_pos + ']');
            elementToEdit.com_pos = com_pos;
        }
        if (typeof obs_cap !== 'undefined' && obs_cap !== null && obs_cap !== '') {
            // console.log('obs_cap: [' + obs_cap + ']');
            elementToEdit.obs_cap = obs_cap;
        }
        if (typeof nro_sol !== 'undefined' && nro_sol !== null && nro_sol !== '') {
            // console.log('nro_sol: [' + nro_sol + ']');
            elementToEdit.nro_sol = nro_sol;
        }
        if (typeof fec_sol !== 'undefined' && fec_sol !== null && fec_sol !== '') {
            // console.log('fec_sol: [' + fec_sol + ']');
            elementToEdit.fec_sol = fec_sol;
        }
        if (typeof fec_apr !== 'undefined' && fec_apr !== null && fec_apr !== '') {
            // console.log('fec_apr: [' + fec_apr + ']');
            elementToEdit.fec_apr = fec_apr;
        }
        if (typeof fec_can !== 'undefined' && fec_can !== null && fec_can !== '') {
            // console.log('fec_can: [' + fec_can + ']');
            elementToEdit.fec_can = fec_can;
        }
        if (typeof est_sol !== 'undefined' && est_sol !== null && est_sol !== '') {
            // console.log('est_sol: [' + est_sol + ']');
            elementToEdit.est_sol = est_sol;
        }
        if (typeof sec_cte !== 'undefined' && sec_cte !== null && sec_cte !== '') {
            // console.log('sec_cte: [' + sec_cte + ']');
            elementToEdit.sec_cte = sec_cte;
        }
        if (typeof area !== 'undefined' && area !== null && area !== '') {
            // console.log('area: [' + area + ']');
            elementToEdit.area = area;
        }
        if (typeof sec_imp !== 'undefined' && sec_imp !== null && sec_imp !== '') {
            // console.log('sec_imp: [' + sec_imp + ']');
            elementToEdit.sec_imp = sec_imp;
        }
        if (typeof est_reg !== 'undefined' && est_reg !== null && est_reg !== '') {
            // console.log('est_reg: [' + est_reg + ']');
            elementToEdit.est_reg = est_reg;
        }
        if (typeof acc_con !== 'undefined' && acc_con !== null && acc_con !== '') {
            // console.log('acc_con: [' + acc_con + ']');
            elementToEdit.acc_con = acc_con;
        }
        if (typeof aju_acc !== 'undefined' && aju_acc !== null && aju_acc !== '') {
            // console.log('aju_acc: [' + aju_acc + ']');
            elementToEdit.aju_acc = aju_acc;
        }
        return elementToEdit;
    }

}
