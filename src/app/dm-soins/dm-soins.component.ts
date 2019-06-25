import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';

@Component({
  selector: 'app-dm-soins',
  templateUrl: './dm-soins.component.html',
  styleUrls: ['./dm-soins.component.css']
})
export class DmSoinsComponent implements OnInit {

  /* Table Structure */
  
  displayedColumns: string[] = ['code','typeSoins','dateSoins','medecin','infirmier','Action-details','Action-edit','Action-delete'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


 /* Demande Table Structure */
 
  displayedColumnsDemande: string[] = ['code','typeSoins','dateDemande','medecin','Action-details','Action-add'];
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
