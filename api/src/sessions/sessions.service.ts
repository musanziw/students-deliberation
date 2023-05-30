import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { DeleteResult, UpdateResult } from 'typeorm/browser';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async create(createPeriodDto: CreateSessionDto) {
    try {
      await this.sessionRepository.save(createPeriodDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Session créée avec succès.',
      };
    } catch {
      throw new HttpException(
        'Impossible de créer la session',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    const sessions: Session[] = await this.sessionRepository.find({
      order: { id: 'ASC' },
    });
    return {
      status: HttpStatus.OK,
      sessions,
    };
  }

  async findOne(id: number) {
    try {
      const session: Session = await this.sessionRepository.findOneOrFail({
        where: { id },
      });
      return {
        status: HttpStatus.OK,
        session,
      };
    } catch {
      throw new HttpException(
        'Impossible de récupérer la session',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updatePeriodDto: UpdateSessionDto) {
    const updateResult: UpdateResult = await this.sessionRepository.update(
      { id },
      updatePeriodDto,
    );
    if (!updateResult.affected)
      throw new HttpException(
        'Impossible de mettre à jour la session',
        HttpStatus.NOT_FOUND,
      );
    return {
      status: HttpStatus.OK,
      message: 'Session modifiée avec succès',
    };
  }

  async remove(id: number) {
    const deleteResult: DeleteResult = await this.sessionRepository.delete({
      id,
    });
    if (!deleteResult.affected)
      throw new HttpException(
        'Impossible de supprimer la session',
        HttpStatus.NOT_FOUND,
      );
    return {
      status: HttpStatus.OK,
      message: 'Session supprimée avec succès',
    };
  }
}
