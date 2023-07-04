import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from "../models/post";


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private BASE_URL = 'http://localhost:8081/Test'; // Remplacez l'URL par l'URL du backend

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/Post/allPosts`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.BASE_URL}/Post/PostByID/${id}`);
  }

  addPost(post: any){
    return this.http.post(`${this.BASE_URL}/addPost`, post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.BASE_URL}/Post/update/${post.id_post}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/Post/delete/${id}`);
  }
}
