import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GenericResponse, StatusCode } from "../dto/GenericResponse.dto";
import { RolPermisoRequestDto } from "../dto/models.dto";
import { RolPermiso } from "../entity/rol.permiso.entity";

@Injectable()
export class RolPermisoService {

    constructor(@InjectRepository(RolPermiso) private repository: Repository<RolPermiso>) { }

    async rolPermiso(req: RolPermisoRequestDto, idRol: number): Promise<GenericResponse> {
        // console.log('method rolPermiso');
        let resp: GenericResponse = new GenericResponse();
        let registroToRemove: RolPermiso[] = [];
        let isDelete: boolean = false;
        const {
            listPermisosId
        } = req;
        // console.log('listPermisosId: ' + JSON.stringify(listPermisosId));
        // console.log('Paso Uno');
        try {
            //const idRol = parseInt(request.params.idrol);
            // console.log('idRol: ' + idRol);
            registroToRemove = await this.repository.find({ where: { rolId: idRol } });
            // console.log('registroToRemove: ' + JSON.stringify(registroToRemove));
            if (registroToRemove !== null
                && typeof registroToRemove !== 'undefined'
                && registroToRemove.length > 0) {
                isDelete = true;
                console.log('Tiene Permisos asignados para eliminar');
            }
        } catch (error) {
            resp.code = '-3';
            resp.message = StatusCode.ERROR + ': Al obtener los permisos de los roles';
            resp.data = null;
            return resp;
        }
        // console.log('Paso Dos');
        if (isDelete) {
            try {
                const removeVal: any = await this.repository.remove(registroToRemove);
                console.log('Permisos existentes Eliminados');
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-2';
                resp.message = StatusCode.ERROR;
                resp.data = null;
                return resp;
            }
        }

         // console.log('Paso Tres');
         try {
            //const idRol = parseInt(request.params.idrol);
            let saveRolPermiso: RolPermiso[] = [];
            for (let index = 0; index < listPermisosId.length; index++) {
                let item: RolPermiso = new RolPermiso();
                item.rolId = idRol;
                item.permisoId = listPermisosId[index];
                saveRolPermiso.push(item);
            }
            // console.log(JSON.stringify(saveRolPermiso));
            const removeVal: any = await this.repository.save(saveRolPermiso);
            console.log('Nuevo set de permisos asignados correctamente');
            resp.data = null;
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

}