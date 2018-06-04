import { Component, OnInit } from '@angular/core';
import { FirebaseserviceService } from '../../service/firebaseservice.service';
import { Router, ActivatedRoute,Params} from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
	listing:any;
  image:string;
  constructor(private router:Router ,private route:ActivatedRoute,private firebase:FirebaseserviceService) { }

  ngOnInit() {

  	let id=this.route.snapshot.params['id'];



  	this.firebase.getListing(id).subscribe(listing=>{

  		this.listing=listing;


        const storageRef = firebase.storage().ref().child(this.listing.path);
        storageRef.getDownloadURL().then(path => {this.image = path;  console.log(this.image)});

  			console.log(this.listing);
  	});


  }

  deleteProp(id)
  {
    this.firebase.removeListing(id);
    this.router.navigate(['/listings']);

  }

}
