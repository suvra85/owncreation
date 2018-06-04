import {Component} from 'angular2/core';
import {Video} from './videos';
//import { FormsModule }   from '@angular/forms';


@Component({
    selector: 'playlist',
    templateUrl:"app/ts/playlist.html",
    //inputs:['videos'],

    styleUrls:["app/css/popup.css"]
})

export class PlaylistComponent { 

   public vid={};
   public isShow=false;
   videos:Array<Video>;


   	constructor(){
		this.videos=[ 
		 new Video(1,'Breakup Song','CvPdtf8Ijj4','Lose yourself and groove to one of the most scintillating tracks of the year - The Breakup Song. A quirky and fun dance number, this song packs an electrifying punch that is sure to get your feet tapping. '),
		 new Video(2,'Bulleya','hXh35CtnSyU','Bulleya, a Sufi love song from Ae Dil Hai Mushkil stars Aishwarya Rai Bachchan, Ranbir Kapoor & Anushka Sharma. Beautifully shot in picturesque locations, this music video captures the magical chemistry between Ranbir Kapoor and Aishwarya Rai Bachchan. '),
		 new Video(3,'KAUN TUJHE','JHUrRSBtUNE','ries present Bollywood Movie "M. S. DHONI - THE UNTOLD STORY" Video Song "KAUN TUJHE" movie starring Sushant Singh Rajput in the leading role as Dhoni, Kiara Advani, Disha Patani and Anupam Kher. M.S. Dhoni - The Untold Story is a bollywood biographical film directed by Neeraj Pandey.The film is based on the life of Indian cricketer and the current captain of the Indian national cricket team, Mahendra Singh '),

		]
	}

	showVideo(vid:Video){

	this.vid=vid;
	this.isShow=true;
	}

	hideVideo(){
		this.isShow=false;

	}
	

	


	addVideo(title):void
	{

		console.log(title);
	}

}
