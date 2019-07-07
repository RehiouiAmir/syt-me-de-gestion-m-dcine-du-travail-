import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFileService } from './../upload/upload-file.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, ErrorStateMatcher, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Inject } from '@angular/core';
import { environment } from '../../environments/environment';

// Services imporation 
import { EmployeService } from '../services/employe.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { PopupService } from 'src/app/services/popup.service';




@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {

  private id_employe: number;
  dataTable :  any[];
  posteTravails : any[];
  departements : any[];
  societes : any[];
  sites : any[];
  
  /* Table Structure */

  displayedColumns: string[] = ['matricule', 'numCarteChifa','dateNaissance', 'sexe','posteTravail','departement',
                               'site','societe','Action-choose'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private employeService: EmployeService, public dialog: MatDialog,private popupService: PopupService) {
   }

  ngOnInit() {
    
    this.employeService.getAllEmployes().subscribe(
      data => {
        console.log(data)
        this.dataTable = data;
        this.dataSource = new MatTableDataSource<any>(this.dataTable);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

    this.employeService.getAllDepartements().subscribe(
      data => {
        console.log(data) 
        this.departements = data;      
      },
      error => console.log(error)  
    );

    this.employeService.getAllSocietes().subscribe(
      data => {
        console.log(data) 
        this.societes = data;      
      },
      error => console.log(error)  
    );

    this.employeService.getAllSites().subscribe(
      data => {
        console.log(data) 
        this.sites = data;      
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
   
    add(edit) {
      let dialogRef = this.dialog.open(AjouterNvEmployeComponent, {
        width: '70%',
        data: {edit:edit}
      });
    
      dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined){
            console.log(result);
            //change in backend
            this.employeService.createEmploye(result).subscribe(data => {
              this.dataSource.data.push(data)
              this.dataSource._updateChangeSubscription() 
              this.popupService.success("L'employé a été ajouté avec succès");              
            },
            error => this.popupService.danger("L'employé n'a pas été ajouté"));
          }
      });
     }
  
}





/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


// Dialog [Modal Ajouter Nouveau Employe]

@Component({
  selector: 'app-ajouter-nv-employe',
  templateUrl: './ajouter-nv-employe.component.html',
  styleUrls: ['./ajouter-nv-employe.component.css']
})
export class AjouterNvEmployeComponent implements OnInit{

  addForm: FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  documentId: number;
  imageSource : string;    

  constructor(public dialogRef: MatDialogRef<AjouterNvEmployeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, 
              private uploadService: UploadFileService,
              private formBuilder: FormBuilder,private employeService: EmployeService) { }
  
     //  Email control validator

    //  emailFormControl = new FormControl('', [
    //   Validators.email,
    // ]);
  
    // matcher = new MyErrorStateMatcher();

  ngOnInit() {
    if(this.data.edit ==='true'){
      if(this.data.object.file== null){
        this.imageSource = "../../assets/img/pic-user.png";
      } else {
        this.imageSource = environment.fileUrl+this.data.object.file.fileName;            
      }
    } else {
      this.imageSource = "../../assets/img/pic-user.png";      
    }

    if(this.data.edit ==='true'){
      var sexe : any;
      var serviceN : any;
      var date: any;
      if(this.data.object.sexe === true){sexe = "Homme"}else{sexe = "Femme"};
      if(this.data.object.serviceNational === true){serviceN = "OUI"}else{serviceN = "NON"};  
      date = new FormControl(new Date(this.data.object.dateNaissance));  

      this.addForm = this.formBuilder.group({
        id : [this.data.object.id],
        archive : [this.data.object.archive],
        nom: [this.data.object.nom,Validators.required],
        prenom: [this.data.object.prenom,Validators.required],
        code: [this.data.object.code,Validators.required],
        numeroSecuriteSociale: [this.data.object.numeroSecuriteSociale],
        sexe: [sexe,Validators.required],
        dateNaissance: [date.value,Validators.required],
        lieuNaissance: [this.data.object.lieuNaissance,Validators.required],
        situationFamiliale: [this.data.object.situationFamiliale,Validators.required],
        groupeSanguin: [this.data.object.groupeSanguin],
        email: [this.data.object.email,Validators.email],
        adresse: [this.data.object.adresse,Validators.required],
        telephone: [this.data.object.telephone],
        formationScolaire: [this.data.object.formationScolaire],
        formationProfessionnelle: [this.data.object.formationProfessionnelle],
        qualification: [this.data.object.qualification],
        serviceNational: [serviceN,Validators.required],
        travailAntecedent: [this.data.object.travailAntecedent]
      });
      // this.addForm.addControl('emailFormControl', this.emailFormControl);
    }else{
      this.addForm = this.formBuilder.group({
        archive : [false],        
        nom: ['',Validators.required],
        prenom: ['',Validators.required],
        code: ['',Validators.required],
        numeroSecuriteSociale: [''],
        sexe: ['',Validators.required],
        dateNaissance: ['',Validators.required],
        lieuNaissance: ['',Validators.required],
        situationFamiliale: ['',Validators.required],
        groupeSanguin: [''],
        adresse: ['',Validators.required],
        telephone: [''],
        email: ['',Validators.email],
        formationScolaire: [''],
        formationProfessionnelle: [''],
        qualification: [''],
        serviceNational: ['',Validators.required],
        travailAntecedent: [''],
        documentId: ['']
      });
  
      // this.addForm.addControl('emailFormControl', this.emailFormControl);
    }

  }
  
  
  onSubmit() {
    if (!this.addForm.invalid){
      this.addForm.value.documentId = this.documentId;
      console.log(this.addForm);
      if(this.addForm.value.sexe === "Homme"){this.addForm.value.sexe = true}else{this.addForm.value.sexe = false}
      if(this.addForm.value.serviceNational === "OUI"){this.addForm.value.serviceNational = true}else{this.addForm.value.serviceNational = false}      
        this.data = this.addForm.value;
        console.log(this.data)
        this.dialogRef.close(this.data);
      }
  }
    
  // close dialog  ajouter-nv-employe
  onNoClick(): void {
    this.dialogRef.close();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.progress.percentage = 0;
    
        this.currentFileUpload = this.selectedFiles.item(0);
        this.uploadService.pushEmployeImageToStorage(this.currentFileUpload).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.documentId = +event.body;
          }
        });
    
        this.selectedFiles = undefined;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushEmployeImageToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.documentId = +event.body;
      }
    });

    this.selectedFiles = undefined;
  }
  
}