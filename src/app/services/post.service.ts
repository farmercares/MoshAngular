import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';

import { map, retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface BlogPost {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  createPost(input: HTMLInputElement){
    let post:any = {title: input.value};
    input.value = "";

    return this.http.post(this.url,post)
  }

  updatePost(post: any){
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
  }

  getPosts() {
    return this.http.get<any[]>(this.url);
  }

  deletePost(id: number){
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError( (error: Response) => {
        if (error.status === 404)
          return Observable.throw(new NotFoundError());
          return Observable.throw(new AppError(error));
        }));
  }

}
