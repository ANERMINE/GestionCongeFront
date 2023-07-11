import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CongeService } from '../../services/conge.service';

@Component({
  selector: 'app-add-conge',
  templateUrl: './add-conge.component.html',
  styleUrls: ['./add-conge.component.css']
})
export class AddCongeComponent implements OnInit {
  selectedValue: string;
  
  showDownloadField: boolean = false;
  dropdownValues: string[] = ['Payé', 'Maladie', 'Sans solde'];

  constructor() { }
  id:any;
  ngOnInit(): void {
 //   this.id=this.ac.snapshot.params['id'];
  }
  onTypeSelected() {
    if (this.selectedValue === 'Maladie') {
      this.showDownloadField = true;
    } else {
      this.showDownloadField = false;
    }
  }

}
