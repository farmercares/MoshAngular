import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'posts-component',
  templateUrl: './posts-component.component.html',
  styleUrls: ['./posts-component.component.css']
})
export class PostsComponentComponent {

  posts: any[] = [];

  constructor(private http: HttpClient){
    this.http
    .get<any[]>('http://jsonplaceholder.typicode.com/posts')
    .subscribe((response)=>{
      this.posts = response;
    });
  }

}
