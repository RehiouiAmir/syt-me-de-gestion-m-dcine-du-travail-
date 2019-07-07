import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DateAdapter, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { PopupService } from 'src/app/services/popup.service';
import { ViewChild } from '@angular/core';
import { DialogsService } from 'src/app/dialogs/dialogs.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-dm-visite-medicale',
  templateUrl: './dm-visite-medicale.component.html',
  styleUrls: ['./dm-visite-medicale.component.css']
})
export class DmVisiteMedicaleComponent implements OnInit {
  private id_employe: number;
  employeInfos : any = null;
  posteActuel : any = null;  
  private visites: any[];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  imageSource : string;  
  
  id: string;
  
  dateAujourdhuit = new FormControl(new Date());
  
  /* Table Structure */

  displayedColumns: string[] = ['type','date','etat','medecin','Action-details','Action-edit','Action-delete'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private route: ActivatedRoute, private employeService: EmployeService, public dialog: MatDialog,
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
    
    this.employeService.getAllVisiteMedicalesByEmployeId(this.id_employe).subscribe(
      data => {
        console.log(data)
        this.visites = data;
        this.dataSource = new MatTableDataSource<any>(this.visites);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)  
    );
  }

  delete(object){
    this.dialogsService
    .confirm('Confirmation', 'Voulez-vous vraiment supprimer cette consultation médicale?')
    .subscribe(result => {
      if (result === true){
        //delete from backend
        this.employeService.deleteConsultation(object.id).subscribe(data => {
          console.log(data)
          this.dataSource.data.splice(this.dataSource.data.indexOf(object),1)
          this.dataSource._updateChangeSubscription()  
          this.popupService.success("La consultation médicale a été supprimé avec succès");
        },
        error => this.popupService.danger("La consultation médicale n'a pas été supprimé"));
      }
    });
  }
  // search table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  
}
