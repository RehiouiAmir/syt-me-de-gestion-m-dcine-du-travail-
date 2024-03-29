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
import { PopupService } from 'src/app/services/popup.service';
import { DialogsService } from 'src/app/dialogs/dialogs.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dm-profil-vaccinal',
  templateUrl: './dm-profil-vaccinal.component.html',
  styleUrls: ['./dm-profil-vaccinal.component.css']
})
export class DmProfilVaccinalComponent implements OnInit {

  id_employe : number;
  employeInfos : any = null;
  posteActuel : any = null;
  imageSource : string;  
  
    /* Table Structure */
    
    displayedColumns: string[] = ['designation','serum','nombreInjection','duree','etat','medecin','Action-details','Action-edit','Action-delete'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(private route: ActivatedRoute,private activitesService : ActivitesMedicalesService,
      private employeService : EmployeService, public dialog: MatDialog,
      private popupService: PopupService,private dialogsService: DialogsService) { 
      this.id_employe = Number(this.route.snapshot.paramMap.get('id'));
    }
  
    ngOnInit() {
      
  
      this.employeService.getEmployeById(this.id_employe).subscribe(
        data => {
          console.log(data)
          this.employeInfos = data;
          if(data.file== null){
            this.imageSource = "../../assets/img/pic-user.png";
          } else {
            this.imageSource = environment.fileUrl+data.file.fileName;            
          }
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
     
   add(edit) {
    let dialogRef = this.dialog.open(AjouterProfileVaccinalComponent, {
      width: '60%',
      data: {edit:edit}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        //change in backend
        console.log(result.vaccinn)
        this.employeService.ajouterCalendrierVaccinal(this.id_employe, result.vaccinn,result).subscribe(data => {
          this.dataSource.data.push(data)
          this.dataSource._updateChangeSubscription() 
          this.popupService.success("Le calendrier vaccinal a été ajouté avec succès"); 
        },
        error => this.popupService.danger("Le calendrier vaccinal n'a pas été ajouté"));  
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

   update(edit: any,object) {  
    let dialogRef = this.dialog.open(AjouterProfileVaccinalComponent, {
      width: '50%',
      data: {
        edit : edit, object : object,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        console.log(result)
        //change in backend
        this.employeService.updateCalendrierVaccinal(result.id,result).subscribe(data => {
          this.popupService.success("Le calendrier vaccinal a été modifié avec succès");                      
          this.employeService.getAllVaccinByEmployeId(this.id_employe).subscribe(
            data => {
              console.log(data)
              this.dataSource = new MatTableDataSource<any>(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort; 
            },
            error => console.log(error)  
          );  
        },
        error => this.popupService.danger("Le calendrier vaccinal n'a pas été modifié")); 
      }
    });
  }
  delete(object){
    this.dialogsService
    .confirm('Confirmation', 'Voulez-vous vraiment supprimer ce calendrier vaccinal?')
    .subscribe(result => {
      if (result === true){
    //delete from backend
    this.employeService.deleteCalendrierVaccinal(object.id).subscribe(data => {
      console.log(data)
      this.dataSource.data.splice(this.dataSource.data.indexOf(object),1)
      this.dataSource._updateChangeSubscription()  
      this.popupService.success("Le calendrier vaccinal a été supprimé avec succès");
    },
    error => this.popupService.danger("Le calendrier vaccinal n'a pas été supprimé"));
  }
});
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
    vaccinSelected : any = null;
  
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

      if(this.data.edit === "true"){
        this.addForm = this.formBuilder.group({
          id : [this.data.object.id],
          createdBy: [this.data.object.createdtBy],                  
          nombreInjection: [this.data.object.nombreInjection,Validators.required],
          duree: [this.data.object.duree,Validators.required],
        });
      }else{
      this.addForm = this.formBuilder.group({
        nombreInjection: ['',Validators.required],
        duree: ['',Validators.required],
        vaccinn: ['',Validators.required]
      });
      } 
    }
  
    InitialiserVaccin(value){
      this.employeService.getVaccinById(value).subscribe(
        data => {
            this.vaccinSelected = data;
            console.log(this.vaccinSelected)             
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
    private activitesMedicalesService: ActivitesMedicalesService,
    private popupService: PopupService,private dialogsService: DialogsService) {this.calendrierVaccinal = data.calendrierVaccinal    }

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
          this.popupService.success("L'injection vaccinale a été ajouté avec succès"); 
        },
        error => this.popupService.danger("L'injection vaccinale n'a pas été ajouté")); 
      }
    });
   }

   delete(object){
    this.dialogsService
    .confirm('Confirmation', 'Voulez-vous vraiment supprimer cette injection vaccinale?')
    .subscribe(result => {
      if (result === true){
    //delete from backend
    this.employeService.deleteInjection(object.id).subscribe(data => {
      console.log(data)
      this.dataSource.data.splice(this.dataSource.data.indexOf(object),1)
      this.dataSource._updateChangeSubscription()  
      this.popupService.success("L'injection vaccinal a été supprimé avec succès");
    },
    error => this.popupService.danger("L'injection vaccinal n'a pas été supprimé"));
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