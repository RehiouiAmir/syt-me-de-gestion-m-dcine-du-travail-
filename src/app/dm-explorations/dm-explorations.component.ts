import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild } from '@angular/core';
import { EmployeService } from 'src/app/services/employe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dm-explorations',
  templateUrl: './dm-explorations.component.html',
  styleUrls: ['./dm-explorations.component.css']
})
export class DmExplorationsComponent implements OnInit {

  private id_employe: number;
  employeInfos : any = null;
  posteActuel : any = null;
  
    /* Table Structure */
  
    displayedColumns: string[] = ['designation','dateDemande','dateResultat','medecin','Action-details','Action-edit','Action-delete'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

     /* Réorientation Table Structure */
  
     displayedColumnsOrientation: string[] = ['specialiste','dateDemande','dateReponse','medecin','Action-details','Action-edit','Action-delete'];
     dataSourceOrientation : MatTableDataSource<any>;
   
     @ViewChild('MatPaginatorOrientation') paginatorOrientation: MatPaginator;
     @ViewChild('MatSortOrientation') sortOrientation: MatSort;
    
    constructor(private route: ActivatedRoute, private employeService: EmployeService) { 
      this.id_employe = Number(this.route.snapshot.paramMap.get('id'));
    }
  
    ngOnInit() {
  
      this.employeService.getEmployeById(this.id_employe).subscribe(
        data => {
          console.log(data)
          this.employeInfos = data;
          for(var i in this.employeInfos.employe_posteTravails){
            if (this.employeInfos.employe_posteTravails[i].actuel === true){
              this.posteActuel = this.employeInfos.employe_posteTravails[i];
              console.log(this.posteActuel)
            }
          }
        },
        error => console.log(error)  
      );

      this.employeService.getAllExamenComplementaires(this.id_employe).subscribe(
        data => {
          console.log(data)
          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
        },
        error => console.log(error)  
      );

      this.employeService.getAllOrientationMedicales(this.id_employe).subscribe(
        data => {
          console.log(data)
          this.dataSourceOrientation = new MatTableDataSource<any>(data);
          this.dataSourceOrientation.paginator = this.paginator;
          this.dataSourceOrientation.sort = this.sort; 
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
    applyFilterOrientation(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}
