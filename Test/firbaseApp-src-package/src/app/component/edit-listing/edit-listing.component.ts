import { Component, OnInit } from '@angular/core';
import { FirebaseserviceService } from '../../service/firebaseservice.service';
import { Router, ActivatedRoute,Params} from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  public listing:any;	
  public id;
  public image:string;

  constructor(private _firebase:FirebaseserviceService,private router:Router ,private route:ActivatedRoute) { }

  ngOnInit() {
  	this.id=this.route.snapshot.params['id'];
  	this._firebase.getListing(this.id).subscribe(listing=>{
  		this.listing=listing;
        const storageRef = firebase.storage().ref().child(this.listing.path);
        storageRef.getDownloadURL().then(url => this.image = url);
  	});
  }


  editData(formdata) {
      if(formdata.valid) {
  	  this._firebase.editListing(this.id,formdata.value);
  	  this.router.navigate(['/listings']);
    }
  }

}
