import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SailModelApiService} from './sailModel/sailModel-api.service';
import { ExistingStateApiService } from './existingState/existingState.service';
import { SailCommandApiService } from './sailCommand/sailCommand.service';
import { sailCommand } from './sailCommand/sailCommand.model';
import { ExistingState } from './existingState/existingState.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  sailModelSubs: Subscription;
  sailModeDisplayableList: string[];
  list1: string[];
  list2: string[];
  inputCommandID: string;
  inputCommnadValue: string;
  inputBoatSpeed: number;
  inputBoatDirection: number;
  inputWindSpeed: number;
  inputWindDirection: number;

  constructor(private sailApi: SailModelApiService,
              private existingStateApi: ExistingStateApiService,
              private sailCommandApi: SailCommandApiService) {
    this.sailModeDisplayableList = [];
    this.list1 = [];
    this.list2 = [];
  }

  ngOnInit() {
    this.existingStateApi.getExistingState().subscribe(existingStates => {
      existingStates.forEach(state => this.list1.push(JSON.stringify(state)));
    })
    this.sailCommandApi.getCommands().subscribe(sailCommands => {
      sailCommands.forEach(command => this.list2.push(JSON.stringify(command)));
    })
  }

  ngOnDestroy() {
    this.sailModelSubs.unsubscribe();
  }

  onSubmitCommand() {
    var newCommand: sailCommand = new sailCommand;
    newCommand.commandID = this.inputCommandID;
    newCommand.commandValue = this.inputCommnadValue;
    console.log("Sending command to api")
    this.sailCommandApi.postCommand(newCommand);
    console.log("Returned from api")
  }

  onSubmitState() {
    var newState: ExistingState = new ExistingState;
    newState.boatDirection = this.inputBoatDirection;
    newState.boatSpeed = this.inputBoatSpeed;
    newState.windDirection = this.inputWindDirection;
    newState.windSpeed = this.inputWindSpeed;
    this.existingStateApi.postCommand(newState);
  }
}