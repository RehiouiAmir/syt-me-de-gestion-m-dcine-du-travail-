import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from 'src/app/services/employe.service';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { PopupService } from 'src/app/services/popup.service';
import { DialogsService } from 'src/app/dialogs/dialogs.service';

@Component({
  selector: 'app-dm-arret-travail',
  templateUrl: './dm-arret-travail.component.html',
  styleUrls: ['./dm-arret-travail.component.css']
})
export class DmArretTravailComponent implements OnInit {

  private id_employe: number;
  employeInfos : any = null;
  posteActuel : any = null;  
  private arreTrvails: any[];
  
    /* Table Structure */
  
    displayedColumns: string[] = ['motif','dateDebut','dateFin','medecin','Action-details','Action-edit','Action-delete'];
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
      
      this.employeService.getAllArretTravailsByEmployeId(this.id_employe).subscribe(
        data => {
          console.log(data)
          this.arreTrvails = data;
          this.dataSource = new MatTableDataSource<any>(this.arreTrvails);
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

    // Operation Add, Edit, Delet
   
    add(edit: any) {
      let dialogRef = this.dialog.open(AjouterArretTravailComponent, {
        width: '70%',
        data: {
          id_employe : this.id_employe,
          edit :edit,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined){
          console.log(result)
          //change in backend
          if(result.motif != 'Accident de travail' &&
            result.motif != 'Maladie non professionnelle'&& 
            result.motif != 'Maladie professionnelle'){
              this.employeService.creatArretTrvail(this.id_employe,result).subscribe(data => {
                this.dataSource.data.push(data)
                this.dataSource._updateChangeSubscription() 
                this.popupService.success("L'arrêt de travail a été ajouté avec succès");
              },
              error => this.popupService.danger("L'arrêt de travail n'a pas été ajouté")); 
            }else if (result.motif === 'Accident de travail' ){
              this.employeService.creatArretTravailAccidentTravail(this.id_employe,result.accidentTravail.accident.id,result).subscribe(data => {
                this.dataSource.data.push(data)
                this.dataSource._updateChangeSubscription()
                this.popupService.success("L'arrêt de travail a été ajouté avec succès"); 
              },
              error => this.popupService.danger("L'arrêt de travail n'a pas été ajouté"));             
            }else {
              console.log()
              this.employeService.creatArretTravailMaladie(this.id_employe,result.maladies.maladie.id,result).subscribe(data => {
                console.log(data)                
                this.dataSource.data.push(data)
                this.dataSource._updateChangeSubscription()
                this.popupService.success("L'arrêt de travail a été ajouté avec succès");
              },
              error => this.popupService.danger("L'arrêt de travail n'a pas été ajouté"));  
            }
        }
      });
     }

     update(edit: any,object) {  
      let dialogRef = this.dialog.open(AjouterArretTravailComponent, {
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
          this.employeService.updateArretTrvail(this.id_employe,result.id,result).subscribe(data => {
            this.popupService.success("L'arrêt de travail a été modifié avec succès");            
            this.employeService.getAllArretTravailsByEmployeId(this.id_employe).subscribe(
              data => {
                console.log(data)
                this.arreTrvails = data;
                this.dataSource = new MatTableDataSource<any>(this.arreTrvails);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              error => console.log(error)  
            );  
          },
          error => this.popupService.danger("L'arrêt de travail n'a pas été modifié")); 
        }
      });
    }
    delete(object) { 
      this.dialogsService
      .confirm('Confirmation', 'Voulez-vous vraiment supprimer cet arrêt de travail?')
      .subscribe(result => {
        if (result === true){
        //delete from backend
            this.employeService.deleteArretTrvail(this.id_employe,object.id).subscribe(data => {
              console.log(data)
              this.dataSource.data.splice(this.dataSource.data.indexOf(object),1)
              this.dataSource._updateChangeSubscription()  
              this.popupService.success("L'arrêt de travail a été supprimé avec succès");
            },
            error => this.popupService.danger("L'arrêt de travail n'a pas été supprimé"));
          }
        });
    }

    details(object){
        let dialogRef = this.dialog.open(DetailsArretTravailComponent, {
        width: '50%',
        data: {object : object}
      });
    }
}


@Component({
  selector: 'app-ajouter-arret-travail',
  templateUrl: './ajouter-arret-travail.component.html',
  styleUrls: ['./ajouter-arret-travail.component.css']
})
export class AjouterArretTravailComponent implements OnInit {

  addForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date()); 
  
  accidentTravails : any [] =[];
  
  maladiesProfessionnelles : any []= [];

  maladies: any []= [];
  
  
  
  
  constructor(public dialogRef: MatDialogRef<AjouterArretTravailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, private employeService: EmployeService,) {}

  ngOnInit() {
    this.employeService.getAllAntecedentsAccidentsTravailByEmployeId(this.data.id_employe).subscribe(
      data => {
        this.accidentTravails = data;
      },
      error => console.log(error)  
    );

    this.employeService.getAllAntecedentsMaladiesByEmployeId(this.data.id_employe).subscribe(
      data => {
        console.log(data)
        for(let i of data){
          if(i.maladie.type ==='Professionnelle') {
            this.maladiesProfessionnelles.push(i);
          }else{
            this.maladies.push(i)
          }
        }
      },
      error => console.log(error)  
    );

    if (this.data.edit === 'true'){
      var dateDebut = new FormControl(new Date(this.data.object.dateDebut));  
      var dateFin : any =  new FormControl();
      if(this.data.object.dateFin != null){dateFin = new FormControl(new Date(this.data.object.dateFin));}      
      else{dateFin = this.dateAujourdhuit}         
      this.addForm = this.formBuilder.group({
        id: [this.data.object.id],
        motif:  [this.data.object.motif, Validators.required],
        dateDebut: [dateDebut.value,Validators.required],
        dateFin: [dateFin.value,Validators.required],
        observation: [this.data.object.observation],
        accidentTravail:[this.data.object.accident],
        maladies: [this.data.object.maladie]
      });
    }else{
        this.addForm = this.formBuilder.group({
        motif: ['', Validators.required],
        dateDebut: [this.dateAujourdhuit.value,Validators.required],
        dateFin: ['',Validators.required],
        observation: [''], 
        accidentTravail: [''],
        maladies: ['']
      });
    }
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

// details 
@Component({
  selector: 'app-details-arret-travail',
  templateUrl: './details-arret-travail.component.html',
  styleUrls: ['./details-arret-travail.component.css']
})
export class DetailsArretTravailComponent implements OnInit {
 
  constructor(public dialogRef: MatDialogRef<AjouterArretTravailComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() { }

  // close dialog  ajouter-arret-travail
  onNoClick(): void {
    this.dialogRef.close();
  }

}