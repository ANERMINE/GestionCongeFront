import {Component, OnInit} from '@angular/core';
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

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
  TypeConge: any =
    [{value: '1', label: 'DemandeSoldeConge'},
      {value: '2', label: 'Feedback'},
      {value: '3', label: 'DemandeSoldeConge'},
    ];

  constructor(private http: HttpClient) {
  }

  addReclamation(data: any) {
    const url = `${this.apiUrl}/Test/Reclamation/addRec`;
    this.http.post(url, this.formData).subscribe((response: any) => {
      this.resetForm();
      window.location.reload();

    }, (error) => {
      console.log('Error adding reclamation:', error);
    });
  }

  resetForm() {
    this.formData = {}; // Reset the form data
  }

  fileChange(input) {
    console.log("uninoputtttt", input)
  }

  ImportFile() {
    document.getElementById("addfile").click()
  }

  ngOnInit() {

    const url = `${this.apiUrl}/Test/Reclamation/AllRec`;
    this.http.get(url).subscribe((response: any) => {

      this.reclamations = response
      this.resetForm();

    }, (error) => {
      console.log('Error adding reclamation:', error);
    });


  }

}
