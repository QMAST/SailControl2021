import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SailModelApiService} from './sailModel/sailModel-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  sailModelSubs: Subscription;
  displayableList: string[];

  constructor(private sailApi: SailModelApiService) {
    this.displayableList = [];
  }

  ngOnInit() {
    this.sailModelSubs = this.sailApi
      .getExams()
      .subscribe(res => {
          res.forEach(model => {
            this.displayableList.push(JSON.stringify(model));
          });
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.sailModelSubs.unsubscribe();
  }
}