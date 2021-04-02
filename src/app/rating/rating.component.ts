

import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Post} from './post.model';
import {PostsService} from './posts.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit{
   @Input() bookName: string;
   @Input() bookId: string;
   @Input() bookAuthor: string;
   @Input() bookCover;

   @Output() close = new EventEmitter<void>();
   allowSubmit = false;
   commentCreationStatus = 'No comment was created!';
   commentAdded = false;
   loadedPosts: Post[] = [];


  constructor(public postsService: PostsService) {
    this.allowSubmit = true;
   }



  ngOnInit(): void {
    // this.fetchPosts();
  }


  onCreateComment() {
     this.commentAdded = true;
     this.commentCreationStatus = 'Comment was created for ' + this.bookName;
  }


  onClearPosts() {
    // Send Http request
  }

   onClose() {
     this.close.emit();

   }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content, form.value.rating);
    form.resetForm();
  }

/**
   // send Http request
  onCreatePost(postData: {title: string; content: string}) {
    this.http.post<{ name: string }>(
      'https://books-database-517ee-default-rtdb.firebaseio.com/post.json',
      postData)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  private fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>('https://books-database-517ee-default-rtdb.firebaseio.com/post.json')
      .pipe(map(responseData => {
        const postArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)){
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      })
      )
      .subscribe(post => {
        this.loadedPosts = post;
      });
  }

**/

}
