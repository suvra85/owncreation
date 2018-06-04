import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
@Injectable()
export class FirebaseserviceService {
  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any>;
  folder:any;
  events: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) { 
    this.folder="listingimages";
  }

  getListings(){
  	this.listings=this.af.database.list('https://projectlist-ea5c2.firebaseio.com/listings') as FirebaseListObservable<Listing[]>;
  
   return this.listings;
  }

  getListing(id){
    this.listing=this.af.database.object('https://projectlist-ea5c2.firebaseio.com/listings/'+id) as FirebaseObjectObservable<Listing>;
  
   return this.listing;
  }

  removeListing(id)
  {
    this.af.database.list('https://projectlist-ea5c2.firebaseio.com/listings/').remove(id);
  }

  addListing(data)
  {

    let storageRef = firebase.storage().ref();
        for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
            let folder = this.folder;
            let path = `/${this.folder}/${selectedFile.name}`;
            var iRef = storageRef.child(path);
            iRef.put(selectedFile).then((snapshot) => {
               data.image=selectedFile.name;
               data.path=path;

                return this.af.database.list('https://projectlist-ea5c2.firebaseio.com/listings/').push(data);
            });
        }

  }

   editListing(id,data)
  {

    if((<HTMLInputElement>document.getElementById('image')).files[0]==null)
    {
        let storageRef = firebase.storage().ref();
          for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
              let folder = this.folder;
              let path = `/${this.folder}/${selectedFile.name}`;
              var iRef = storageRef.child(path);
              iRef.put(selectedFile).then((snapshot) => {
                 data.image=selectedFile.name;
                 data.path=path;

                  return this.af.database.list('https://projectlist-ea5c2.firebaseio.com/listings/').update(id,data);
                  });
             
          }
    }
    else
    {
       this.af.database.list('https://projectlist-ea5c2.firebaseio.com/listings/').update(id,data);
    }
    

  }



  getAllevents(){
    this.events=this.af.database.list('https://projectlist-ea5c2.firebaseio.com/events') as FirebaseListObservable<Events[]>;
  
   return this.events;
  }

}


interface Listing{
  $key?:any;
  beedroom?:any;
  city?:any;
  image?:any;
  owner?:any;
  path?:any;
  price?:any;
  title?:any;
  about?:any;

}

interface Events{
 $key?:any;
 id?:any;
 start?:any;
 end?:any;
 title?:any;
 url?:any;
}