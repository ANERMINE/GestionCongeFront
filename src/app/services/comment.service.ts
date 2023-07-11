import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../models/comment";
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private BASE_URL = 'http://localhost:8081/Test';
  constructor(private http: HttpClient) { }
  addComment(comment: Comment): Observable<Comment> {
    const postId = comment.post.id_post;
    const employeeId = comment.post.employeeId;

    return this.http.post<Comment>(`${this.BASE_URL}/Comments/addCommentByPostETEmploye/${postId}/${employeeId}`, comment);
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/Comments/delete/${commentId}`);
  }
}
