import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private randomnumber : number;
  guess : number;
  correct : boolean = false;
  message : string = "";

  constructor() {}

  numbergenerator() {
    this.randomnumber = Math.floor((Math.random() * 10) + 1);
    if (this.randomnumber > 0) {
      this.message = "Number generated!"
    }
    // this.randomnumber = 1
    console.log(this.randomnumber);
  }

  iscorrect() {
    if (this.guess == this.randomnumber) {
      this.correct = true;
    } else {
      this.correct = false;
      this.message = "Sorry your answer is incorrect."
    }
  }

}
