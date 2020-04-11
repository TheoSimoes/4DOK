import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Society} from '../models';
import {SocietyRepository} from '../repositories';

export class SocietyController {
  constructor(
    @repository(SocietyRepository)
    public societyRepository : SocietyRepository,
  ) {}

  @post('/societies', {
    responses: {
      '200': {
        description: 'Society model instance',
        content: {'application/json': {schema: getModelSchemaRef(Society)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Society, {
            title: 'NewSociety',
            exclude: ['id'],
          }),
        },
      },
    })
    society: Omit<Society, 'id'>,
  ): Promise<Society> {
    return this.societyRepository.create(society);
  }

  @get('/societies/count', {
    responses: {
      '200': {
        description: 'Society model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Society)) where?: Where<Society>,
  ): Promise<Count> {
    return this.societyRepository.count(where);
  }

  @get('/societies', {
    responses: {
      '200': {
        description: 'Array of Society model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Society, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Society)) filter?: Filter<Society>,
  ): Promise<Society[]> {
    return this.societyRepository.find(filter);
  }

  @patch('/societies', {
    responses: {
      '200': {
        description: 'Society PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Society, {partial: true}),
        },
      },
    })
    society: Society,
    @param.query.object('where', getWhereSchemaFor(Society)) where?: Where<Society>,
  ): Promise<Count> {
    return this.societyRepository.updateAll(society, where);
  }

  @get('/societies/{id}', {
    responses: {
      '200': {
        description: 'Society model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Society, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Society)) filter?: Filter<Society>
  ): Promise<Society> {
    return this.societyRepository.findById(id, filter);
  }

  @patch('/societies/{id}', {
    responses: {
      '204': {
        description: 'Society PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Society, {partial: true}),
        },
      },
    })
    society: Society,
  ): Promise<void> {
    await this.societyRepository.updateById(id, society);
  }

  @put('/societies/{id}', {
    responses: {
      '204': {
        description: 'Society PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() society: Society,
  ): Promise<void> {
    await this.societyRepository.replaceById(id, society);
  }

  @del('/societies/{id}', {
    responses: {
      '204': {
        description: 'Society DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.societyRepository.deleteById(id);
  }
}
