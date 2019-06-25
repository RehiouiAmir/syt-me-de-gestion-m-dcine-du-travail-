import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

// Services imporation 
import { EmployeService } from '../services/employe.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dm-consultation-medicale',
  templateUrl: './dm-consultation-medicale.component.html',
  styleUrls: ['./dm-consultation-medicale.component.css']
})
export class DmConsultationMedicaleComponent implements OnInit {

  private id_employe: number;

  /* Table Structure */

  displayedColumns: string[] = ['type','date','nature','medecin','Action-details','Action-edit','Action-delete'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private route: ActivatedRoute, private employeService: EmployeService) { 
    this.id_employe = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {

    this.employeService.getEmployeById(this.id_employe).subscribe(
      data => {
        console.log(data)
        this.dataSource = new MatTableDataSource<any>(data.consultations);
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
