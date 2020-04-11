import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Society,
} from '../models';
import {UserRepository} from '../repositories';

export class UserSocietyController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/society', {
    responses: {
      '200': {
        description: 'Society belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Society)},
          },
        },
      },
    },
  })
  async getSociety(
    @param.path.number('id') id: typeof User.prototype.id,
  ): Promise<Society> {
    return this.userRepository.society(id);
  }
}
