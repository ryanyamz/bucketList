import { User } from './user';

export class Bucket_List {
  _id: string;
  title: string;
  description: string;
  user: User;
  tagged_user: User;
  checked: boolean;
}
