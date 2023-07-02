import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conge } from '../models/conge';

const baseUrl = 'http://localhost:8081/Test/conge'
@Injectable({ 
  providedIn: 'root'
})
export class CongeService {
constructor(private httpClient : HttpClient) { }


getConge():Observable<Conge[]> {
    const url = `${baseUrl}/all`
  return this.httpClient.get<Conge[]>(url);
}
addConge(data: any, id:any) {
  const url = `${baseUrl}/add/`
  return this.httpClient.post(url+id, data);
}
GetNbJours(startDate:Date,EndDate:Date)
{
  const url = `${baseUrl}/GetNbJour/`
  return this.httpClient.get(url+startDate+startDate);
}
GetListeConge(id:any):Observable<Conge[]>
{
  const url = `${baseUrl}/GetListConge/`
  return this.httpClient.get<Conge[]>(url+id);
}

}
