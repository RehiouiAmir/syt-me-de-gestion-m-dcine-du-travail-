import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services imporation 
import { EmployeService } from '../services/employe.service';
import { MatDialog, ErrorStateMatcher } from '@angular/material';
import { AjouterNvEmployeComponent } from 'src/app/employes/employes.component';
import { FormControl } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-dm-informations-generales',
  templateUrl: './dm-informations-generales.component.html',
  styleUrls: ['./dm-informations-generales.component.css']
})
export class DmInformationsGeneralesComponent implements OnInit {

    id_employe : number;
    employeInfos : any = '';
    posteActuel : any; 

    constructor(private route: ActivatedRoute, private employeService: EmployeService, public dialog: MatDialog,private popupService: PopupService) {
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
    } 
  
    update(edit: any,object) { 
      console.log(object) 
      let dialogRef = this.dialog.open(AjouterNvEmployeComponent, {
        width: '70%',
        data: {
          id_employe : this.id_employe,
          edit : edit, object : object,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined){
          console.log(result)
          //change in backend
          this.employeService.updateEmploye(result.id,result).subscribe(data => {
              this.employeInfos = data;
              this.popupService.success("L'employé a été modifié avec succès");                            
          },
          error => this.popupService.danger("L'employé n'a pas été modifié"));
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
  
