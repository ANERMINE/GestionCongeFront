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

  /*addPost(post: any){
    return this.http.post(`${this.BASE_URL}/addPost`, post);
  }*/
  createPost(employeeId: number, post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.BASE_URL}/${employeeId}`, post);
  }

  getCurrentEmployeeId(): number {
    // Retrieve the logged-in employee from local storage or any other suitable method
    const loggedEmployee = JSON.parse(localStorage.getItem('loggedInEmployee'));

    // Extract and return the employee ID
    return loggedEmployee ? loggedEmployee.id : null;
  }

  updatePost(post: Post): Observable<Post> {
    const postId = post.id_post; // Récupérez l'ID du post
    const updatedPost = { description: post.description }; // Créez un objet avec les propriétés à mettre à jour

    return this.http.put<Post>(`${this.BASE_URL}/Post/update/${postId}`, updatedPost);
  }


  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/Post/delete/${id}`);
  }

}

