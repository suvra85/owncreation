import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ContactService} from './contact.service';
import {Contact} from './contacts';


@Component({
    selector: 'contact',
    template: `
       
        <div>
              <div class='content-wrapper'><label>Name</label><input type="text" id="name"  [(ngModel)]="contact.name" /> </div>
              <div class='content-wrapper'><label>Email</label><input type="text" id="email"  [(ngModel)]="contact.email" /> </div>
              <div class='content-wrapper'><label>Phone</label><input type="text" id="phone"  [(ngModel)]="contact.phone" /> </div>
              <button type="button" class="btn btn-primary" (click)="onCreateContact()">SUBMIT</button>
        </div>
        {{idval}}
    `,
    inputs:['contact','idval'],
    styles:[`
        .content-wrapper{padding:10px;}
		label{display:inline-block;width:120px;}
		input{width:250px;}
    `]
}
}
})
export class ContactComponent {
  public contact:Contact=null;
  public idval;
   constructor(private router: Router) {}

   onCreateContact(){
     this.router.navigate(['UpdateContact', {nm: this.contact.name}]);

   }



}