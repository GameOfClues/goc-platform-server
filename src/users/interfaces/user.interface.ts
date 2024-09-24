import { Document } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

export interface User extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly phoneNumber: string;
  roles: Role[];
}