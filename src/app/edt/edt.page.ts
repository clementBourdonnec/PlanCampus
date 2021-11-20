import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-edt',
  templateUrl: './edt.page.html',
  styleUrls: ['./edt.page.scss'],
})
export class EdtPage implements OnInit {
  eventSource = [];
  cpt:number = 0;

  calendar = {
    mode: 'week',
    currentDateVar: new Date(),
    startHour:'6',
    endHour: '20',
    step: '30',
    locale: 'fr-FR'
  }

  @ViewChild(CalendarComponent, null) myCalendar: CalendarComponent;
  

  constructor() {
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
  
  
  /*
  private startTime = new Date()
  endTime = new Date()

  eventSource : {
    title
    startTime
    endTime
  }
  



  loadEvents: function():void {
    this?.eventSource?.push({
        title: 'test',
        startTime: this?.startTime,
        endTime: endTime,
        allDay: false
    });
    this.myCalendar?.loadEvents();
}
    */

  loadEvents(event){
    
    if(this.cpt == 0){
      this.eventSource = this.createEvents(event);
      console.log(this.createEvents(event));
      this.cpt++;
      console.log('aaaaaaaa');
      
    }
    else{
      console.log('bbbbbbbbbbbbbb');
      
      
      var events = this.eventSource;
      events.push(this.createEvents(event));
      setTimeout(()=>{
        this.eventSource = [];
      },5000)
      setTimeout(
        ()=>{
          this.eventSource = events
        },5000
      )
      console.log(this.eventSource);
      console.log(events);
      
    }
    console.log(this.cpt);
    console.log(this.eventSource);
    
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
  }
  
}
