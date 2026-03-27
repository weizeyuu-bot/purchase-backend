import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateProcessModelDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	formId?: string;

	@IsOptional()
	@IsString()
	version?: string;

	@IsOptional()
	@IsIn(['DRAFT', 'ACTIVE', 'ARCHIVED'])
	status?: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
}
