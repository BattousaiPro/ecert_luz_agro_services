*//*
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
*//*
export interface PaginRequestDto {
  limit: number;
  pageSize: number;
}
export class PaginRequestDto {
  constructor() { }
}

export interface ComunaRequestDto extends PaginRequestDto {
  codigo: any;// Nombres
  descrip: string;// Descripción
  estado: boolean;// active / inactive
}
export class ComunaRequestDto {
  constructor() {
    this.codigo = '';
    this.pageSize = 1;
    this.limit = 10;
  }
}
export interface SectorRequestDto extends PaginRequestDto {
  codigo: any;
  descrip: string;
  diaCar: number;
  codCob: number;
  estado: boolean;
}
export class SectorRequestDto {
  constructor() {
    this.pageSize = 1;
    this.limit = 10;
  }
}

export interface PermisoRequestDto extends PaginRequestDto {
  id: number;
  name: string;
  descrip: string;
  code: string;
  estado: boolean;
}
export class PermisoRequestDto {
  constructor() {
    this.name = '';
    this.pageSize = 1;
    this.limit = 10;
  }
}
