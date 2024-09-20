import { BadRequestException, Injectable } from '@nestjs/common';
import UsersRepository from '../../shared/repository/users.repository';
import HistoryRepository from '../../shared/repository/history.repository';
import { CreateHistoryEventDto } from '../../shared/dto/create-history-event.dto';
import { BalanceActionTypeEnum } from '../../shared/enums/balance-action-type.enum';
import UsersEntity from '../../shared/entitis/users.entity';

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
    const isValid = await this.isValidOperation(dto);

    if (!isValid) {
      throw new BadRequestException('Balance cannot < 0');
    }
    await this.historyRepository.createEvent(dto);

    return this.userRepository.getById(dto.user_id);
  }

  public async isValidOperation(dto: CreateHistoryEventDto) {
    const user = await this.userRepository.getById(dto.user_id);

    if (dto.action === BalanceActionTypeEnum.Debit) {
      return user.balance - dto.amount >= 0;
    }

    return true;
  }
}
