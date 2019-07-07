import { ConvoquerEmployeComponent } from './../rendez-vous/rendez-vous.component';
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

@Component({
  selector: 'app-dm-convocation',
  templateUrl: './dm-convocation.component.html',
  styleUrls: ['./dm-convocation.component.css']
})
export class DmConvocationComponent implements OnInit {

  id_employe : number;
  employeInfos : any = null;
  posteActuel : any = null;  
  
   /* Table Structure */
    
   displayedColumns: string[] = ['objet','date','contenu','infirmier','Action-delete'];
   dataSource : MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   
   constructor(private route: ActivatedRoute,private activitesService : ActivitesMedicalesService,
     private employeService : EmployeService, private administrationService : AdministrationService, public dialog: MatDialog,
     private popupService: PopupService,private dialogsService: DialogsService) { 
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
    this.employeService.getAllConvocationsByEmployeId(this.id_employe).subscribe(
      data => {
        console.log(data)
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
      },
      error => console.log(error)  
    );
  }

  convoquerEmploye() {
    let dialogRef = this.dialog.open(ConvoquerEmployeComponent, {
      width: '50%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
       if (result !== undefined){
        this.administrationService.convoquerEmploye(this.id_employe,result).subscribe(data => {
          this.dataSource.data.push(data)
          this.dataSource._updateChangeSubscription() 
          this.popupService.success("la convocation a été envoyé avec succès");                                                     
        },
        error => this.popupService.danger("La convocation n'a pas été envoyé"));
      }
    });
   }

   delete(object) { 
    this.dialogsService
    .confirm('Confirmation', 'Voulez-vous vraiment supprimer cette La convocation médicale?')
    .subscribe(result => {
      if (result === true){
    //delete from backend
      this.employeService.deleteConvocation(object.id).subscribe(data => {
        console.log(data)
        this.dataSource.data.splice(this.dataSource.data.indexOf(object),1)
        this.dataSource._updateChangeSubscription()  
        this.popupService.success("La convocation médicale a été supprimé avec succès");
      },
      error => this.popupService.danger("La convocation médicale n'a pas été supprimé"));
    }
  });

}
}
