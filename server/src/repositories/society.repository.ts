import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Society, SocietyRelations, User} from '../models';
import {Hockey4DDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class SocietyRepository extends DefaultCrudRepository<
  Society,
  typeof Society.prototype.id,
  SocietyRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Society.prototype.id>;

  constructor(
    @inject('datasources.hockey4D') dataSource: Hockey4DDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Society, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
