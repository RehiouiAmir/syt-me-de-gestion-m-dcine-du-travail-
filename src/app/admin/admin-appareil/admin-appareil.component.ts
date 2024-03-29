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
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-admin-appareil',
  templateUrl: './admin-appareil.component.html',
  styleUrls: ['./admin-appareil.component.css']
})
export class AdminAppareilComponent implements OnInit {


  posteTravails : any[];
  departements : any[];
  societes : any[];
  sites : any[];

   /* Table Structure */
  
   displayedColumns: string[] = ['designation','medecin','Action-edit','Action-delete'];
   dataSource : MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   
   constructor(private activitesService : ActivitesMedicalesService,private administrationService : AdministrationService,
              public dialog: MatDialog, private employeService : EmployeService,private popupService: PopupService) { }
 
   ngOnInit() {
 
     this.activitesService.getAllAppareils().subscribe(
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
  let dialogRef = this.dialog.open(AjouterAppareilComponent, {
    width: '30%',
    data: {}
  });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        //change in backend
        this.administrationService.ajouterAppareil(result).subscribe(data => {
          this.dataSource.data.push(data)
          this.dataSource._updateChangeSubscription() 
          this.popupService.success("L'appareil a été ajouté avec succès");
        },
        error => this.popupService.danger("L'appareil n'a pas été ajouté")); 
      }
    });
 }

 getInterrogatoires(appareill: any) : void {
  let dialogRef = this.dialog.open(InterrogatoiresComponent, {
    width: '50%',
    data: {appareill: appareill}
  });
  dialogRef.afterClosed().subscribe();
 }
}

@Component({
  selector: 'app-ajouter-appareil',
  templateUrl: './ajouter-appareil.component.html',
  styleUrls: ['./ajouter-appareil.component.css']
  })
  export class AjouterAppareilComponent implements OnInit {
  
  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date());   
  
  constructor(public dialogRef: MatDialogRef<AjouterAppareilComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, 
  private formBuilder: FormBuilder ,private activitesMedicales : ActivitesMedicalesService) {}
  
  ngOnInit() {

    this.addForm = this.formBuilder.group({
      designation: ['',Validators.required],
    });
  }
  
  // close dialog  ajouter-arret-travail
  onNoClick(): void {
  this.dialogRef.close();
  }
  
  onSubmit() {
  if (!this.addForm.invalid){
    this.data = this.addForm.value;
    this.dialogRef.close(this.data);
    }
  }

}


// Interrogatoires
  
@Component({
  selector: 'app-interrogatoires',
  templateUrl: './interrogatoires.component.html',
  styleUrls: ['./interrogatoires.component.css']
})
export class InterrogatoiresComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  
  vaccins :any [];
  appareill: any;  

    /* Table Structure */
    
    displayedColumns: string[] = ['designation','medecin','Action-edit','Action-delete'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<InterrogatoiresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder,private employeService: EmployeService,public dialog: MatDialog,
    private activitesMedicalesService: ActivitesMedicalesService,
    private administrationService : AdministrationService) {this.appareill = data.appareill    }

  ngOnInit() {
    console.log(this.appareill);
    this.administrationService.getInterrogatoiresByAppareilId(this.appareill).subscribe(
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  add() {
    let dialogRef = this.dialog.open(AjouterInterrogatoireComponent, {
      width: '30%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        //change in backend
        this.administrationService.ajouterInterrogatoire(this.appareill,result).subscribe(data => {
          this.dataSource.data.push(data)
          this.dataSource._updateChangeSubscription() 
        },
        error => console.log(error));
      }
    });
   }

}

  // Ajouter Interrogatoire
  
  @Component({
    selector: 'app-ajouter-interrogatoire',
    templateUrl: './ajouter-interrogatoire.component.html',
    styleUrls: ['./ajouter-interrogatoire.component.css']
  })
  export class AjouterInterrogatoireComponent implements OnInit {
  
    addForm: FormGroup;
    dateAujourdhuit = new FormControl(new Date()); 
    
    vaccins :any [];
  
    constructor(public dialogRef: MatDialogRef<AjouterInterrogatoireComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private formBuilder: FormBuilder,private employeService: EmployeService,
      private activitesMedicalesService: ActivitesMedicalesService) {}
  
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