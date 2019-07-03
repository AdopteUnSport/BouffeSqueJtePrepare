import { Request } from 'express';
import { IUser } from './user.model';

interface RequestWithUser extends Request {
  user: IUser;
}
 
export default RequestWithUser;