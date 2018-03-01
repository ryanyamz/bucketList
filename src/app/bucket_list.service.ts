import { Injectable } from '@angular/core';
import { Bucket_List } from './bucket_list';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class BucketListService {
  private base = '/api/bucket_list';

  constructor(
    private http: Http
  ) {}




  createList(bucket_list: Bucket_List): Observable<Bucket_List> {
    console.log('createList in bucket list service', bucket_list);
    return this.http.post(this.base, bucket_list)
      .map(response => response.json());
  }

  getLists(): Observable<Bucket_List[]> {
    return this.http.get(this.base)
    .map(response => response.json());
  }

  getUserList(id: string): Observable<Bucket_List[]> {
    return this.http.get(`${this.base}/${id}`)
      .map(response => response.json());
  }


}
