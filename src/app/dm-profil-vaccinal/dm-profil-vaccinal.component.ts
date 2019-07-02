import { ActivitesMedicalesService } from './../services/activites-medicales.service';
import { AdministrationService } from './../services/administration.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dm-profil-vaccinal',
  templateUrl: './dm-profil-vaccinal.component.html',
  styleUrls: ['./dm-profil-vaccinal.component.css']
})
export class DmProfilVaccinalComponent implements OnInit {

  id_employe : number;
  employeInfos : any = null;
  posteActuel : any = null;
  
    /* Table Structure */
    
    displayedColumns: string[] = ['designation','serum','nombreInjection','duree','etat','medecin','infirmier','Action-details','Action-edit','Action-delete'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(private route: ActivatedRoute,private activitesService : ActivitesMedicalesService,
      private employeService : EmployeService, public dialog: MatDialog) { 
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
      
      this.employeService.getAllVaccinByEmployeId(this.id_employe).subscribe(
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
  
   // Operation Add, Edit, Delet
     
   add() {
    let dialogRef = this.dialog.open(AjouterProfileVaccinalComponent, {
      width: '70%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        //change in backend
        console.log(result.vaccinn)
        this.employeService.ajouterCalendrierVaccinal(this.id_employe, result.vaccinn,result).subscribe(data => {
          this.dataSource.data.push(data)
          this.dataSource._updateChangeSubscription() 
        },
        error => console.log(error));
      }
    });
   }

   addInjection(calendrierVaccinal: any) : void {
    let dialogRef = this.dialog.open(AjouterInjectionVaccinalComponent, {
      width: '50%',
      data: {calendrierVaccinal: calendrierVaccinal}
    });
    dialogRef.afterClosed().subscribe();
   }
  
  }
  
  // AjouterProfil Vacinaal
  
  @Component({
    selector: 'app-ajouter-profileVaccinal',
    templateUrl: './ajouter-profileVaccinal.component.html',
    styleUrls: ['./ajouter-profileVaccinal.component.css']
  })
  export class AjouterProfileVaccinalComponent implements OnInit {
  
    addForm: FormGroup;
    dateAujourdhuit = new FormControl(new Date()); 
  
    vaccins :any [];
  
    constructor(public dialogRef: MatDialogRef<AjouterProfileVaccinalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private formBuilder: FormBuilder,private employeService: EmployeService,
      private activitesMedicalesService: ActivitesMedicalesService) {}
  
    ngOnInit() {
  
      this.activitesMedicalesService.getAllVaccis().subscribe(
        data => {
          console.log(data) 
          this.vaccins = data;      
        },
        error => console.log(error)  
      );
      this.addForm = this.formBuilder.group({
        nombreInjection: ['',Validators.required],
        duree: ['',Validators.required],
        vaccinn: ['',Validators.required]
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

}

// Ajouter injectionVaccinal
  
@Component({
  selector: 'app-ajouter-injectionVaccinal',
  templateUrl: './ajouter-injectionVaccinal.component.html',
  styleUrls: ['./ajouter-injectionVaccinal.component.css']
})
export class AjouterInjectionVaccinalComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  
  vaccins :any [];
  calendrierVaccinal: any;  

    /* Table Structure */
    
    displayedColumns: string[] = ['etat','date','effectuePar','duree','Action-delete'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<AjouterInjectionVaccinalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder,private employeService: EmployeService,public dialog: MatDialog,
    private activitesMedicalesService: ActivitesMedicalesService) {this.calendrierVaccinal = data.calendrierVaccinal    }

  ngOnInit() {
    console.log(this.calendrierVaccinal);
    this.employeService.getAllInjectionByCalendrierVaccinalId(this.calendrierVaccinal).subscribe(
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

  // close dialog  ajouter-arret-travail
  onNoClick(): void {
    this.dialogRef.close();
  }

  add() {
    let dialogRef = this.dialog.open(AjouterInjectionComponent, {
      width: '30%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        //change in backend
        this.employeService.ajouterInjection(this.calendrierVaccinal,result).subscribe(data => {
          this.dataSource.data.push(data)
          this.dataSource._updateChangeSubscription() 
        },
        error => console.log(error));
      }
    });
   }

}

  // Ajouter Injection
  
  @Component({
    selector: 'app-ajouter-injection',
    templateUrl: './ajouter-injection.component.html',
    styleUrls: ['./ajouter-injection.component.css']
  })
  export class AjouterInjectionComponent implements OnInit {
  
    addForm: FormGroup;
    dateAujourdhuit = new FormControl(new Date()); 
    
  
    vaccins :any [];
  
    constructor(public dialogRef: MatDialogRef<AjouterInjectionComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private formBuilder: FormBuilder,private employeService: EmployeService,
      private activitesMedicalesService: ActivitesMedicalesService) {}
  
    ngOnInit() {
      this.addForm = this.formBuilder.group({
        date: ['',Validators.required]
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

}