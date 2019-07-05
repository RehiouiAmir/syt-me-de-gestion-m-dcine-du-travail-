import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

// Services imporation 
import { EmployeService } from '../services/employe.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';
import { AjouterOrientationMedicaleComponent } from 'src/app/ajouter-orientation-medicale/ajouter-orientation-medicale.component';
import { AjouterExamenComplementaireComponent } from 'src/app/ajouter-examen-complementaire/ajouter-examen-complementaire.component';
import { AjouterSoinsComponent } from 'src/app/dm-soins/dm-soins.component';
import { Validators } from '@angular/forms';
import { AjouterOrdonnanceComponent } from 'src/app/ajouter-ordonnance/ajouter-ordonnance.component';


@Component({
  selector: 'app-dm-consultation-medicale',
  templateUrl: './dm-consultation-medicale.component.html',
  styleUrls: ['./dm-consultation-medicale.component.css']
})
export class DmConsultationMedicaleComponent implements OnInit {

  private id_employe: number;
  employeInfos : any = null;
  posteActuel : any = null;  
  private consultations: any[];

  /* Table Structure */

  displayedColumns: string[] = ['type','date','nature','medecin','Action-details','Action-edit','Action-delete'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private route: ActivatedRoute, private employeService: EmployeService, public dialog: MatDialog) { 
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
    
    this.employeService.getAllConsultationsByEmployeId(this.id_employe).subscribe(
      data => {
        console.log(data)
        this.consultations = data;
        this.dataSource = new MatTableDataSource<any>(this.consultations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)  
    );
  }

  delete(object){
    //delete from backend
    this.employeService.deleteConsultation(object.id).subscribe(data => {
      console.log(data)
      this.dataSource.data.splice(this.dataSource.data.indexOf(object),1)
      this.dataSource._updateChangeSubscription()  

    },
    error => console.log(error));
  }
  // search table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  update(object) {  
    let dialogRef = this.dialog.open(ModifierConsultationComponent, {
      width: '70%',
      data: {
        id_employe : this.id_employe,
        object : object,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.employeService.getAllConsultationsByEmployeId(this.id_employe).subscribe(
        data => {
          console.log(data)
          this.consultations = data;
          this.dataSource = new MatTableDataSource<any>(this.consultations);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => console.log(error)  
      );
    });
  }

}

@Component({
  selector: 'app-modifier-consultation',
  templateUrl: './modifier-consultation.compnent.html',
  styleUrls: ['./modifier-consultation.compnent.css']
})
export class ModifierConsultationComponent implements OnInit {

  private id_employe: number;
  natureConsultations : any[];
  dateAujourdhuit = new FormControl(new Date());  
  firstFormGroup: FormGroup;
  private consultation: any;
  
   /* Table Structure | Médicaments */
   displayedColumnsMedicaments: string[] = ['designation','quantite','posologie','Action-delete'];
   dataSourceMedicaments : MatTableDataSource<any>;

   /* Table Structure | Soins */
   displayedColumnsSoins: string[] = ['designation','etatActe','dateActeSoin','observation','Action-delete'];
   dataSourceSoins : MatTableDataSource<any>;

   /* Table Structure | Orientation médicale */
   displayedColumnsOrientations: string[] = ['specialiste','motifOrientation','Action-edit','Action-delete','Action-pdf'];
   dataSourceOrientations : MatTableDataSource<any>;

    /* Table Structure | Orientation médicale */
    displayedColumnsExamens: string[] = ['designation','description','resultat','Action-delete'];
    dataSourceExamens : MatTableDataSource<any>;

  constructor(public dialogRef: MatDialogRef<ModifierConsultationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              public dialog: MatDialog,private employeService: EmployeService) {
                this.id_employe = Number(this.route.snapshot.paramMap.get('id'));                
              }

  ngOnInit() {

    this.employeService.getAllNatureConsultations().subscribe(
      data => {
        console.log(data) 
        this.natureConsultations = data;      
      },
      error => console.log(error)  
    );

      this.dataSourceSoins = new MatTableDataSource<any>(this.data.object['soins']);
      this.dataSourceExamens = new MatTableDataSource<any>(this.data.object['examenComplementaires']);  
      this.dataSourceOrientations = new MatTableDataSource<any>(this.data.object['orientationMedicales']);
      if(this.data.object.ordonnance === null){this.dataSourceMedicaments = new MatTableDataSource<any>([]);} 
      else{this.dataSourceMedicaments = new MatTableDataSource<any>(this.data.object['ordonnance']['prescriptions']);}       


      var date = new FormControl(new Date(this.data.object.heureArrivee));                   

      this.firstFormGroup = this._formBuilder.group({
        type: [this.data.object.type, Validators.required],
        heureArrivee: [date.value, Validators.required],
        natureConsultation: [this.data.object.natureConsultation, Validators.required],
        conclusionMedicale: [this.data.object.conclusionMedicale],
        conclusionProfessionnelle: [this.data.object.conclusionProfessionnelle],
        observation: [this.data.object.observation], 
      });
  }

  onSubmitFirst(){
    if (!this.firstFormGroup.invalid){ 
      this.employeService.updateConsultation(this.data.object.employe.id,this.data.object.id,this.firstFormGroup.value).subscribe(result =>{
        console.log(result)      
       this.consultation =result;
      },
      error => console.log(error));
    }
    
  }

// operation add edit delet 
addSoins(edit) {
    let dialogRef = this.dialog.open(AjouterSoinsComponent, {
      width: '70%',
      data: {edit:edit}
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined){
          console.log(result)
          //change in backend
            this.employeService.creatActeSoins(this.consultation.id,result.idActe,result).subscribe(data => {
              console.log(data);
            this.consultation.soins= data
            this.dataSourceSoins.data.push(data)
            this.dataSourceSoins._updateChangeSubscription() 
          },
          error => console.log(error));
        }
    });
}

deleteSoins(object) { 
  //delete from backend
    this.employeService.deleteActeSoin(this.consultation.id,object.acte.id).subscribe(data => {
      console.log(data)
      this.dataSourceSoins.data.splice(this.dataSourceSoins.data.indexOf(object),1)
      this.dataSourceSoins._updateChangeSubscription()  

    },
    error => console.log(error));
}

addExamen(edit) {
  let dialogRef = this.dialog.open(AjouterExamenComplementaireComponent, {
    width: '70%',
    data: {edit :edit}
  });
  dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        console.log(result)
        //change in backend
          this.employeService.creatExamenComplementaire(this.consultation.id,result).subscribe(data => {
            console.log(data);
          this.consultation.examenComplementaires= data
          this.dataSourceExamens.data.push(data)
          this.dataSourceExamens._updateChangeSubscription() 
        },
        error => console.log(error));
      }
  });
}

deleteExamen(object) { 
  //delete from backend
    this.employeService.deleteExamenComplementaire(object.id).subscribe(data => {
      console.log(data)
      this.dataSourceExamens.data.splice(this.dataSourceExamens.data.indexOf(object),1)
      this.dataSourceExamens._updateChangeSubscription()  

    },
    error => console.log(error));
}

 addOrientation(edit) {
  let dialogRef = this.dialog.open(AjouterOrientationMedicaleComponent, {
    width: '70%',
    data: {edit :edit}
  });
  dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        console.log(result)
        //change in backend
          this.employeService.creatOrientationMedicale(this.consultation.id,result).subscribe(data => {
            console.log(data);
          this.consultation.orientationMedicales= data
          this.dataSourceOrientations.data.push(data)
          this.dataSourceOrientations._updateChangeSubscription() 
        },
        error => console.log(error));
      }
  });
 }

 deleteOrientation(object){
  //delete from backend
  this.employeService.deleteOrientationMedicales(object.id).subscribe(data => {
    console.log(data)
    this.dataSourceOrientations.data.splice(this.dataSourceOrientations.data.indexOf(object),1)
    this.dataSourceOrientations._updateChangeSubscription()  

  },
  error => console.log(error));
 }
 addOrdonnance() {
  let dialogRef = this.dialog.open(AjouterOrdonnanceComponent, {
    width: '70%',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        //change in backend
          this.employeService.creatOrdonnance(this.consultation.id,result).subscribe(data => {
            this.consultation.ordonnance= data
            console.log(this.consultation)
            for (var i in result.prescription){
              var medicamentsPer= result.prescription[i].medicamentsPer
              this.employeService.creatPrescription(this.consultation.ordonnance.id,medicamentsPer,result.prescription[i]).subscribe(data => {
                this.consultation.ordonnance.prescriptions= data    
                this.dataSourceMedicaments.data.push(data)
                this.dataSourceMedicaments._updateChangeSubscription() 
                },
                error => console.log(error));
            }
        },
        error => console.log(error));
      }
  });
}

deleteOrdonnance(object){
  //delete from backend
  this.employeService.deleteOrdonnance(object.id).subscribe(data => {
    console.log(data)
    this.dataSourceOrientations.data.splice(this.dataSourceOrientations.data.indexOf(object),1)
    this.dataSourceOrientations._updateChangeSubscription()  
    this.consultation.ordonnance = null;
  },
  error => console.log(error)); 
}
deletePrecription(object){
  //delete from backend
  this.employeService.deletePrescriptionOrdonnance(this.consultation.ordonnance.id,object.medicament.id).subscribe(data => {
    console.log(data)
    this.dataSourceMedicaments.data.splice(this.dataSourceMedicaments.data.indexOf(object),1)
    this.dataSourceMedicaments._updateChangeSubscription()  
  },
  error => console.log(error)); 
}

// close dialog  ajouter-changement-poste
onNoClick(): void {
  this.dialogRef.close();
}

}