import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { User } from '../../core/models/User';
import { UserService } from '../../core/services/user/user-service';
import {  MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register-component',
  imports: [FormsModule, CommonModule, RouterLink, MatIconModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  role: string;
  errMsg: string | null;
  passwordMatch: boolean;
  user: User;
  isSubmitting: boolean;
  isStrongPassword: boolean;
  seePassword: boolean;
  seeConfirmPassword: boolean;

  constructor(private userService: UserService, private router: Router){
    this.name = "";
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
    this.phoneNumber = "";
    this.role = "";
    this.errMsg = "";
    this.passwordMatch = true;
    this.user = new User("","","","","","");
    this.isSubmitting = false;
    this.isStrongPassword = false;
    this.seePassword = false;
    this.seeConfirmPassword = false;
  }

  
  checkStrongPassword(value: string): boolean {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(value);
  }

  onPasswordChange(): void{
    if(this.checkStrongPassword(this.password)){
      this.isStrongPassword = true;
    }
    else{
      this.isStrongPassword = false;
    }
  }

  onConfirmPasswordChange(): void{
    this.passwordMatch = this.password===this.confirmPassword;
  }

  showPassword(){
    this.seePassword = !this.seePassword;
  }

  showConfirmPassword(){
    this.seeConfirmPassword = !this.seeConfirmPassword;
  }

  isValidPhoneNumber(value: string): boolean {
    const regex = /^(\+\d{1,2}\s?)?\d{10}$/;
    return regex.test(value);
  } 

  onPhoneNumberChange(): void{
    if(!this.isValidPhoneNumber(this.phoneNumber)){
      this.errMsg = "*Please enter a valid mobile number.";
    }
  }

  onSubmit(){
    if(!this.email || 
      !this.name || 
      !this.password || 
      !this.confirmPassword || 
      !this.role || 
      !this.phoneNumber){
        this.errMsg = "*All fields are required"
      }

      this.user = new User(this.name,this.email,this.password,this.confirmPassword,this.phoneNumber,this.role);
      console.log("User Data from register component : ",this.user);
      this.userService.register(this.user).subscribe({
        next: () =>{
          this.isSubmitting = true;
          this.errMsg = null;
          this.router.navigate(["/login"]);
        },
        error: (err) =>{
          this.errMsg = "*"+err.error;
          console.log("Error ",err.error);
        }
      })
  }
}
