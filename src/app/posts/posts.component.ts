import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface BlogPost {
  id: number;
  title: string;
}

@Component({
  selector: 'posts-component',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {

  posts: any[] = [];
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient){
    
  }

  createPost(input: HTMLInputElement){
    let post:any = {title: input.value};
    input.value = "";

    this.http
    .post(this.url,post)
    .subscribe(response => {
      post['id'] = (response as BlogPost).id ;
      this.posts.splice(0,0,response);
    })
  }

  updatePost(post: any){
    this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
    .subscribe(response =>{
      console.log(response);
    })
  }

  ngOnInit(){
    this.http
    .get<any[]>(this.url)
    .subscribe((response)=>{
      this.posts = response;
    });
  }

}
