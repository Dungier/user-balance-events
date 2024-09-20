import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import UserService from '../users/services/user.service';
import { CreateHistoryEventDto } from '../shared/dto/create-history-event.dto';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('balance/:id')
  async getBalance(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post('balance/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async setBalance(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateHistoryEventDto,
  ) {
    return this.userService.createBalanceEvent(dto);
  }
}
