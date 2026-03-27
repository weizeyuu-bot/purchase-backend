import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateProcessCategoryDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsIn(['ACTIVE', 'INACTIVE'])
	status?: 'ACTIVE' | 'INACTIVE';
}
