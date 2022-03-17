import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { MapPage } from '../map/map.page';

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

  mapOpen:boolean;


  constructor(private popoverController:PopoverController,public navParam:NavParams,private modalCtr:ModalController) { }

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

  async goToMap(){
    var loc=this.localisation.split(" -")[0];
    /*const map=await this.modalCtr.create({
      component: MapPage,
      cssClass: 'my-custom-class',
      componentProps: { localisation:loc}
    });
    map.present();
    this.tmpLoc = loc;*/
    this.popoverController.dismiss(true);
  }

}
