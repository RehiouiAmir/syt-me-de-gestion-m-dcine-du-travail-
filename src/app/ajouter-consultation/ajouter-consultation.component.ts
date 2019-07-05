import { AdministrationService } from './../services/administration.service';
import { TokenStorageService } from './../auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AjouterSoinsComponent } from 'src/app/dm-soins/dm-soins.component';
import { AjouterExamenComplementaireComponent } from 'src/app/ajouter-examen-complementaire/ajouter-examen-complementaire.component';
import { AjouterOrientationMedicaleComponent } from 'src/app/ajouter-orientation-medicale/ajouter-orientation-medicale.component';
import { AjouterOrdonnanceComponent } from 'src/app/ajouter-ordonnance/ajouter-ordonnance.component';
import { EmployeService } from 'src/app/services/employe.service';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-ajouter-consultation',
  templateUrl: './ajouter-consultation.component.html',
  styleUrls: ['./ajouter-consultation.component.css']
})
export class AjouterConsultationComponent implements OnInit {

  private id_employe: number;
  natureConsultations : any[];
  dateAujourdhuit = new FormControl(new Date());  
  firstFormGroup: FormGroup;
  private consultation: any;
  user: any;
  userId: number;
  employeInfos : any;
  medecinInfo : any;
  posteActuel : any; 
  
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

  constructor(private route: ActivatedRoute,private _formBuilder: FormBuilder,
              public dialog: MatDialog,private employeService: EmployeService,
              private administrationService : AdministrationService,
              private tokenStorage: TokenStorageService) {
                this.id_employe = Number(this.route.snapshot.paramMap.get('id'));                
              }

  

  onSubmitFirst(){
    if (!this.firstFormGroup.invalid){ 
      this.employeService.creatConsultation(this.id_employe,this.firstFormGroup.value).subscribe(result =>{
        console.log(result)      
       this.consultation =result;
       this.employeService.getConsultationByConsultationId(this.consultation.id).subscribe(
        data => {
          this.dataSourceSoins = new MatTableDataSource<any>(data['soins']);
          this.dataSourceExamens = new MatTableDataSource<any>(data['examenComplementaires']);
          this.dataSourceOrientations = new MatTableDataSource<any>(data['orientationMedicales']); 
          this.dataSourceMedicaments = new MatTableDataSource<any>([]);                    
        },
       error => console.log(error));
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
    width: '80%',
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

public ageFromBirthdate(birthdate: any): number {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if(m<0 || (m === 0 && today.getDate() < birth.getDate())) {
    age --;
  }
  return age;
}

genererOrdonnance() {

  var doc = new jsPDF('p','pt', 'a5');

  doc.addImage(this.imgD, 'JPEG',40,30,50,50);

  var entreprise = "SONATRACH";
  var departement = this.posteActuel.posteTravail.departement.designation;
  var site = this.posteActuel.posteTravail.departement.siteAffectation.designation;
  var medecin = this.user.name;
  var title = "ORDONNANCE";
  var nomEmploye = this.employeInfos.nom + " " + this.employeInfos.prenom;
  var age = this.ageFromBirthdate(this.employeInfos.dateNaissance);
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  doc.text(40,92,entreprise);
  doc.setFontSize(10);
  doc.text(140, 45, "DEPARTEMENT");
  doc.text(220, 45, ":");
  doc.text(230, 45, departement);
  doc.text(140, 60, "SITE");
  doc.text(220, 60, ":");
  doc.text(230, 60, site);
  doc.text(140, 75, "MEDECIN");
  doc.text(220, 75, ":");
  doc.text(230, 75, medecin);
  doc.setFontSize(18);
  doc.setFontType("bold");
  doc.text(145, 130, title);
  doc.setFontSize(11);
  
  doc.text(50, 175, "Nom et prénom :");
  doc.setFontType("normal");
  doc.text(140, 175, nomEmploye);

  doc.setFontType("bold");
  doc.text(50, 195, "Date : ");
  doc.setFontType("normal");
  const todayy = new Date();
  const d = todayy.getDay() + "/" + todayy.getMonth() + "/" + todayy.getFullYear();
  doc.text(120, 195, d);

  doc.setFontType("bold");
  doc.text(220, 195, "Age :");
  doc.setFontType("normal");
  doc.text(260, 195, age+"");

  var l = this.dataSourceMedicaments.data;
  var _i = 0;
  for (let i in l) {
    doc.text(100, 230 + (_i*25), l[i].medicament.designation+"   "+ l[i].quantite+"   "+ l[i].posage);
    _i += 1;
  }

  // let list = ["Médicament", "2 fois par jours", "Avant de manger"];  
  // for (var _i = 0; _i < 8; _i++) {
  //   doc.text(80, 220 + (_i*25), list[0]+",   "+ list[1]+",   "+ list[2]);
  // }

  doc.setFontType("bold");
  doc.text(50, 450, "Observation :");
  var splitTitle = doc.splitTextToSize("Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum", 310);
  doc.setFontType("normal");
  doc.text(60, 470, splitTitle);
  doc.save('test.pdf');
}


private imgD: string;

ngOnInit() {

      if (this.tokenStorage.getToken()) {
        this.administrationService.getUserByUsername(this.tokenStorage.getUsername()).subscribe(
          data => {
            this.user = data;
            console.log(this.user);
            this.administrationService.getEmployeByUserId(data.id).subscribe(
              data => {
                this.medecinInfo = data;
                console.log(this.medecinInfo);
                for(var i in this.medecinInfo.employe_posteTravails){
                  if (this.medecinInfo.employe_posteTravails[i].actuel === true){
                    this.posteActuel = this.medecinInfo.employe_posteTravails[i];
                  }
                }
              },
              error => console.log(error)  
            );
          },
          error => console.log(error)  
        );
      }

      this.employeService.getEmployeById(this.id_employe).subscribe(
        data => {
          this.employeInfos = data;
        },
        error => console.log(error)  
      );


  
      this.employeService.getAllNatureConsultations().subscribe(
        data => {
          console.log(data) 
          this.natureConsultations = data;      
        },
        error => console.log(error)  
      );
  
      this.firstFormGroup = this._formBuilder.group({
        type: ['', Validators.required],
        heureArrivee: [this.dateAujourdhuit.value, Validators.required],
        natureConsultation: ['', Validators.required],
        conclusionMedicale: [''],
        conclusionProfessionnelle: [''],
        observation: [''], 
      });
  
      this.imgD = 'data:image/png;base64,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AIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSRCQAAAIA0kQkAAACANJEJAAAAgDSR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TAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApIlMAAAAAKSJTAAAAACkiUwAAAAApK0ZmcqZPQEAAAAA69F/2Z/qstLKuefMK/5MAAAAAMB6lEe2dFlp5dwzmCsDAAAAANblwje6rLRy7umuxhhjjDHGGGOMMcbc9NwTg8UAAAAAgHUbMfdUP1NdAAAAAGA9RCYAAAAA0kQmAAAAANJGRaaI/x/GbZZkRLLM0AAAAABJRU5ErkJggg==';
    }
}