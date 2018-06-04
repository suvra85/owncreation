import {Component} from 'angular2/core';
import {ContactService} from './contact.service';
import {Router} from 'angular2/router';
import {RouteParams} from  'angular2/router';
import {OnInit} from 'angular2/core';
import {Contact} from './contacts';
@Component({
    template: `
       <h1>Update Contact</h1>
        <div ng-if="newid!=''">
              <div class='content-wrapper'><label>Name</label><input type="text" id="name" [(ngModel)]="contactdata.name"  #name/> </div>
              <div class='content-wrapper'><label>Email</label><input type="text" id="email" [(ngModel)]="contactdata.email" #email/> </div>
              <div class='content-wrapper'><label>Phone</label><input type="text" id="phone" [(ngModel)]="contactdata.phone" #phone/> </div>
              <input type="hidden" id="idval" #id [ngModel]="newid"/>

              <button type="button" class="btn btn-primary" (click)="onUpdateContact()">SUBMIT</button>
        </div>

    `,
     styles:[`
        .content-wrapper{padding:10px;}
    label{display:inline-block;width:120px;}
    input{width:250px;}
    `],
  providers:[ContactService],


})
export class ContactUpdateComponent implements OnInit{

  public newid="";
  public contactdata:Contact={"name":"","email":"","phone":""};
  constructor(private _contactService: ContactService,private router: Router,private routeParams: RouteParams) {}

  onUpdateContact(){
        this._contactService.upadteContacts(this.contactdata,this.newid);
                 this.router.navigate(['Contacts']);
    
      }



  ngOnInit():any{
         this.newid=this.routeParams.get('nm');
         this._contactService.getContact(this.newid).then((contact: Contact) => {this.contactdata = contact; console.log(contact)});
         
      }


      
   }




