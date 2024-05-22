//import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator';
import { PaginRequest } from '../paginate/pagin.request';
//import { PaginRequest } from 'src/api/paginate/pagin.request';


export class FilterExpenseDto extends PaginRequest {
  
  // @ApiProperty()
  @IsOptional()
  rut_cop: string;// Rut Socio	
  
  // @ApiProperty()
  @IsOptional()
  nombres: string;// Nombres

  // @ApiProperty()
  @IsOptional()
  ape_pat: string;// Apellido Paterno

  // @ApiProperty()
  @IsOptional()
  ape_mat: string;// Apellido Materno

  // @ApiProperty()
  @IsOptional()
  cod_cop: number;// Código Luzagro

  // @ApiProperty()
  @IsOptional()
  sec_cop: number;// Sector
}