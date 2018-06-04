import {Component} from 'angular2/core';
import {ContactService} from './contact.service';
import {Router} from 'angular2/router';
import {RouteParams} from  'angular2/router';
import {OnInit} from 'angular2/core';
import {Contact} from './contacts';
@Component({
    template: `
       <h1>Create New Contact</h1>
        <div ng-if="newid!=''">
              <div class='content-wrapper'><label>Name</label><input type="text" id="name"  #name/> </div>
              <div class='content-wrapper'><label>Email</label><input type="text" id="email"  #email/> </div>
              <div class='content-wrapper'><label>Phone</label><input type="text" id="phone"  #phone/> </div>

              <button type="button" class="btn btn-primary" (click)="onAddContact(name.value,email.value,phone.value)">SUBMIT</button>
        </div>

    `,
     styles:[`
        .content-wrapper{padding:10px;}
    label{display:inline-block;width:120px;}
    input{width:250px;}
    `],
  providers:[ContactService],


})
export class ContactCreateComponent {
public contact:Contact;
   constructor(private _contactService: ContactService,private router: Router,private routeParams: RouteParams) {}

      onAddContact(name,phone,email){
       let contact:Contact={name:name,phone:phone,email:email};
      this._contactService.insertContacts(contact);
                 this.router.navigate(['Contacts']);


      }



      
   }




