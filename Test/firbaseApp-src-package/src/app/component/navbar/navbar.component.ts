import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router, ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 constructor(private router:Router ,public af: AngularFire) {}

  ngOnInit() {
  }

  login() {
    this.af.auth.login({
       provider: AuthProviders.Google,
          method: AuthMethods.Popup,
      }).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/dashboard']);
      });
  }

  logout() {
     this.af.auth.logout().then(
        (success) => {
        console.log(success);
        this.router.navigate(['/']);
      });
  }
}
