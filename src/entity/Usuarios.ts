import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'USUARIOS'})
export class Usuarios {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'cta_usr'})
    ctaUsr: string;

    @Column({name: 'cta_pass'})
    ctaPass: string;

    @Column({name: 'cta_email'})
    ctaEmail: string;

    @Column({name: 'tip_usr'})
    tipUsr: number;

    @Column({name: 'est_imp'})
    estImp: number;

    @Column({name: 'est_cop'})
    estCop: number;

    @Column({name: 'est_car'})
    estCar: number;

    @Column({name: 'chk_rut'})
    chkRut: number;

    @Column({name: 'est_ced'})
    estCed: number;

}
