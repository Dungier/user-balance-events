import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BalanceActionTypeEnum } from '../enums/balance-action-type.enum';
import UsersEntity from './users.entity';

@Entity('history')
export default class HistoryEntity {
  @PrimaryColumn()
  public user_id: number;

  @PrimaryColumn({ type: 'timestamp' })
  public ts: Date;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  public user: UsersEntity;

  @Column({ type: 'varchar' })
  public action: BalanceActionTypeEnum;

  @Column({ type: 'numeric' })
  public amount: number;
}
