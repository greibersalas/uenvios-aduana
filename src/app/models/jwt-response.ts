import { PermissionsModel } from './profile/permissions.model';

export interface JwtResponseI {
      id?: number;
      email?: string;
      username?: string;
      token: string;
      roles: any;
      permissions: PermissionsModel[];
      state: number;
  }

export interface ModelResponse{
  code: number;
  message: string;
}
