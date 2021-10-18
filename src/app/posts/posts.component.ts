import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private service: PostService){
    
  }

  createPost(input: HTMLInputElement){
    let post:any = {title: input.value};
    input.value = "";

    this.service.createPost(input)
    .subscribe(
      response => {
        post['id'] = (response as BlogPost).id ;
        this.posts.splice(0,0,response);
    }, 
      error =>{
        alert('Something bad happened!')
    })
  }

  updatePost(post: any){
    this.service.updatePost(post)
    .subscribe(
      response =>{
        console.log(response);
    }, 
      error =>{
      alert('Something bad happened!')
    })
  }

  ngOnInit(){
    this.service.getPosts()
    .subscribe((
      response)=>{
        this.posts = response;
    }, 
     error =>{
      alert('Something bad happened!')
    });
  }

}
