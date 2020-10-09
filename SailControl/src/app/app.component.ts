import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SailModelApiService} from './sailModel/sailModel-api.service';
import { ExistingStateApiService } from './existingState/existingState.service';
import { SailCommandApiService } from './sailCommand/sailCommand.service';
import { sailCommand } from './sailCommand/sailCommand.model';

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

  constructor(private sailApi: SailModelApiService,
              private existingStateApi: ExistingStateApiService,
              private sailCommandApi: SailCommandApiService) {
    this.sailModeDisplayableList = [];
    this.list1 = [];
    this.list2 = [];
  }

  ngOnInit() {
    /*
    this.sailModelSubs = this.sailApi
      .getExams()
      .subscribe(res => {
          res.forEach(model => {
            this.sailModeDisplayableList.push(JSON.stringify(model));
          });
        },
        console.error
      );
      */
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
}