import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Author, Book } from './books.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  fetchBooks(): Observable<Book[]> {
    const url = `${this.baseUrl}/books`
		return this.http.get<Book[]>(url);
	}

  getAuthorById(id: number): Observable<Author> {
    const url = `${this.baseUrl}/authors/${id}`
		return this.http.get<Author>(url);
	}
}
