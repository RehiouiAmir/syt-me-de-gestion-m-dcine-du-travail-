import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';

@Component({
  selector: 'app-soins',
  templateUrl: './soins.component.html',
  styleUrls: ['./soins.component.css']
})
export class SoinsComponent implements OnInit {

   /* Table Structure */
  
   displayedColumns: string[] = ['matricule','numCarteChifa','posteTravail','typeSoins','dateSoins','medecin','infirmier','Action-details'];
   dataSource : MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;


  /* Demande Table Structure */
  
   displayedColumnsDemande: string[] = ['matricule','numCarteChifa','posteTravail','typeSoins','dateDemande','medecin','Action-details','Action-add'];
   dataSourceDemande : MatTableDataSource<any>;
 
   @ViewChild('MatPaginatorDemande') paginatorDemande: MatPaginator;
   @ViewChild('MatSortDemande') sortDemande: MatSort;
   
   constructor(private activitesService : ActivitesMedicalesService) { }
 
   ngOnInit() {
 
     this.activitesService.getAllAccidentTravails().subscribe(
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

   // search table
   applyFilterDemande(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
