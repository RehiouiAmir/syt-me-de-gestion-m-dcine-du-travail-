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
  selector: 'app-admin-poste-travail',
  templateUrl: './admin-poste-travail.component.html',
  styleUrls: ['./admin-poste-travail.component.css']
})
export class AdminPosteTravailComponent implements OnInit {

 
  posteTravails : any[];
  departements : any[];
  societes : any[];
  sites : any[];

   /* Table Structure */
  
   displayedColumns: string[] = ['designation','societe','site','departement','medecin','Action-edit','Action-delete'];
   dataSource : MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   
   constructor(private activitesService : ActivitesMedicalesService,
              public dialog: MatDialog, private employeService : EmployeService,
              private administrationService : AdministrationService) { }
 
   ngOnInit() {
 
     this.employeService.getAllPosteTravails().subscribe(
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
  let dialogRef = this.dialog.open(AjouterPosteTravailComponent, {
    width: '30%',
    data: {}
  });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        //change in backend
        var id= result.departementt;
        result.departementt= null;
        console.log(result)        
        this.administrationService.ajouterPosteTravail(id,result).subscribe(data => {
          this.dataSource.data.push(data)
          this.dataSource._updateChangeSubscription() 
        },
        error => console.log(error));
      }
    });
 }
}

@Component({
  selector: 'app-ajouter-posteTravail',
  templateUrl: './ajouter-posteTravail.component.html',
  styleUrls: ['./ajouter-posteTravail.component.css']
  })
  export class AjouterPosteTravailComponent implements OnInit {
  
  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  societes : any[] = [];
  sites : any[] = [];
  departements : any[] = [];
  
  
  
  constructor(public dialogRef: MatDialogRef<AjouterPosteTravailComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, 
  private formBuilder: FormBuilder ,private activitesMedicales : ActivitesMedicalesService,private employeService : EmployeService) {}
  
  ngOnInit() {

    this.employeService.getAllSocietes().subscribe(
      data => {
        console.log(data) 
        this.societes = data;      
      },
      error => console.log(error)  
    );
  
    this.addForm = this.formBuilder.group({
      designation: ['', Validators.required],
      societee: ['', Validators.required],
      sitee: ['', Validators.required],
      departementt: ['', Validators.required]
    });
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

  InitialiserSites(value) {
    this.employeService.getSitesBySocieteId(value).subscribe(
      data => {
        console.log(data) 
        this.departements = null;
        this.sites = data;      
      },
      error => console.log(error)  
    );
  }

  InitialiserDepartements(value) {
    this.employeService.getSitesByDepartementId(value).subscribe(
      data => {
        console.log(data) 
        this.departements = data;      
      },
      error => console.log(error)  
    );
  }
}
