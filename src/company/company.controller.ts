import { JwtGuard } from '@/auth/guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetCompaniesDto } from './dto/get-companies.dto';
import { CompanyResponseDto } from './dto/response.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@UseGuards(JwtGuard)
@Controller('perusahaan')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiResponse({
    status: 201,
    type: CompanyResponseDto,
  })
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @ApiResponse({
    status: 200,
    type: CompanyResponseDto,
    isArray: true,
  })
  @Get()
  findAll(@Query() query: GetCompaniesDto) {
    return this.companyService.findAll(query.q);
  }

  @ApiResponse({
    status: 200,
    type: CompanyResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    type: CompanyResponseDto,
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @ApiResponse({
    status: 200,
    type: CompanyResponseDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
