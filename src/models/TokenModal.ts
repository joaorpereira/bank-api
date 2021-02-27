import { USER_ROLE } from '../models/UserModel'

export type AuthToken = {
  id: string
  is_admin: USER_ROLE
}
