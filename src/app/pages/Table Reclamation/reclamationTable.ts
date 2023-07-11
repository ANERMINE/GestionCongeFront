import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-tables',
  templateUrl: './reclamationTable.html',
  styleUrls: ['./reclamationTable.scss']
})
export class ReclamationTable implements OnInit {
  private apiUrl = 'http://localhost:8081'; // Replace with your backend API URL
  formData: any = {};
  public reclamations: any[] = [];
  constructor(private http: HttpClient) { }

  addReclamation(data: any) {
    const url = `${this.apiUrl}/api/reclamation/addReclamation`;
    this.http.post(url, this.formData).subscribe((response: any) => {
      // Assuming the response contains the added reclamation object
      this.reclamations.push(response);
      this.resetForm();
    }, (error) => {
      console.log('Error adding reclamation:', error);
    });
  }

  resetForm() {
    this.formData = {}; // Reset the form data
  }


  ngOnInit() {
  }

}
