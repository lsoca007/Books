import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookserviceService } from '../bookservice.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})


export class BookComponent implements OnInit {

  booksToDisplay: Object;
  constructor(private theService: BookserviceService, private router: Router) { }
  selectedBook?: Book;
  review = false;
  
  ngOnInit(): void {
    this.theService.searchBook("ALL").subscribe(book => {
    this.booksToDisplay = book;
    console.log(this.booksToDisplay);
    })
  }  

 
  onSelect(book: Book): void {
    location.href = '/details/'+ book._id.toString();
  }

  // freature-5 write a review button
  dropDownFunc(id) {
    document.getElementById(id).classList.toggle("show");
  }

  sort(){
    location.href = '/details/bro';
  }
  
  GetSelectedValue(){
    var e = document.getElementById("country");
    var result = e.nodeValue;

    document.getElementById("result").innerHTML = result;
  }


}

