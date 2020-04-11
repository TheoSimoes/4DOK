import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Society extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  adress1: string;

  @property({
    type: 'string',
  })
  adress2?: string;

  @property({
    type: 'string',
    required: true,
  })
  postalCode: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
  })
  logo?: string;

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Society>) {
    super(data);
  }
}

export interface SocietyRelations {
  // describe navigational properties here
}

export type SocietyWithRelations = Society & SocietyRelations;
