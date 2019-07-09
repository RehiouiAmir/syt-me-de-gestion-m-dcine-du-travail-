import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DateAdapter, MatDialog, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { PopupService } from 'src/app/services/popup.service';
import { UploadFileService } from 'src/app/upload/upload-file.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AdministrationService } from 'src/app/services/administration.service';
import { AjouterExamenComplementaireComponent } from 'src/app/ajouter-examen-complementaire/ajouter-examen-complementaire.component';
import { AjouterOrientationMedicaleComponent } from 'src/app/ajouter-orientation-medicale/ajouter-orientation-medicale.component';
import { AjouterReorientationProfessionnelleComponent } from 'src/app/ajouter-reorientation-professionnelle/ajouter-reorientation-professionnelle.component';
import { AjouterReponseComponent } from 'src/app/ajouter-reponse/ajouter-reponse.component';

@Component({
  selector: 'app-ajouter-visite-medicale',
  templateUrl: './ajouter-visite-medicale.component.html',
  styleUrls: ['./ajouter-visite-medicale.component.css']
})
export class AjouterVisiteMedicaleComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  
  id_employe : number;
  employeInfos : any = '';
  posteActuel : any; 
  posteTravails : any[];
  visite: any;
  
  id: string;
  
  dateAujourdhuit = new FormControl(new Date());

   /* Table Structure | Orientation médicale */
   displayedColumnsOrientations: string[] = ['specialiste','motifOrientation','Action-edit','Action-delete','Action-rapport'];
   dataSourceOrientations : MatTableDataSource<any>;

    /* Table Structure | Orientation médicale */
    displayedColumnsExamens: string[] = ['designation','description','resultat','Action-delete','Action-result'];
    dataSourceExamens : MatTableDataSource<any>;

     /* Table Structure | Orientation médicale */
     displayedColumnsReponse: string[] = ['appareil','interrogation','reponse','Action-delete'];
     dataSourceReponse : MatTableDataSource<any>;

    constructor(private route: ActivatedRoute,
                private _formBuilder: FormBuilder,
                private dateAdapter: DateAdapter<Date>, private employeService: EmployeService, 
                public dialog: MatDialog,private administrationService : AdministrationService,
                private uploadService: UploadFileService,private tokenStorage: TokenStorageService,
                private popupService: PopupService,)          
      { this.id_employe = Number(this.route.snapshot.paramMap.get('id'));
    
      this.dateAdapter.setLocale('fr'); 
      this.id = this.route.snapshot.paramMap.get('id');}
  
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
      this.employeService.getAllPosteTravails().subscribe(
        data => {
          console.log(data) 
          this.posteTravails = data;      
        },
        error => console.log(error)  
      );
      
      this.firstFormGroup = this._formBuilder.group({
        type: ['', Validators.required],
        heureArrivee: [this.dateAujourdhuit.value,Validators.required],
        etat:['En attend']
      });
      this.secondFormGroup = this._formBuilder.group({
        ab: [''],
        auditionD: [''],
        auditionG: [''],
        bmi: [''],
        cc: [''],
        ph: [''],
        poids: [''],
        sg: [''],
        suc: [''],
        taille: [''],
        th: [''],
        tt: [''],
        tt_th: [''],
        urine: [''],
        visionAvecCorCD: [''],
        visionAvecCorCG: [''],
        visionAvecCorLD: [''],
        visionAvecCorLG: [''],
        visionAvecCorPD: [''],
        visionAvecCorPG: [''],
        visionSansCorCD: [''],
        visionSansCorCG: [''],
        visionSansCorLD: [''],
        visionSansCorLG: [''],
        visionSansCorPD: [''],
        visionSansCorPG: [''], 
      });
      this.thirdFormGroup = this._formBuilder.group({
        fonctionCirculatoire: [''],
        fonctionMotrice:  [''],
        fonctionRespiratoire:  [''],
      });
      this.fourthFormGroup = this._formBuilder.group({
        resultat:['',Validators.required],
        conclusionProfessionnelle: [''],
        etat:['Accomplie']        
      });
    }

    onSubmitFirst(){
      if (!this.firstFormGroup.invalid){ 
        this.employeService.creatVisite(this.id_employe,this.firstFormGroup.value).subscribe(result =>{
          console.log(result)    
          this.popupService.success("La visite médicale a été ajouté avec succès");                                        
         this.visite =result;
         this.employeService.getVisiteByVisiteId(this.visite.id).subscribe(
          data => {
            this.dataSourceExamens = new MatTableDataSource<any>(data['examenComplementaires']);
            this.dataSourceOrientations = new MatTableDataSource<any>(data['orientationMedicales']); 
          },
         error => console.log(error));
        },
        error => this.popupService.danger("La visite médicale n'a pas été ajouté")); 
      }
      
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
              this.employeService.creatExamenComplementaireVisite(this.visite.id,result).subscribe(data => {
              this.popupService.success("L'examen complémentaire a été ajouté avec succès");                               
              this.visite.examenComplementaires= data
              this.dataSourceExamens.data.push(data)
              this.dataSourceExamens._updateChangeSubscription()
            },
            error => this.popupService.danger("L'examen complémentaire n'a pas été ajouté")); 
          }
      });
    }
    
    deleteExamen(object) { 
      //delete from backend
        this.employeService.deleteExamenComplementaire(object.id).subscribe(data => {
          console.log(data)
          this.dataSourceExamens.data.splice(this.dataSourceExamens.data.indexOf(object),1)
          this.dataSourceExamens._updateChangeSubscription()  
          this.popupService.success("L'examen complémentaire a été supprimé avec succès");
        },
        error => this.popupService.danger("L'examen complémentaire n'a pas été supprimé"));
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
              this.employeService.creatOrientationMedicaleVisite(this.visite.id,result).subscribe(data => {
              this.popupService.success("L'orientation médicale a été ajouté avec succès");                               
              this.visite.orientationMedicales= data
              this.dataSourceOrientations.data.push(data)
              this.dataSourceOrientations._updateChangeSubscription() 
            },
            error => this.popupService.danger("L'orientation médicale n'a pas été ajouté")); 
          }
      });
     }
    
     deleteOrientation(object){
      //delete from backend
      this.employeService.deleteOrientationMedicales(object.id).subscribe(data => {
        console.log(data)
        this.dataSourceOrientations.data.splice(this.dataSourceOrientations.data.indexOf(object),1)
        this.dataSourceOrientations._updateChangeSubscription()  
        this.popupService.success("L'orientation médicale a été supprimé avec succès");
      },
      error => this.popupService.danger("L'orientation médicale n'a pas été supprimé"));
     }

     addReorientation(edit,posteActuel) {
       console.log(posteActuel)
      let dialogRef = this.dialog.open(AjouterReorientationProfessionnelleComponent, {
        width: '50%',
        data: {edit :edit,
              posteActuel : posteActuel}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined){
          console.log(result)
          //change in backend
            this.employeService.creatReorientation(this.visite.id,result).subscribe(data => {
            this.popupService.success("La réorientation professionnelle a été ajouté avec succès");                               
            this.visite.reorientationProfessionnelle= data
          },
          error => this.popupService.danger("La réorientation professionnelle n'a pas été ajouté")); 
        }
    });
    }

    addReponse(edit) {
     let dialogRef = this.dialog.open(AjouterReponseComponent, {
       width: '50%',
       data: {edit :edit}
     });
     dialogRef.afterClosed().subscribe(result => {
       if (result !== undefined){
         console.log(result)
         //change in backend
           this.employeService.creatReponse(this.visite.id,result.interrogatoire.id,result).subscribe(data => {
           this.popupService.success("La réponse a été ajouté avec succès");                               
           this.visite.reorientationProfessionnelle= data
         },
         error => this.popupService.danger("La réponse n'a pas été ajouté")); 
       }
   });
  }
     onSubmitFinale(){
      if (!this.fourthFormGroup.invalid){ 
        console.log(this.secondFormGroup.value)
        this.employeService.creatExamenBiometrique(this.visite.id,this.secondFormGroup.value).subscribe(result =>{
          this.visite.examenBiometriques =result;
        },
          error => console.log(error))
        this.employeService.creatExplorationFoctionnelle(this.visite.id,this.thirdFormGroup.value).subscribe(result =>{
          this.visite.explorationFonctionnelle =result;
        },
        error => console.log(error))
                
        console.log(this.visite)
        this.visite.resultat = this.fourthFormGroup.value.resultat,
        this.visite.conclusionProfessionnelle = this.fourthFormGroup.value.conclusionProfessionnelle,
        this.visite.etat = this.fourthFormGroup.value.etat,        
        this.employeService.updateVisite(this.visite.id,this.visite).subscribe(result =>{
          console.log(result)    
        this.popupService.success("La visite médicale a été conclu avec succès -- Etat : Accomplie");                                        
         this.visite =result;
        },
        error => this.popupService.danger("La visite médicale n'a pas été conclu -- Etat : En attend")); 
      }
    }
}
