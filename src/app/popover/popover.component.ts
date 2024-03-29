import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  title:string;
  date:Date;
  description:String;
  localisation:String;



  constructor(private popoverController:PopoverController,public navParam:NavParams) { }

  ngOnInit() {
    this.date = this.navParam.get('date');
    this.title = this.navParam.get('title');
    this.description = this.navParam.get('descr');
    var tmp:String = this.description;
    this.description = tmp.split("////")[1];
    this.localisation = tmp.split("////")[0];
    this.description.replace("\n\n","");
    this.description.replace("\n"," ");
  }

  closePopover(){
    this.popoverController.dismiss();
  }

}
