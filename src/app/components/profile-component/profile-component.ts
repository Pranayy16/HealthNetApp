import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { User } from '../../core/models/User';
import { UserService } from '../../core/services/user/user-service';
import { TokenService } from '../../core/services/token-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-component',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css',
})

export class ProfileComponent {
  user: User = new User("","","","","","");
  errMsg: string;
  lastName: string | undefined;
  nameLogo: string | undefined;
  constructor(private authService: AuthService, private tokenService: TokenService, private userService: UserService, private router: Router){
    this.errMsg = "";
    this.getUserDetails();
  }

  getUserDetails(){
    this.userService.getUserData(this.tokenService.getUserId()).subscribe({
      next: (response: any)=>{
        console.log("Response : ",response);
        this.user.Name = response?.name;
        this.user.Email = response?.email;
        this.user.Phone = response?.phone;
        this.user.RoleName = response?.roleName;
        this.errMsg = "";
        this.setNameLogo();
      },
      error: (err)=>{
        this.errMsg = err.error;
      }
    })
  }

  setNameLogo(): void {
    const firstName = this.user?.Name?.trim();
    const lastName = this.lastName?.trim();

    if (firstName && lastName) {
      this.nameLogo =
        firstName.charAt(0).toUpperCase() +
        lastName.charAt(0).toUpperCase();
    }
    else if(firstName){
      this.nameLogo = firstName.charAt(0).toUpperCase();
    } else {
      this.nameLogo = '';
    }
    console.log("First Name ",firstName);
    console.log("Name logo ",this.nameLogo);
  }

  getLastName(){
    this.lastName = this.user.Name.split(" ").at(1);
  }

  onUpdateProfile(){
    this.router.navigate(["/update"]);
  }

  deleteAccount(){
    this.userService.deleteUserAccount(this.tokenService.getUserId());
  }

}
