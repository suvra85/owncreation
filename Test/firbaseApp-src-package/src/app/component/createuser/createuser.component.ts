import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseserviceService } from '../../service/firebaseservice.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {


  public error;
  public iserror:boolean=false;

  constructor(public af: AngularFire,private router:Router ,private route:ActivatedRoute,private firebase:FirebaseserviceService) { }


  ngOnInit() {
  }


  createUser(formData){
	if(formData.valid) {
	      console.log(formData.value);
	      this.af.auth.createUser({
	        email: formData.value.email,
	        password: formData.value.password
	      }).then(
	        (success) => {
	        console.log(success);
	        this.router.navigate(['/dashboard'])
	      }).catch(
	        (err) => {
	        console.log(err);
          this.error=err;
                  this.iserror=true;

	      })
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
          this.error=err;
                  this.iserror=true;

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
          this.error=err;
                  this.iserror=true;


        });
  	}
   
  }

}
