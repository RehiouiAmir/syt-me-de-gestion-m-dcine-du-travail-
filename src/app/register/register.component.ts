import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { AdministrationService } from './../services/administration.service';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles : any[] = [];
  rolesString : string[];

  constructor(private authService: AuthService,public dialogRef: MatDialogRef<RegisterComponent>,
    private administrationService : AdministrationService) { }
  
  
  ngOnInit() { 
    this.administrationService.getRoles().subscribe(
      data => {
        console.log(data) 
        this.roles = data;      
      },
      error => console.log(error)  
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.form);
    this.rolesString = ['user'];
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.rolesString);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
