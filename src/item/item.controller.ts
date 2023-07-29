import { JwtOrServiceGuard } from '@/auth/guard/jwt-or-service.guard';
import { ServiceGuard } from '@/auth/guard/service.guard';
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
import { BuyItemDto } from './dto/buy-item.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsDto } from './dto/get-items.dto';
import { ItemResponseDto } from './dto/response.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';

@Controller('barang')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiResponse({
    status: 201,
    type: ItemResponseDto,
  })
  @Post()
  @UseGuards(JwtOrServiceGuard)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @ApiResponse({
    status: 200,
    type: ItemResponseDto,
    isArray: true,
  })
  @Get()
  @UseGuards(JwtOrServiceGuard)
  findAll(@Query() query: GetItemsDto) {
    return this.itemService.findAll(query);
  }

  @Get('count')
  @UseGuards(JwtOrServiceGuard)
  count(@Query() query: GetItemsDto) {
    return this.itemService.count(query);
  }

  @ApiResponse({
    status: 200,
    type: ItemResponseDto,
  })
  @Get(':id')
  @UseGuards(JwtOrServiceGuard)
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    type: ItemResponseDto,
  })
  @Put(':id')
  @UseGuards(JwtOrServiceGuard)
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  @ApiResponse({
    status: 200,
    type: ItemResponseDto,
  })
  @Delete(':id')
  @UseGuards(JwtOrServiceGuard)
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }

  @ApiResponse({
    status: 200,
    type: ItemResponseDto,
  })
  @Post(':id/buy')
  @UseGuards(ServiceGuard)
  buy(@Param('id') id: string, @Body() buyItemDto: BuyItemDto) {
    return this.itemService.buy(id, buyItemDto.total);
  }
}
