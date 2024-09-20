import { Injectable } from '@nestjs/common';
import UsersRepository from '../../shared/repository/users.repository';
import HistoryRepository from '../../shared/repository/history.repository';
import { CreateHistoryEventDto } from '../../shared/dto/create-history-event.dto';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly historyRepository: HistoryRepository,
  ) {}

  public getUserById(id: number) {
    return this.userRepository.getById(id);
  }

  public async createBalanceEvent(dto: CreateHistoryEventDto) {
    await this.historyRepository.createEvent(dto);

    return this.userRepository.getById(dto.user_id);
  }
}
