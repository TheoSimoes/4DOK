import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Match, MatchRelations, User} from '../models';
import {Hockey4DDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class MatchRepository extends DefaultCrudRepository<
  Match,
  typeof Match.prototype.id,
  MatchRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Match.prototype.id>;

  constructor(
    @inject('datasources.hockey4D') dataSource: Hockey4DDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Match, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);

  }
}
