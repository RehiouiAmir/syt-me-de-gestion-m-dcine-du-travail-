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

@Component({
  selector: 'app-dm-arret-travail',
  templateUrl: './dm-arret-travail.component.html',
  styleUrls: ['./dm-arret-travail.component.css']
})
export class DmArretTravailComponent implements OnInit {

  private id_employe: number;
  
    /* Table Structure */
  
    displayedColumns: string[] = ['code','motif','dateDebut','dateFin','medecin','Action-details','Action-edit','Action-delete'];
    dataSource : MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(private route: ActivatedRoute, private employeService: EmployeService, public dialog: MatDialog) { 
      this.id_employe = Number(this.route.snapshot.paramMap.get('id'));
    }
  
    ngOnInit() {
  
      this.employeService.getAllArretTravailsEmploye(this.id_employe).subscribe(
        data => {
          console.log(data)
          this.dataSource = new MatTableDataSource<any>(data);
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
   
    add() {
      let dialogRef = this.dialog.open(AjouterArretTravailComponent, {
        width: '70%',
        data: {}
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
  
  accidentTravails = [
    {code:'1' ,dateAccident :'02-03-2018' ,lieuAccident : 'intern' ,natureAccident : 'grave'},
    {code:'2' ,dateAccident :'06-03-2019' ,lieuAccident : 'intern' ,natureAccident : 'moyenne'},
    {code:'3' ,dateAccident :'02-11-2017' ,lieuAccident : 'intern' ,natureAccident : 'grave'},
  ]

  maladiesProfessionnelles = [
    {code:'1' ,typeMaladie :'professionnelle' ,designation : 'Otite moyenne' },
    {code:'2' ,typeMaladie :'professionnelle' ,designation : 'Onychomycose' },
    {code:'3' ,typeMaladie :'professionnelle', designation : 'Le mal de gorge' },
  ]

  maladies= [
    {code:'1' ,typeMaladie :'Générale' ,designation : 'Otite moyenne' },
    {code:'2' ,typeMaladie :'Congenitale' ,designation : 'Onychomycose' },
    {code:'3' ,typeMaladie :'Générale' ,designation : 'Le mal de gorge' },
  ]
  
  
  constructor(public dialogRef: MatDialogRef<AjouterArretTravailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder) {}

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      motifArret: ['', Validators.required],
      dateDebut: [this.dateAujourdhuit.value,Validators.required],
      dateFin: ['',Validators.required],
      observation: [''], 
      accident: [''],
      maladie: ['']
    });
  }

  // close dialog  ajouter-arret-travail
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.addForm.invalid){
      this.data = this.addForm.value;
      console.log(this.data)
      this.dialogRef.close();
      }
  }

}