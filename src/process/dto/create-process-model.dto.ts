import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateProcessModelDto {
  @IsString()
  name: string;

  @IsString()
  formId: string;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsIn(['DRAFT', 'ACTIVE', 'ARCHIVED'])
  status?: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
}
