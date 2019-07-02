import { AdministrationService } from './../services/administration.service';
import { Component, OnInit } from '@angular/core';

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
             console.log(data);
             this.downloadFile();
          },
          error => console.log(error)  
        );
   }
    downloadFile() {
     // const blob = new Blob([data], { type: 'text/csv' });
     // const url= window.URL.createObjectURL(blob);
     window.open("http://localhost:8080/mmmmm.pdf");
   }
}
