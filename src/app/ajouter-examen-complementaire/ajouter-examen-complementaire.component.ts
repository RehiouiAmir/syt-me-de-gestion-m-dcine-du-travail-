import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UploadFileService } from './../upload/upload-file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-ajouter-examen-complementaire',
  templateUrl: './ajouter-examen-complementaire.component.html',
  styleUrls: ['./ajouter-examen-complementaire.component.css']
})
export class AjouterExamenComplementaireComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  documentId: number;

  constructor(public dialogRef: MatDialogRef<AjouterExamenComplementaireComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder,
    private uploadService: UploadFileService) { }

    ngOnInit() {
      if(this.data.edit === 'true'){
        var date = new FormControl()
        if(this.data.object.date != null){
          date = new FormControl(new Date(this.data.object.date));                   
        }else{
          date= this.dateAujourdhuit;
        }
        this.addForm = this.formBuilder.group({
          id: [this.data.object.id],
          designation: [this.data.object.designation,Validators.required],
          description: [this.data.object.description], 
          date: [date.value],        
          resultat: [this.data.object.resultat],  
        });
      }else{
        this.addForm = this.formBuilder.group({
          designation: ['',Validators.required],
          description: [''], 
          date: [''],        
          resultat: [''],
          documentId: ['']    
        });
      }
    }
  
    // close dialog  ajouter-arret-travail
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onSubmit() {
      if (!this.addForm.invalid){
        this.addForm.value.documentId = this.documentId;
        this.data = this.addForm.value;
        console.log(this.data)
        this.dialogRef.close(this.data);
        }
    }

    selectFile(event) {
      this.selectedFiles = event.target.files;
    }
  
    upload() {
      this.progress.percentage = 0;
  
      this.currentFileUpload = this.selectedFiles.item(0);
      this.uploadService.pushExamenFileToStorage(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.documentId = +event.body;
        }
      });
  
      this.selectedFiles = undefined;
    }

}
