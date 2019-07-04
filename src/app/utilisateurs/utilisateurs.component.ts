import { RegisterComponent } from './../register/register.component';
import { TokenStorageService } from './../auth/token-storage.service';
import { AdministrationService } from './../services/administration.service';
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
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  /* Table Structure */

  displayedColumns: string[] = ['name','username','email','role','Action-edit','Action-delete'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private administrationService : AdministrationService,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.administrationService.getAllUtilisateurs().subscribe(
      data => {
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

  add() {
    let dialogRef = this.dialog.open(RegisterComponent, {
      width: '30%',
      data: {}
    });
     dialogRef.afterClosed().subscribe(result => {
       if (result !== undefined){
         console.log(result)        
         this.administrationService.getAllUtilisateurs().subscribe(
          data => {
            this.dataSource = new MatTableDataSource<any>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort; 
          },
          error => console.log(error)  
        );
       }
     });
  }
}

// Ajouter Utilisateur

@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.css']
  })
  export class AjouterUtilisateurComponent implements OnInit {
  
  addForm: FormGroup;
  roles : any[] = [];

  constructor(public dialogRef: MatDialogRef<AjouterUtilisateurComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, 
              private administrationService : AdministrationService,
              private formBuilder: FormBuilder) {}
  
  ngOnInit() {

    this.addForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',Validators],
      username: ['',Validators.required],
      password: ['',Validators.required],
      rolee: ['',Validators.required]
    });

    this.administrationService.getRoles().subscribe(
      data => {
        console.log(data) 
        this.roles = data;      
      },
      error => console.log(error)  
    );
  }
  
  // close dialog  ajouter-arret-travail
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
