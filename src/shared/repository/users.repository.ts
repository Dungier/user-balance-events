import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import UsersEntity from '../entitis/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repo: Repository<UsersEntity>,
  ) {}

  public getById(id: number) {
    return this.repo.findOneBy({
      id: id,
    });
  }
}
