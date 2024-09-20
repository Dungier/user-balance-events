import { BalanceActionTypeEnum } from '../enums/balance-action-type.enum';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';

export class CreateHistoryEventDto {
  user_id: number;

  @IsEnum(BalanceActionTypeEnum)
  action: BalanceActionTypeEnum;

  @IsNumber()
  @IsPositive()
  amount: number;
}
