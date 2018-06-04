import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router, ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 public error;
 public iserror:boolean=false;
 constructor(private router:Router ,public af: AngularFire) {}

  ngOnInit() {
    if(this.af.auth)
    {
      //this.router.navigate(['/dashboard']);
    }
  }


  login(type) {
  	if(type=='F')
  	{
 		this.af.auth.login({
 			provider: AuthProviders.Facebook,
        	method: AuthMethods.Popup,
    	}).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/dashboard']);
      }).catch(
        (err) => {
        console.log(err);
        this.iserror=true;
        this.error=err;
      });
  	}
  	else if(type=='G')
  	{
 		this.af.auth.login({
 			provider: AuthProviders.Google,
        	method: AuthMethods.Popup,
    	}).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/dashboard']);
      }).catch(
        (err) => {
        console.log(err);
                this.iserror=true;

        this.error=err;
      });
  	}
   
  }

  loginUser(formData){

  	 if(formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/dashboard']);
      }).catch(
        (err) => {
        console.log(err);
                this.iserror=true;

        this.error=err;
      })
    }


  }

}
