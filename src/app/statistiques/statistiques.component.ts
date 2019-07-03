import { ActivitesMedicalesService } from './../services/activites-medicales.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ActivatedRoute } from '@angular/router';
import { AdministrationService } from './../services/administration.service';
import { Component, OnInit, Inject } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  addForm: FormGroup;
  
  constructor(public dialog: MatDialog,private administrationService: AdministrationService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    // this.addForm = this.formBuilder.group({
    //   s: ['',Validators.required],
    // });
  }
    
    onSubmitt() {
    if (!this.addForm.invalid){
      // console.log(this.addForm.value.s)
      // this.data = this.addForm.value;
      // this.dialogRef.close(this.data);
      this.administrationService.genererRapport(this.addForm.value).subscribe(
        data => {
          //  console.log(data.s);
          //  this.downloadFile(data.s);
        },
        error => console.log(error)  
      );
      }
    }

    onSubmit() {
      let dialogRef = this.dialog.open(GenererRapportComponent, {
        width: '30%',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined){
          this.administrationService.genererRapport(result).subscribe(
            data => {
            },
            error => console.log(error)  
          );
        }
      });
     }
  
  genererRapportt() {
    if (!this.addForm.invalid){
        this.administrationService.genererRapport("").subscribe(
          data => {
          },
          error => console.log(error)  
        );
      }
   }
    downloadFile(s : String) {
     // const blob = new Blob([data], { type: 'text/csv' });
     // const url= window.URL.createObjectURL(blob);
    //  window.open("http://localhost:8080/"+s);
    //  var url = "http://localhost:8080/"+s;
    //  var url = "\\192.168.43.47\Users\Public\text.pdf";
    //  window.open(url);

    // const doc = new jsPDF();
    // doc.text('azeaze',10,10);
    // doc.save('Text.pdf');
   }
}



  // Générer Rapport
  
  @Component({
    selector: 'app-generer-rapport',
    templateUrl: './generer-rapport.component.html',
    styleUrls: ['./generer-rapport.component.css']
  })
  export class GenererRapportComponent implements OnInit {
  
    addForm: FormGroup;
    // dateAujourdhuit = new FormControl(new Date()); 
    
  
    vaccins :any [];
  
    constructor(public dialogRef: MatDialogRef<GenererRapportComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private formBuilder: FormBuilder) {}
  
    ngOnInit() {
      this.addForm = this.formBuilder.group({
        s: ['',Validators.required],
        dateDebut: ['',Validators],
        dateFin: ['',Validators],
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