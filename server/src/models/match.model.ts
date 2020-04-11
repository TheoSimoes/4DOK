import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Match extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  scorePlayer1: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  scorePlayer2: number;

  @hasMany(() => User)
  users: User[];

  @property({
    type: 'number',
  })
  userId?: number;

  constructor(data?: Partial<Match>) {
    super(data);
  }
}

export interface MatchRelations {
  // describe navigational properties here
}

export type MatchWithRelations = Match & MatchRelations;
