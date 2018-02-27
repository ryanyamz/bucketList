import { Bucket_List } from './bucket_list';

export class User {
  _id: string;
  name: string;
  bucket_lists: Bucket_List[];
}
