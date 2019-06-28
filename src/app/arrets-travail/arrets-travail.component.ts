import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';

@Component({
  selector: 'app-arrets-travail',
  templateUrl: './arrets-travail.component.html',
  styleUrls: ['./arrets-travail.component.css']
})
export class ArretsTravailComponent implements OnInit {
  /* Table Structure */
  
  displayedColumns: string[] = ['matricule','numCarteChifa','posteTravail','motif','dateDebut','dateFin','medecin','Action-details'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
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


}
