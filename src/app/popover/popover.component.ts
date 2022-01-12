import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  event;
  title:string;
  start:Date;
  end:Date;

  constructor(private popoverController:PopoverController,public navParam:NavParams) { }

  ngOnInit() {
    this.event = this.navParam.get('event');
    this.start = this.navParam.get('start');
    this.end = this.navParam.get('end');
    this.title = this.event.title;
    console.log(this.start);
    
    //this.start = this.event.startDate;
    //this.end = this.event.endDate;
  }

  closePopover(){
    this.popoverController.dismiss();
  }

}
