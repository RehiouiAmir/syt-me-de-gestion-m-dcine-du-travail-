import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';
import { EmployeService } from 'src/app/services/employe.service';

@Component({
  selector: 'app-arrets-travail',
  templateUrl: './arrets-travail.component.html',
  styleUrls: ['./arrets-travail.component.css']
})
export class ArretsTravailComponent implements OnInit {
  
  posteTravails : any[];
  departements : any[];
  societes : any[];
  sites : any[];

  /* Table Structure */
  
  displayedColumns: string[] = ['matricule','numCarteChifa','posteTravail','motif','dateDebut','dateFin','medecin','Action-details'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private activitesService : ActivitesMedicalesService, private employeService : EmployeService) { }

  ngOnInit() {

    this.activitesService.getAllArretTravails().subscribe(
      data => {
        console.log(data)
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
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


}
