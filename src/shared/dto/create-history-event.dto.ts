import { BalanceActionTypeEnum } from '../enums/balance-action-type.enum';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateHistoryEventDto {
  user_id: number;

  @IsEnum(BalanceActionTypeEnum)
  action: BalanceActionTypeEnum;

  @IsNumber()
  amount: number;
}
