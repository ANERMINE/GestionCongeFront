import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../models/Employee";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private BASE_URL = 'http://localhost:8081/Test';

  constructor(private http: HttpClient) { }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.BASE_URL}/Employee/GetById/${id}`);
  }
  getAlEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.BASE_URL}/Employee/All`);
  }
}
