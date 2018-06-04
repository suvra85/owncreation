import {Component} from 'angular2/core';
import {ContactComponent} from './contact.component';
import {ContactService} from './contact.service';
import {Router} from 'angular2/router';

import {OnInit} from 'angular2/core';

@Component({
    selector: 'contact-list',
    template: `
        <ul>
         <li *ngFor="#contact of contacts" (click)="onSelect(contact)" [class.clicked]="selectedContact===contact">{{contact.name}}</li>
        </ul>
        <contact *ngIf="selectedContact!==null" [contact]="selectedContact" [id]="idval"></contact>
    `,
    providers:[ContactService],
    directives:[ContactComponent],
    styles:[`
		.clicked{cursor:pointer;color:#dd0000;}
    `]

})
export class ContactListComponent implements OnInit{
 


public contacts:Contact[];
public selectedContact=null;
public isSelected=false;
public idval=-1;

   constructor(private _contactService: ContactService,private router: Router) {}

   getContacts(){
      this._contactService.getContacts().then((contacts: Contact[]) => this.contacts = contacts);
   }

	ngOnInit():any{
	   this.getContacts();

     console.log('aaa')
	}


  onSelect(contact){
  	this.selectedContact=contact;
  	this.isSelected=true;

     this._contactService.getIndex(contact).then((res) =>{
       this.idval = res;
  this.router.navigate(['UpdateContact', {nm: this.idval}]; 

} );
       );

        

  }


}