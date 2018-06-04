import { Component, OnInit } from '@angular/core';
import { FirebaseserviceService } from '../../service/firebaseservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-calender',
  templateUrl: './appcalender.component.html',
  styleUrls: ['./appcalender.component.css']
})
export class AppCalenderComponent implements OnInit {
 
  calendarOptions:Object;

  constructor(private _firebase:FirebaseserviceService,private router:Router) { }

  ngOnInit() {
    this._firebase.getAllevents().subscribe(eventdata=>{

           console.log(eventdata)
            this.calendarOptions = {
                height: 'parent',
                fixedWeekCount : false,
                defaultDate: '2017-04-15',
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                eventSources: [{events: eventdata}]

              };


       
        });

  }

}
