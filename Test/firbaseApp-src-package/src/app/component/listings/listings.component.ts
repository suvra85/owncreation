import { Component, OnInit } from '@angular/core';
import { FirebaseserviceService } from '../../service/firebaseservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  public listings:any;	

  
  constructor(private _firebase:FirebaseserviceService,private router:Router) { }

  ngOnInit() {

  	this._firebase.getListings().subscribe(listings=>{

  		this.listings=listings;

  			console.log(this.listings);
  	});
  }


  removeData(id)
  {
    this._firebase.removeListing(id);
    this.router.navigate(['/listings']);
  }

}
