import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Society, Match} from '../models';
import {Hockey4DDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SocietyRepository} from './society.repository';
import {MatchRepository} from './match.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly society: BelongsToAccessor<Society, typeof User.prototype.id>;

  public readonly matches: HasManyRepositoryFactory<Match, typeof User.prototype.id>;

  constructor(
    @inject('datasources.hockey4D') dataSource: Hockey4DDataSource, @repository.getter('SocietyRepository') protected societyRepositoryGetter: Getter<SocietyRepository>, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(User, dataSource);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.registerInclusionResolver('matches', this.matches.inclusionResolver);
    this.society = this.createBelongsToAccessorFor('society', societyRepositoryGetter,);
    this.registerInclusionResolver('society', this.society.inclusionResolver);
  }
}
