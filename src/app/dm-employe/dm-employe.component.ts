import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dm-employe',
  templateUrl: './dm-employe.component.html',
  styleUrls: ['./dm-employe.component.css']
})
export class DmEmployeComponent implements OnInit {

  id : string ;

  constructor(private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('id');  
  }

  
  ngOnInit() {
  }

}
