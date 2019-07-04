import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from 'src/app/services/employe.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dm-changement-poste',
  templateUrl: './dm-changement-poste.component.html',
  styleUrls: ['./dm-changement-poste.component.css']
})
export class DmChangementPosteComponent implements OnInit {

  private id_employe: number;
  employeInfos : any = null;
  posteActuel : any = null; 
  private posteHistorique : any [];
  private reorientations : any [];
  
    /* Table Structure */
  
    displayedColumns: string[] = ['posteOccupe','etatPoste','dateOccupation','dateliberation','motif','medecin','Action-details','Action-edit','Action-delete'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

     /* Réorientation Table Structure */
  
     displayedColumnsReorientation: string[] = ['dateReorientation','posteOccupe','posteConseilles','posteDeconseilles','medecin','Action-delete'];
     dataSourceReorientation : MatTableDataSource<any>;
   
     @ViewChild('MatPaginatorReorientation') paginatorReorientation: MatPaginator;
     @ViewChild('MatSortReorientation') sortReorientation: MatSort;
    
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

      this.employeService.getEmployeById(this.id_employe).subscribe(
        data => {
          this.posteHistorique = data.employe_posteTravails;
          console.log(this.posteHistorique);
          this.dataSource = new MatTableDataSource<any>(this.posteHistorique);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => console.log(error)  
      );

      this.employeService.getAllReorientationByEmployeId(this.id_employe).subscribe(
        data => {
          this.reorientations = data;
          console.log(this.reorientations);
          this.dataSourceReorientation = new MatTableDataSource<any>(this.reorientations);
          this.dataSourceReorientation.paginator = this.paginatorReorientation;
          this.dataSourceReorientation.sort = this.sortReorientation;
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

    applyFilterReorientation(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

     // Operation Add, Edit, Delet
   
     add(edit: any) {
      let dialogRef = this.dialog.open(AjouterChangementPosteComponent, {
        width: '70%',
        data: {edit:edit}
      });
      dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined){
            console.log(result)
            //change in backend
            this.employeService.creatChangementPoste(this.id_employe,result.id_posteTravail,result).subscribe(data => {
              this.employeService.getEmployeById(this.id_employe).subscribe(
                data => {
                  this.posteHistorique = data.employe_posteTravails;
                  console.log(this.posteHistorique);
                  this.dataSource = new MatTableDataSource<any>(this.posteHistorique);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
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
            },
            error => console.log(error));
          }
      });
     }
     update(edit: any,object) {  
      let dialogRef = this.dialog.open(AjouterChangementPosteComponent, {
        width: '70%',
        data: {
          id_employe : this.id_employe,
          edit : edit, object : object,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined){
          //change in backend
          this.employeService.updateChangementPoste(result.id,result).subscribe(data => {
            this.employeService.getEmployeById(this.id_employe).subscribe(
              data => {
                this.posteHistorique = data.employe_posteTravails;
                console.log(this.posteHistorique);
                this.dataSource = new MatTableDataSource<any>(this.posteHistorique);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
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
          },
          error => console.log(error)); 
        }
      });
    }
    delete(object) { 
      //delete from backend
        this.employeService.deleteChangementPoste(this.id_employe,object.posteTravail.id).subscribe(data => {
          console.log(data)
          this.dataSource.data.splice(this.dataSource.data.indexOf(object),1)
          this.dataSource._updateChangeSubscription()  
          console.log(object)
          if (object.actuel === true){
            this.posteActuel='';
          }
        },
        error => console.log(error));
      }
}

// Dialog [Modal Ajouter Un Changement de Poste]

@Component({
  selector: 'app-ajouter-changement-poste',
  templateUrl: './ajouter-changement-poste.component.html',
  styleUrls: ['./ajouter-changement-poste.component.css']
})


export class AjouterChangementPosteComponent implements OnInit {

  risquesProfessionnels : any [] =[];

  risquesPostes : any [] = [];

  posteTravails : any [] = [];

  addGlobalForm: FormGroup;
  dateAujourdhuit = new FormControl(new Date());   
  addForm: FormGroup;
  nvRisques: FormArray;
  itemForm: FormGroup; 

constructor(public dialogRef: MatDialogRef<AjouterChangementPosteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, 
              private formBuilder: FormBuilder, private fb: FormBuilder, private employeService: EmployeService) 
  {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });

    this.nvRisques = this.fb.array([]);
  }

ngOnInit() {

    this.employeService.getAllPosteTravails().subscribe(
      data => {
        console.log(data) 
        this.posteTravails = data;      
      },
      error => console.log(error)  
    );
    this.employeService.getAllRisques().subscribe(
      data => {
          console.log(data) 
          this.risquesProfessionnels = data;      
        },
        error => console.log(error)  
    );
  if(this.data.edit === "true"){
    var dateDebut = new FormControl(new Date(this.data.object.dateDebut));  
    var dateFin : any =  new FormControl();
    if(this.data.object.dateFin != null){dateFin = new FormControl(new Date(this.data.object.dateFin));} 
    this.addGlobalForm = this.formBuilder.group({
      id : [this.data.object.id],
      id_posteTravail: [this.data.object.posteTravail, Validators.required],
      dateDebut: [dateDebut.value,Validators.required],
      dateFin: [dateFin.value],
      motif: [this.data.object.motif],
      observation: [this.data.object.observation], 
      risques: [this.data.object.risques],      
    });
  } else{
    this.addGlobalForm = this.formBuilder.group({
      id_posteTravail: ['', Validators.required],
      dateDebut: [this.dateAujourdhuit.value,Validators.required],
      dateFin: [''],
      motif: [''],
      observation: [''], 
      risques: [''],      
    });

    this.addForm.get("items_value").setValue("yes");
    this.addForm.addControl('nvRisques', this.nvRisques);
    this.addGlobalForm.addControl('nvRisques', this.nvRisques);
  } 
}
  

  InitialiserRisque(value){
    this.employeService.getAllRisquesbyPosteId(value).subscribe(
      data => {
          console.log(data) 
          this.risquesPostes = data;      
        },
        error => console.log(error)  
    );
  }


onAddRow() {
  this.nvRisques.push(this.createItemFormGroup());
}

onRemoveRow(rowIndex:number){
  this.nvRisques.removeAt(rowIndex);
}

createItemFormGroup(): FormGroup {
  return this.fb.group({
    designation: ["", Validators.required],
  });
}

onSubmit() {
if (!this.addGlobalForm.invalid){
  for(var i in this.addGlobalForm.value.nvRisques){
    this.addGlobalForm.value.risques = this.addGlobalForm.value.risques+' , '+this.addGlobalForm.value.nvRisques[i].designation;
  }
  this.data = this.addGlobalForm.value;
  console.log(this.data)
  this.dialogRef.close(this.data);
  }
}

// close dialog  ajouter-changement-poste
onNoClick(): void {
this.dialogRef.close();
}

}
