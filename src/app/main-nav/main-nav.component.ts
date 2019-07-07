import { RegisterComponent } from './../register/register.component';
import { AdministrationService } from './../services/administration.service';
import { TokenStorageService } from './../auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import { MatTreeFlattener, MatTreeFlatDataSource, MatDialog } from '@angular/material';
import { FlatTreeControl } from '@angular/cdk/tree';
import { environment } from '../../environments/environment';

interface menuNode {
  name: string;
  icon: string;
  link: string;
  children?: menuNode[];
}

const TREE_DATA:menuNode[] = [
  {
    name: 'Activités Médicales',
    icon: 'fa-user-md',
    link: '',
    children: [
      {name: 'Visites Médicales',icon: 'fa-notes-medical',link: 'visites-medicales'},
      {name: 'Consultations Médicales',icon: 'fa-stethoscope',link: 'consultations-medicales'},
      {name: 'Vaccinations',icon: 'fa-syringe',link: 'vaccinations'},
      {name: 'Arrêts de Travail',icon: 'fa-procedures',link: 'arrets-travail'},
      {name: 'Soins Médicaux',icon: 'fa-band-aid',link: 'soins'},
    ]
  }
];

const TREE_DATA_Admin:menuNode[] = [
  {
    name: 'Administration',
    icon: 'fa-cogs',
    link: '',
    children: [
      {name: 'Utilisateurs',icon: 'fa-users-cog',link: 'utilisateurs'},      
      {name: 'Données prédéfinies',icon: 'fa-table',link: 'administration'},
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  icon: string;
  link: string;
  badgeNum: number;
  badgeClass: String;
  level: number;
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  user : any;
  medecinInfo : any;
  posteActuel : any;
  employeInfos : any;
  imageSource : string;  
  roleUser : string ='';  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

 
  private transformer = (node: menuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon: node.icon,
      link: node.link,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeControlAdmin = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSourceAdmin = new MatTreeFlatDataSource(this.treeControlAdmin, this.treeFlattener);
  

  
  constructor(private breakpointObserver: BreakpointObserver,
              private administrationService : AdministrationService,
              private tokenStorage: TokenStorageService,
              public dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;
    this.dataSourceAdmin.data = TREE_DATA_Admin;
  }
  
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.administrationService.getUserByUsername(this.tokenStorage.getUsername()).subscribe(
        data => {
          this.user = data;
          this.roleUser = data.roles[0].name;
          console.log(this.user.roles[0]);
          this.administrationService.getEmployeByUserId(data.id).subscribe(
            data => {
              this.medecinInfo = data;
              console.log(this.medecinInfo);
              if(data.file== null){
                this.imageSource = "../../assets/img/pic-user.png";
              } else {
                this.imageSource = environment.fileUrl+data.file.fileName;            
              }
              for(var i in data.employe_posteTravails){
                if (data.employe_posteTravails[i].actuel === true){
                  this.posteActuel = data.employe_posteTravails[i];
                }
              }
            },
            error => console.log(error)  
          );
        },
        error => console.log(error)  
      );
    }  
  }

  showAccountDetails(){
    let dialogRef = this.dialog.open(RegisterComponent, {
      width: '30%',
      data: {employe : this.medecinInfo, source : "main"}
    });
     dialogRef.afterClosed().subscribe(result => {
       if (result !== undefined){
         console.log(result);
       }
     });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  signOut() {
    window.sessionStorage.clear();
  }
}
