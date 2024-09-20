import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import HistoryEntity from '../entitis/history.entity';
import { Repository } from 'typeorm';
import { CreateHistoryEventDto } from '../dto/create-history-event.dto';

@Injectable()
export default class HistoryRepository {
  constructor(
    @InjectRepository(HistoryEntity)
    private readonly repo: Repository<HistoryEntity>,
  ) {}

  public async createEvent(
    eventData: CreateHistoryEventDto,
  ): Promise<HistoryEntity> {
    const historyEvent = this.repo.create({
      action: eventData.action,
      amount: eventData.amount,
      user_id: eventData.user_id,
    });

    return this.repo.save(historyEvent);
  }
}
