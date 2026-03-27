import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateFormConfigDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	categoryId?: string;

	@IsOptional()
	@IsString()
	schemaJson?: string;

	@IsOptional()
	@IsIn(['ACTIVE', 'INACTIVE'])
	status?: 'ACTIVE' | 'INACTIVE';
}
