import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://example.com/api/posts'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  addPost(content: string): Observable<any> {
    const postData = { content: content };

    return this.http.post(this.apiUrl, postData);
  }}


