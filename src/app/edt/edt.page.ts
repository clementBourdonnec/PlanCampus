import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-edt',
  templateUrl: './edt.page.html',
  styleUrls: ['./edt.page.scss'],
})
export class EdtPage implements OnInit {

  calendar = {
    mode: 'week',
    currentDateVar: new Date(),
    startHour:'6',
    endHour: '20',
    step: '30',
    locale: 'fr-FR'
  }

  currentDateVar = new Date()
  currentMonth: string
  //@ViewChild(CalendarComponent, {static: false}) myCalendar: CalendarComponent

  constructor() { }

 
  

  ngOnInit() {
  }

  onCurrentDateChanged(event: Date){
    console.log('Current date chahge: ' + event)
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
    
  }

}
