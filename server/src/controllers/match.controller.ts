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
import {Match} from '../models';
import {MatchRepository} from '../repositories';

export class MatchController {
  constructor(
    @repository(MatchRepository)
    public matchRepository : MatchRepository,
  ) {}

  @post('/matches', {
    responses: {
      '200': {
        description: 'Match model instance',
        content: {'application/json': {schema: getModelSchemaRef(Match)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {
            title: 'NewMatch',
            exclude: ['id'],
          }),
        },
      },
    })
    match: Omit<Match, 'id'>,
  ): Promise<Match> {
    return this.matchRepository.create(match);
  }

  @get('/matches/count', {
    responses: {
      '200': {
        description: 'Match model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.matchRepository.count(where);
  }

  @get('/matches', {
    responses: {
      '200': {
        description: 'Array of Match model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Match, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Match)) filter?: Filter<Match>,
  ): Promise<Match[]> {
    return this.matchRepository.find(filter);
  }

  @patch('/matches', {
    responses: {
      '200': {
        description: 'Match PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {partial: true}),
        },
      },
    })
    match: Match,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.matchRepository.updateAll(match, where);
  }

  @get('/matches/{id}', {
    responses: {
      '200': {
        description: 'Match model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Match, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Match)) filter?: Filter<Match>
  ): Promise<Match> {
    return this.matchRepository.findById(id, filter);
  }

  @patch('/matches/{id}', {
    responses: {
      '204': {
        description: 'Match PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {partial: true}),
        },
      },
    })
    match: Match,
  ): Promise<void> {
    await this.matchRepository.updateById(id, match);
  }

  @put('/matches/{id}', {
    responses: {
      '204': {
        description: 'Match PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() match: Match,
  ): Promise<void> {
    await this.matchRepository.replaceById(id, match);
  }

  @del('/matches/{id}', {
    responses: {
      '204': {
        description: 'Match DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.matchRepository.deleteById(id);
  }
}
