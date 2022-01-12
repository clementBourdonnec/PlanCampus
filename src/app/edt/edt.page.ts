import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { PopoverComponent } from '../popover/popover.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-edt',
  templateUrl: './edt.page.html',
  styleUrls: ['./edt.page.scss'],
})
export class EdtPage implements OnInit {

  eventSource = [];
  cpt:number;
  calendar;
  @ViewChild(CalendarComponent, null) myCalendar: CalendarComponent;
  

  constructor(private popoverController:PopoverController) {
    this.calendar  = {
      mode: 'week',
      currentDate: new Date(),
      startHour:'6',
      endHour: '20',
      step: '30', 
      locale: 'fr-FR'
    }    
  }

  createEvents(event){
    var events = []
    var date:Date = event.selectedTime
    var startDate = new Date(date)
    var endDate =  new Date(date)
    endDate.setHours(date.getHours()+2)
    events.push({
      title:'Event',
      startTime:startDate,
      endTime:endDate,
      allDay: false
  })
    
    
    
    return events
  }

  loadEventFromInfo(start:Date,end:Date,eventName:string,allday:boolean){
    events=[]
    events.push({
      title: eventName,
      startTime:start,
      endTime:end,
      allDay: allday
    })
    if(this.cpt == 0){
      this.eventSource = events;
      this.cpt++;
    }
    else{
      this.cpt++;
      var events = this.eventSource;
      events.push(events);
      setTimeout(()=>{
        this.eventSource = [];
      },5000)
      setTimeout(
        ()=>{
          this.eventSource = events
        },5000
      )
    }
  }

  loadEvents(event){
    if(this.cpt == 0){
      this.eventSource = this.createEvents(event);
      this.cpt++;
    }
    else{
      this.cpt++;
      var events = this.eventSource;
      events.push(this.createEvents(event)[0]);
      setTimeout(()=>{
        this.eventSource = [];
      },5000)
      setTimeout(
        ()=>{
          this.eventSource = events
        },5000
      )
    }
  }

  onDayHeaderSelected(event){
    console.log(event)
    console.log('jkjkj');
    
  }

  onCurrentDateChanged(event: Date){
    
    console.log('Current date change: ' + event)
  }
  reloadSource(startTime, endTime){
    console.log('start and end time : ' + startTime + ', ' + endTime);
    
  }
  onEventSelected(event){
    console.log('Event Selected: ' + event.startTime + ' - ' + event.endTime + ',' + event.title);
    this.presentPopover(event)
  }
  
  onViewTitleChanged(title){
    console.log(title);
  }

  onTimeSelected(event){
    console.log('Selected time: ' + event.selectedTime + ', hasEvents: ' + 
    (event.events !== undefined && event.events.length !==0 ) + ', disabled: ' + event.disabled);
    this.loadEvents(event)
  }

  ngOnInit() {
    this.cpt=0;

    var start=new Date();
    var end=new Date();
    end.setHours(end.getHours()+2);
    end.setMinutes(start.getMinutes());
    var eventName='Event Created on Init';
    this.loadEventFromInfo(start,end,eventName,false);
    //this.file.getFile(downloadPath,fileName,{create:false});
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps:{event:ev,start:ev.startDate,end:ev.endDate}
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  
}
