import { Role } from 'src/common/interfaces/role.interface';

export interface RegisterUser {
  email: string;
  password: string;
  name: string;
  contactPhone: string;
}
export interface RegisterAdmin extends RegisterUser {
  role: Role;
}
