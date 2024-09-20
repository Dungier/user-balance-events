import { Module } from '@nestjs/common';
import UserService from './services/user.service';
import UserController from '../controllers/user.controller';
import UsersRepository from '../shared/repository/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersEntity from '../shared/entitis/users.entity';
import HistoryEntity from '../shared/entitis/history.entity';
import HistoryRepository from '../shared/repository/history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, HistoryEntity])],
  providers: [UserService, UsersRepository, HistoryRepository],
  controllers: [UserController],
  exports: [UserService],
})
export default class UserModule {}
