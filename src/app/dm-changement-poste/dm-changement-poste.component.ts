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

@Component({
  selector: 'app-dm-changement-poste',
  templateUrl: './dm-changement-poste.component.html',
  styleUrls: ['./dm-changement-poste.component.css']
})
export class DmChangementPosteComponent implements OnInit {

  private id_employe: number;
  private posteHistorique : any [];
  private reorientations : any [];
  
    /* Table Structure */
  
    displayedColumns: string[] = ['posteOccupe','etatPoste','dateOccupation','dateliberation','motif','medecin','Action-details','Action-edit','Action-delete'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

     /* Réorientation Table Structure */
  
     displayedColumnsReorientation: string[] = ['dateReorientation','posteOccupe','medecin','Action-details','Action-edit','Action-delete'];
     dataSourceReorientation : MatTableDataSource<any>;
   
     @ViewChild('MatPaginatorReorientation') paginatorReorientation: MatPaginator;
     @ViewChild('MatSortReorientation') sortReorientation: MatSort;
    
    constructor(private route: ActivatedRoute, private employeService: EmployeService, public dialog: MatDialog) { 
      this.id_employe = Number(this.route.snapshot.paramMap.get('id'));
    }
  
    ngOnInit() {
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
          this.reorientations = data.employe_posteTravails;
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
   
     add() {
      let dialogRef = this.dialog.open(AjouterChangementPosteComponent, {
        width: '70%',
        data: {}
      });
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
  addForm: FormGroup;
  risques: FormArray;
  itemForm: FormGroup; 

constructor(public dialogRef: MatDialogRef<AjouterChangementPosteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, 
              private formBuilder: FormBuilder, private fb: FormBuilder, private employeService: EmployeService) 
  {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });

    this.risques = this.fb.array([]);
  }

ngOnInit() {

    this.employeService.getAllPosteTravails().subscribe(
      data => {
        console.log(data) 
        this.posteTravails = data;      
      },
      error => console.log(error)  
    );
    
    this.addGlobalForm = this.formBuilder.group({
      posteTravail: ['', Validators.required],
      dateOccupation: ['',Validators.required],
      dateLiberation: [''],
      motif: [''],
      observation: [''], 
    });

    this.addForm.get("items_value").setValue("yes");
    this.addForm.addControl('risques', this.risques);
    this.addGlobalForm.addControl('risques', this.risques);
  }
  

getRisquePosteOccupe(posteTravail : any) : any [] {
  var risquesPosteOccupe : any[] = [];
  var v = 0;  
  for (var i in this.risquesPostes){
    if (this.risquesPostes[i].poste === posteTravail){
      risquesPosteOccupe[v] = this.risquesPostes[i];
      v= v+1;
    }
  }
  return risquesPosteOccupe;
}

onAddRow() {
  this.risques.push(this.createItemFormGroup());
}

onRemoveRow(rowIndex:number){
  this.risques.removeAt(rowIndex);
}

createItemFormGroup(): FormGroup {
  return this.fb.group({
    designation: ["", Validators.required],
  });
}

onSubmit() {
if (!this.addGlobalForm.invalid){
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
