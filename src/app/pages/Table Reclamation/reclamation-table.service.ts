import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReclamationTableService {
  private apiUrl = 'http://localhost:8081'; // Replace with your backend API URL
  constructor( private http: HttpClient) {
  }


}
