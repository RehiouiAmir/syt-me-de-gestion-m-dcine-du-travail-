import { Component, OnInit } from '@angular/core'; 
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';

@Component({
  selector: 'app-visites-medicales',
  templateUrl: './visites-medicales.component.html',
  styleUrls: ['./visites-medicales.component.css']
})
export class VisitesMedicalesComponent implements OnInit {

  private id_employe: number;
  dataTable :  any[];
  
    /* Table Structure */
  
    displayedColumns: string[] = ['code','matricule','numCarteChifa','posteTravail','typeVisite','dateVisite','etatVisite','medecin','Action-details'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(private activitesService : ActivitesMedicalesService) { }
    
    ngOnInit() {
  
      this.activitesService.getAllvisiteMedicales().subscribe(
        data => {
          console.log(data)
          this.dataTable = data;
          this.dataSource = new MatTableDataSource<any>(this.dataTable);
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
