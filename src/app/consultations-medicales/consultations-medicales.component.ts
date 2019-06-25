import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';

@Component({
  selector: 'app-consultations-medicales',
  templateUrl: './consultations-medicales.component.html',
  styleUrls: ['./consultations-medicales.component.css']
})
export class ConsultationsMedicalesComponent implements OnInit {

  
    /* Table Structure */
  
    displayedColumns: string[] = ['code','matricule','numCarteChifa','posteTravail','typeConsultation','dateConsultation','medecin','Action-details'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(private activitesService : ActivitesMedicalesService) { }
  
    ngOnInit() {
  
      this.activitesService.getAllConsultations().subscribe(
        data => {
          console.log(data)
          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
        },
        error => console.log(error)  
      );
    }
  
    // search table
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

}
