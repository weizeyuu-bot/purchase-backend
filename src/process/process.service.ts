import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateDeploymentDto } from './dto/create-deployment.dto';
import { CreateFormConfigDto } from './dto/create-form-config.dto';
import { CreateProcessCategoryDto } from './dto/create-process-category.dto';
import { CreateProcessModelDto } from './dto/create-process-model.dto';
import { UpdateDeploymentDto } from './dto/update-deployment.dto';
import { UpdateFormConfigDto } from './dto/update-form-config.dto';
import { UpdateProcessCategoryDto } from './dto/update-process-category.dto';
import { UpdateProcessModelDto } from './dto/update-process-model.dto';

@Injectable()
export class ProcessService {
  constructor(private readonly prisma: PrismaService) {}

  listCategories() {
    return this.prisma.processCategory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  createCategory(dto: CreateProcessCategoryDto) {
    return this.prisma.processCategory.create({ data: dto });
  }

  updateCategory(id: string, dto: UpdateProcessCategoryDto) {
    return this.prisma.processCategory.update({ where: { id }, data: dto });
  }

  async deleteCategory(id: string) {
    await this.prisma.processCategory.delete({ where: { id } });
    return { success: true };
  }

  listForms() {
    return this.prisma.formConfig.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  createForm(dto: CreateFormConfigDto) {
    return this.prisma.formConfig.create({ data: dto });
  }

  updateForm(id: string, dto: UpdateFormConfigDto) {
    return this.prisma.formConfig.update({ where: { id }, data: dto });
  }

  async deleteForm(id: string) {
    await this.prisma.formConfig.delete({ where: { id } });
    return { success: true };
  }

  listModels() {
    return this.prisma.processModel.findMany({
      include: {
        form: { include: { category: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  createModel(dto: CreateProcessModelDto) {
    return this.prisma.processModel.create({ data: dto });
  }

  updateModel(id: string, dto: UpdateProcessModelDto) {
    return this.prisma.processModel.update({ where: { id }, data: dto });
  }

  async deleteModel(id: string) {
    await this.prisma.processModel.delete({ where: { id } });
    return { success: true };
  }

  listDeployments() {
    return this.prisma.deployment.findMany({
      include: {
        model: { include: { form: { include: { category: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  createDeployment(dto: CreateDeploymentDto) {
    return this.prisma.deployment.create({
      data: {
        deploymentId: dto.deploymentId,
        modelId: dto.modelId,
        environment: dto.environment,
        deployTime: dto.deployTime ? new Date(dto.deployTime) : undefined,
        publishedBy: dto.publishedBy,
        status: dto.status ?? 'PUBLISHED',
      },
    });
  }

  updateDeployment(id: string, dto: UpdateDeploymentDto) {
    return this.prisma.deployment.update({
      where: { id },
      data: {
        deploymentId: dto.deploymentId,
        modelId: dto.modelId,
        environment: dto.environment,
        deployTime: dto.deployTime ? new Date(dto.deployTime) : undefined,
        publishedBy: dto.publishedBy,
        status: dto.status,
      },
    });
  }

  async deleteDeployment(id: string) {
    await this.prisma.deployment.delete({ where: { id } });
    return { success: true };
  }
}
