import { Component, OnInit } from '@angular/core';
import { FirebaseserviceService } from '../../service/firebaseservice.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

 // public addProp = this.fb.group({
 //    email: ["", Validators.required],
 //    password: ["", Validators.required]
 //  });
 //  

 //  addData(event) {
    
 //    this.addProp.value
 //  }

 public error:any;
 public iserror:any;

  constructor(public _firebase: FirebaseserviceService,public router:Router) {}


  ngOnInit() {
  }



  addData(formdata) {
console.log(formdata.value)
    if(formdata.valid) {
  	  this._firebase.addListing(formdata.value);
  	  this.router.navigate(['/listings']);
    }
  }

}
