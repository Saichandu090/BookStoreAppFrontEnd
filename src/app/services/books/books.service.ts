import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IBookResponse } from '../../model/interfaces/books';
import { IJsonResponse } from '../../model/interfaces/jsonresponse';
import { Constant } from '../../constants/constant';
import { Book } from '../../model/classes/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseURL:string="http://localhost:8080/books/";

  private http:HttpClient=inject(HttpClient);

  onBookChanged: Subject<boolean> = new Subject<boolean>();

  getHeaders():HttpHeaders{
    let token = localStorage.getItem(Constant.LOGIN_TOKEN);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return headers;
  }

  getAllBooks():Observable<IJsonResponse>{
    const headers=this.getHeaders();
    return this.http.get<IJsonResponse>(this.baseURL+"allBooks",{ headers })
  }

  sortByBookPriceASC():Observable<IJsonResponse>{
    const headers=this.getHeaders();
    return this.http.get<IJsonResponse>(this.baseURL+"sortByBookPriceASC",{ headers })
  }

  sortByBookNameASC():Observable<IJsonResponse>{
    const headers=this.getHeaders();
    return this.http.get<IJsonResponse>(this.baseURL+"sortByBookNameASC",{ headers })
  }


  addNewBook(obj:Book):Observable<IJsonResponse>{
    const headers=this.getHeaders();
    return this.http.post<IJsonResponse>(this.baseURL+'addBook',obj,{headers})
  }

  deleteBook(id:number):Observable<IJsonResponse>{
    const headers=this.getHeaders();
    return this.http.delete<IJsonResponse>(`${this.baseURL}deleteBook/${id}`,{headers})
  }

  updateBook(id:number,obj:Book):Observable<IJsonResponse>{
    const headers=this.getHeaders();
    return this.http.put<IJsonResponse>(`${this.baseURL}updateBook/${id}`,obj,{headers})
  }

  getBookById(id:number):Observable<IJsonResponse>{
    const headers=this.getHeaders();
    return this.http.get<IJsonResponse>(`${this.baseURL}byBookId/${id}`,{headers})
  }

}
