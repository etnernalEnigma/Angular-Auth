import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngApp';

  constructor(private _authService: AuthService)
  {}
  loggedIn:boolean=this._authService.loggedIn()
  logout()
  {
    this._authService.logoutUser()
  }
}
