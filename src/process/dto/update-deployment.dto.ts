import { IsIn, IsISO8601, IsOptional, IsString } from 'class-validator';

export class UpdateDeploymentDto {
	@IsOptional()
	@IsString()
	deploymentId?: string;

	@IsOptional()
	@IsString()
	modelId?: string;

	@IsOptional()
	@IsString()
	environment?: string;

	@IsOptional()
	@IsISO8601()
	deployTime?: string;

	@IsOptional()
	@IsString()
	publishedBy?: string;

	@IsOptional()
	@IsIn(['PUBLISHED', 'CANCELLED'])
	status?: 'PUBLISHED' | 'CANCELLED';
}
