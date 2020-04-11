import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Society} from './society.model';
import {Match} from './match.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nickname: string;

  @property({
    type: 'string',
    required: true,
  })
  mail: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'number',
    default: 0,
  })
  elo: number;

  @property({
    type: 'string',
  })
  pictureProfil?: string;

  @belongsTo(() => Society)
  societyId: number;

  @hasMany(() => Match)
  matches: Match[];

  @property({
    type: 'number',
  })
  matchId?: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
