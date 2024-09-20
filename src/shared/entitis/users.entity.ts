import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import HistoryEntity from './history.entity';

@Entity('users')
export default class UsersEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'numeric' })
  public balance: number;

  @OneToMany(() => HistoryEntity, (history) => history.user)
  public history: HistoryEntity[];
}
