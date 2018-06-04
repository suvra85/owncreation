import {Component} from 'angular2/core';
import {Config} from './config.settings';
import {Video} from './videos';
import {PlaylistComponent} from './playlist.component';

@Component({

    selector: 'my-app',
    templateUrl:'app/ts/app.html' ,
    directives:[PlaylistComponent]
})

export class AppComponent { 

	public heading=Config.MAIN_HEADING;
	//videos:Array<Video>;
	public videodata={};




}
