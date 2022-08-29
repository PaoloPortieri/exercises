import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin, from, fromEvent, Observable, of, timer, lastValueFrom, merge, concat} from 'rxjs';
import { map, mergeMap, concatMap, tap, withLatestFrom, toArray, skipWhile, takeWhile, switchMap, mergeAll, last } from 'rxjs/operators';
import { Author, Book, BookWithAuthor, isAuthor, isBook } from './books.model';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  res$: Observable<any> = of(null);
  books$!: Observable<Book[]>;
  book$!: Observable<Book>;
  authors: Author[] = [];
  author$!: Observable<Author>;
  booksWithAuthor: BookWithAuthor[] = [];
  bookWithAuthor: BookWithAuthor = {"titleBook": "", "authorName": ""};
  http: HttpClient;

  constructor(private booksService: BooksService, http: HttpClient) {
    this.http = http;
  }

  obsEsUno$: Observable<number> = of(1, 2, 3);

  obsEsDue$: Observable<number> = of(1, 2, 3);
  timerEsDue = timer(1000, 1000);

  obsEsTre$: Observable<number> = of(1, 2, 3);

  async ngOnInit(): Promise<void> {

    // // Esercizio 1: fai un observable che emette 3 valori: 1, 2, 3
    // this.obsEsUno$
    // .subscribe(res => (console.log('Esercizio 1 = ', res)));

    // // Esercizio 2: usando un timer, fai un observable che emette 3 valori: 1, 2, 3
    // timer(1000, 1000)
    // .pipe(takeWhile(val => val < 4))
    // .subscribe(res => {
    //   console.log('Esercizio 2.5 = ', res)
    // });

    // // Esercizio 2.5: usa un operatore e fagli emettere 2, 4, 6
    // this.obsEsTre$
    // .pipe(
    //   map(e => e * 2)
    // )
    // .subscribe(res => (console.log('Esercizio 3 = ', res)));

    // // Esercizio 3: Per ogni emissione dell'observable dell'es. 2, chiama una api e logga il risultato
    // timer(1000, 1000)
    // .pipe(takeWhile(val => val < 4))
    // .subscribe(res => {
    //   console.log(this.http.get('http://localhost:3000/books'));
    // });

    // // Esercizio 4: fai un observable che emette due valori: [1, 2, 3] e [4, 5, 6]
    // of([1, 2, 3], [4, 5, 6])
    // .subscribe(res => (console.log('Esercizio 4 = ', res)));

    // // Esercizio 5: Fai un observable che dal click di un pulsante fa una chiamata api e logga il risultato
    
    // //usa from event e get element by id
    // fromEvent(document.getElementById('clickdiv')!, 'click')
    // .subscribe(res => {
    //   this.http.get('http://localhost:3000/books')
    //   .subscribe(r => console.log(r));
    // })

    // __________________________________________________

    // TODO
    // use the two apis in books.service to obtain a list of BooksWithAuthor object

    // get Books
    this.book$ = this.booksService.fetchBooks()
    .pipe(mergeAll()); //Why does this work? why does mergeAll flatten an array? - it used to be flatmap

    // get the Authors
    this.book$.pipe(
      mergeMap(res => this.booksService.getAuthorById(res.authorId))
    ).subscribe(author => this.authors.push(author));
    //  this.book$.subscribe(async res => {
    //    console.log("res = {}", res);
    //    this.booksService.getAuthorById(res.authorId)
    //    .subscribe(author => this.authors.push(author));
    //    this.author$ = from(this.authors);
    //  });
     await lastValueFrom(this.book$);    
    // Refactor the above without using the async wait and using mergeMap instead of nested subscribe

    
    // make a list of BooksWithAutors
    this.book$
    .subscribe(book =>{
      //fetch book author
      let author = this.authors.find(x => x.id === book.authorId);
      
      //create bookWithAuthor object
      this.bookWithAuthor.authorName = author!.name;
      this.bookWithAuthor.titleBook = book.title;

      //push to array
      this.booksWithAuthor.push(this.bookWithAuthor);
      this.bookWithAuthor = {"titleBook": "", "authorName": ""};
    })

    console.log("booksWithAuthor array = {}", this.booksWithAuthor)

    // concat(this.book$, this.author$)
    // .subscribe(val => {
    //   console.log(val);
    //   if(isBook(val)){
    //     console.log("val is book");
    //     this.bookWithAuthor.titleBook = val.title;
    //   }
    //   if(isAuthor(val)){
    //     console.log("val is author");
    //     this.bookWithAuthor.authorName = val.name;
    //   }
    //   if ((this.bookWithAuthor.authorName !== "") && (this.bookWithAuthor.titleBook !== "")){
    //     this.booksWithAuthor.push(this.bookWithAuthor);
    //     console.log(this.booksWithAuthor);
    //     this.bookWithAuthor = {"titleBook": "", "authorName": ""};
    //   }
    // });
    // console.log(this.booksWithAuthor);
  }

  esCinque(){
    console.log('stepped into callApiEsCinque');
    console.log('it appears you know how to click a button.');
  }  
  
}