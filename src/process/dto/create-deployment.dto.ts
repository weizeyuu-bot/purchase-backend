import { IsIn, IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreateDeploymentDto {
  @IsString()
  deploymentId: string;

  @IsString()
  modelId: string;

  @IsString()
  environment: string;

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
