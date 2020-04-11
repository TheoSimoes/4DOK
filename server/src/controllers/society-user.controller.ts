import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Society,
  User,
} from '../models';
import {SocietyRepository} from '../repositories';

export class SocietyUserController {
  constructor(
    @repository(SocietyRepository) protected societyRepository: SocietyRepository,
  ) { }

  @get('/societies/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Society has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.societyRepository.users(id).find(filter);
  }

  @post('/societies/{id}/users', {
    responses: {
      '200': {
        description: 'Society model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Society.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInSociety',
            exclude: ['id'],
            optional: ['societyId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.societyRepository.users(id).create(user);
  }

  @patch('/societies/{id}/users', {
    responses: {
      '200': {
        description: 'Society.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.societyRepository.users(id).patch(user, where);
  }

  @del('/societies/{id}/users', {
    responses: {
      '200': {
        description: 'Society.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.societyRepository.users(id).delete(where);
  }
}
