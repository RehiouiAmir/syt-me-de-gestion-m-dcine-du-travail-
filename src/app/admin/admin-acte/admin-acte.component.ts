import { AdministrationService } from './../../services/administration.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivitesMedicalesService } from 'src/app/services/activites-medicales.service';
import { EmployeService } from 'src/app/services/employe.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-acte',
  templateUrl: './admin-acte.component.html',
  styleUrls: ['./admin-acte.component.css']
})
export class AdminActeComponent implements OnInit {

   /* Table Structure */
  
   displayedColumns: string[] = ['designation','medecin','Action-edit','Action-delete'];
   dataSource : MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  constructor(private activitesService : ActivitesMedicalesService,
    private administrationService : AdministrationService,
    public dialog: MatDialog, private employeService : EmployeService) { }

  ngOnInit() {

    this.employeService.getAllActes().subscribe(
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

    // Operation Add, Edit, Delet

    add() {
      let dialogRef = this.dialog.open(AjouterActeComponent, {
      width: '30%',
      data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        console.log(result)        
        this.administrationService.ajouterActe(result).subscribe(data => {
          this.dataSource.data.push(data)
          this.dataSource._updateChangeSubscription() 
        },
        error => console.log(error));
      }
      });
    }
}



@Component({
  selector: 'app-ajouter-acte',
  templateUrl: './ajouter-acte.component.html',
  styleUrls: ['./ajouter-acte.component.css']
  })
  export class AjouterActeComponent implements OnInit {
  
  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date());   
  
  constructor(public dialogRef: MatDialogRef<AjouterActeComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, 
  private formBuilder: FormBuilder) {}
  
  ngOnInit() {
  
    this.addForm = this.formBuilder.group({
      designation: ['',Validators.required],
    });
  }
  
  onNoClick(): void {
  this.dialogRef.close();
  }
  
  onSubmit() {
  if (!this.addForm.invalid){
    this.data = this.addForm.value;
    console.log(this.data)
    this.dialogRef.close(this.data);
    }
  }

}
