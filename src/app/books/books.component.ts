import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin, from, fromEvent, Observable, of, timer, lastValueFrom, merge, concat, zip, combineLatest } from 'rxjs';
import { map, mergeMap, concatMap, tap, withLatestFrom, toArray, skipWhile, takeWhile, switchMap, mergeAll, last, filter } from 'rxjs/operators';
import { Author, Book, BookWithAuthor, isAuthor, isBook } from './books.model';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  res$: Observable<any> = of(null);
  // books$!: Observable<Book[]>;
  // book$!: Observable<Book>;
  //  authors: Author[] = [];
  // author$!: Observable<Author>;
  booksWithAuthor: BookWithAuthor[] = [];
  bookWithAuthor: BookWithAuthor = { "titleBook": "", "authorName": "" };
  http: HttpClient;

  constructor(private booksService: BooksService, http: HttpClient) {
    this.http = http;
  }

  obsEsUno$: Observable<number> = of(1, 2, 3);

  obsEsDue$: Observable<number> = of(1, 2, 3);
  timerEsDue = timer(1000, 1000);

  obsEsTre$: Observable<number> = of(1, 2, 3);

  ngOnInit() {

    const books$ = this.booksService.fetchBooks().pipe(mergeAll());
    const authors$ = books$.pipe(mergeMap(book => this.booksService.getAuthorById(book.authorId)));

    books$.pipe(
      mergeMap(book => {
        return combineLatest([
          of(book),
          authors$
        ]);
      }),
      map(([book, author]) => {
        // Here we can access both book and author
        this.bookWithAuthor = { titleBook: book.title, authorName: author.name };
        if (!this.booksWithAuthor.find(x => this.bookWithAuthor.titleBook === x.titleBook)) {
          this.booksWithAuthor.push(this.bookWithAuthor);
        }
        console.log(this.booksWithAuthor);
      })
    ).subscribe();

    // se chiamo una seconda ad es. mergemap nel pipe equivale a chiamare comunque .mergemap sull'outer obs., poi il valore con qu lavoro (pippo =>) è quello già manipolato dal primo mergemap

    // mergeMap will automatically subscribe under the hood in order to return the flattened valued emitted by the inner observable

    // ============================ FABIO SOLUTION ================================


        // // fetch books
        // this.books$ = this.booksService.fetchBooks();

        // //convert the observable emitting only one value (array of books) to
        // // an observable emitting several values where each value is a book in the former array
        // this.book$ = this.books$.pipe(
        //   concatMap((books) => {
        //     return from(books);
        //   })
        // );
    
        // // this.book$ = this.books$.pipe(concatAll()); // alernative version, when we need only flattening and no mapping
    
        // // solution 1:
        // this.res$ = this.book$.pipe(
        //   mergeMap(book => {
        //     return this.booksService.getAuthorById(book.authorId).pipe(
        //       map(author => ({ authorName: author.name, titleBook: book.title} as BooksWithAuthor))
        //     )
        //   }),
        //   toArray()
        // );
    
        // // solution 2:
        // this.res$ = this.book$.pipe(
        //   mergeMap(book => {
        //     return combineLatest([
        //       this.booksService.getAuthorById(book.authorId),
        //       of(book)
        //     ])
        //   }),
        //   map(([author, book]: [Author, Books]) => {
        //     return { authorName: author.name, titleBook: book.title} as BooksWithAuthor;
        //   }),
        //   toArray()
        // );
    
    
        // // in both solutions we had to pass the parameter book further in the chain:
        // // https://medium.com/@snorredanielsen/rxjs-accessing-a-previous-value-further-down-the-pipe-chain-b881026701c1
    
    
    
        // this.res$.subscribe(res => {
        //   // console.log('res', res);
        // })

        
        // ==================================== FABIO SOLUTION =================================
   
  }

  esCinque() {
    console.log('stepped into callApiEsCinque');
    console.log('it appears you know how to click a button.');
  }

}