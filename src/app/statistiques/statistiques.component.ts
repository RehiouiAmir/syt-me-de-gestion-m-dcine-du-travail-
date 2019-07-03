import { AdministrationService } from './../services/administration.service';
import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {

  constructor(private administrationService: AdministrationService) { }

  ngOnInit() {
  }
  
  genererRapport() {
        this.administrationService.genererRapport().subscribe(
          data => {
             console.log(data.s);
             this.downloadFile(data.s);
          },
          error => console.log(error)  
        );
   }
    downloadFile(s : String) {
     // const blob = new Blob([data], { type: 'text/csv' });
     // const url= window.URL.createObjectURL(blob);
    //  window.open("http://localhost:8080/"+s);
    //  var url = "http://localhost:8080/"+s;
     var url = "\\192.168.43.47\Users\Public\text.pdf";
     window.open(url);

    // const doc = new jsPDF();
    // doc.text('azeaze',10,10);
    // doc.save('Text.pdf');
   }
}
