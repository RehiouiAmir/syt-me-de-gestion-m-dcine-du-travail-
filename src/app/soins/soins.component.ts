import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';
import { EmployeService } from 'src/app/services/employe.service';

@Component({
  selector: 'app-soins',
  templateUrl: './soins.component.html',
  styleUrls: ['./soins.component.css']
})
export class SoinsComponent implements OnInit {

  dataTable :  any[];
  dataTable1 :  any[];
  posteTravails : any[];
  departements : any[];
  societes : any[];
  sites : any[];
   /* Table Structure */
  
   displayedColumns: string[] = ['matricule','numCarteChifa','posteTravail','acte','observation','dateSoins','medecin','infirmier'];
   dataSource : MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;


  /* Demande Table Structure */
  
   displayedColumnsDemande: string[] = ['matricule','numCarteChifa','posteTravail','acte','observation','dateDemande','medecin'];
   dataSourceDemande : MatTableDataSource<any>;
 
   @ViewChild('MatPaginatorDemande') paginatorDemande: MatPaginator;
   @ViewChild('MatSortDemande') sortDemande: MatSort;
   
   constructor(private activitesService : ActivitesMedicalesService, private employeService : EmployeService) { }
 
   ngOnInit() {
    
     this.activitesService.getAllSoinss().subscribe(
       data => {
         console.log(data)
         this.dataTable = data;
         this.dataSource = new MatTableDataSource<any>(this.dataTable);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort; 
       },
       error => console.log(error)  
     );

     this.activitesService.getAllSoinsInfirmiers().subscribe(
      data => {
        console.log(data)
        this.dataTable1 = data;
        this.dataSourceDemande = new MatTableDataSource<any>(this.dataTable1);
        this.dataSourceDemande.paginator = this.paginator;
        this.dataSourceDemande.sort = this.sort; 
      },
      error => console.log(error)  
    );

     this.employeService.getAllPosteTravails().subscribe(
      data => {
        console.log(data) 
        this.posteTravails = data;      
      },
      error => console.log(error)  
    );

    this.employeService.getAllDepartements().subscribe(
      data => {
        console.log(data) 
        this.departements = data;      
      },
      error => console.log(error)  
    );

    this.employeService.getAllSocietes().subscribe(
      data => {
        console.log(data) 
        this.societes = data;      
      },
      error => console.log(error)  
    );

    this.employeService.getAllSites().subscribe(
      data => {
        console.log(data) 
        this.sites = data;      
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
