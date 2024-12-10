export interface SectorDto {
  codigo: number;
  descrip: string;
  diaCar: number;
  codCob: number;
  estado: boolean;
}
export class SectorDto {
  constructor() {
    this.descrip = '';
  }
}
export interface PaginRequestDto {
  limit: number;
  pageSize: number;
}
export class PaginRequestDto {
  constructor() { }
}

export interface ComunasRequestDto extends PaginRequestDto {
  codigo: any;// Nombres
  descrip: string;// Descripción
  estado: boolean;// active / inactive
}
export class ComunasRequestDto {
  constructor() {
    this.codigo = '';
    this.pageSize = 1;
    this.limit = 10;
  }
}
export interface SectoresRequestDto extends PaginRequestDto {
  codigo: string;// Nombres
  descrip: string;// Descripción
}
export class SectoresRequestDto {
  constructor() {
    this.codigo = '';
    this.pageSize = 1;
    this.limit = 10;
  }
}
