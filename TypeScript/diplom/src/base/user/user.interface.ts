import { ID } from 'src/common/interfaces/id.interface';
import { User } from './user.schema';

export interface SearchUserParams {
  limit?: number | undefined;
  offset?: number | undefined;
  email?: string | undefined;
  name?: string | undefined;
  contactPhone?: string | undefined;
}
export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ID): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: SearchUserParams): Promise<User[]>;
}
