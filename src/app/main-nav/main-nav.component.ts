import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { FlatTreeControl } from '@angular/cdk/tree';

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
export class MainNavComponent {

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
  

  
  constructor(private breakpointObserver: BreakpointObserver) {
    this.dataSource.data = TREE_DATA;
    this.dataSourceAdmin.data = TREE_DATA_Admin;
  }
  

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  signOut() {
    window.sessionStorage.clear();
  }
}
