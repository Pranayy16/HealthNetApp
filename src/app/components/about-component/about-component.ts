import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-about-component',
  imports: [RouterLink],
  templateUrl: './about-component.html',
  styleUrl: './about-component.css',
})
export class AboutComponent {
  isloggedIn: boolean;

  constructor(private authService: AuthService){
    this.isloggedIn = this.authService.isLoggedIn();
  }
}
