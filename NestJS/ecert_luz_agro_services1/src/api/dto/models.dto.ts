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
