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
import { BuyItemDto } from './dto/buy-item.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsDto } from './dto/get-items.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';

@Controller('barang')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseGuards(JwtOrServiceGuard)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  @UseGuards(JwtOrServiceGuard)
  findAll(@Query() query: GetItemsDto) {
    return this.itemService.findAll(query);
  }

  @Get('count')
  @UseGuards(JwtOrServiceGuard)
  count() {
    return this.itemService.count();
  }

  @Get(':id')
  @UseGuards(JwtOrServiceGuard)
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtOrServiceGuard)
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  @UseGuards(JwtOrServiceGuard)
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }

  @Post(':id/buy')
  @UseGuards(ServiceGuard)
  buy(@Param('id') id: string, @Body() buyItemDto: BuyItemDto) {
    return this.itemService.buy(id, buyItemDto.total);
  }
}
