import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseserviceService } from './service/firebaseservice.service';
import { AuthGuard } from './service/auth.service';
import { CalendarComponent } from "ap-angular2-fullcalendar/src/calendar/calendar";

// import { NgGridModule } from 'angular2-grid';
 //import { NgDataGridModel } from 'angular2-datagrid';

import { AlertModule } from 'ng2-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ListingsComponent } from './component/listings/listings.component';
import { ListingComponent } from './component/listing/listing.component';
import { AddListingComponent } from './component/add-listing/add-listing.component';
import { EditListingComponent } from './component/edit-listing/edit-listing.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { CreateuserComponent } from './component/createuser/createuser.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AppCalenderComponent } from './component/calender/appcalender.component';
import { ChartComponent } from './component/chart/chart.component';

export const firebaseConfig = {
    apiKey: "AIzaSyDHFUWRf68qJhlUz9KbAZdpd7JAOJvTx6Q",
    authDomain: "projectlist-ea5c2.firebaseapp.com",
    databaseURL: "https://projectlist-ea5c2.firebaseio.com",
    storageBucket: "projectlist-ea5c2.appspot.com",
    messagingSenderId: "813655721264"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

const appRoutes=[
{path:'',component:HomeComponent},
{path:'listings',component:ListingsComponent},
{path:'listing/:id',component:ListingComponent},
{path:'edit-listing/:id',component:EditListingComponent},
{path:'add-listing',component:AddListingComponent},
{path:'create-user',component:CreateuserComponent},
{path:'dashboard',component:DashboardComponent},
{path:'calender',component:AppCalenderComponent},
{path:'**',component:PagenotfoundComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ListingsComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    PagenotfoundComponent,
    CreateuserComponent,
    DashboardComponent,
    AppCalenderComponent,
    ChartComponent,
    CalendarComponent,

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //NgDataGridModel,
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot()
  ],
  providers: [FirebaseserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
