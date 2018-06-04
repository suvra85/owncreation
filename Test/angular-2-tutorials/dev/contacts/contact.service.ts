import {Injectable} from 'angular2/core';

import {CONTACTS} from './mock-contact';

import {Contact} from './contacts';


@Injectable()

export class ContactService{

getContacts(){
return Promise.resolve(CONTACTS);
}

insertContacts(contact:Contact){
 Promise.resolve(CONTACTS).then((contacts:Contact[])=>contacts.push(contact));
}
getIndex(contact:Contact){
 return Promise.resolve(CONTACTS).then((contacts:Contact[])=>contacts.indexOf(contact));
}

upadteContacts(contact:Contact,idval){
   Promise.resolve(CONTACTS).then((contacts:Contact[])=>{contacts[idval].name=contact.name;contacts[idval].phone=contact.phone;contacts[idval].email=contact.email;});
}

getContact(index){
return Promise.resolve(CONTACTS[index]);
}


}