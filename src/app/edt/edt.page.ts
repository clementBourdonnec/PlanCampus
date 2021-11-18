import { Component, OnInit, ViewChild } from '@angular/core';
//import { CalendarComponent } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-edt',
  templateUrl: './edt.page.html',
  styleUrls: ['./edt.page.scss'],
})
export class EdtPage implements OnInit {

  currentDateVar = new Date()
  currentMonth: string
  //@ViewChild(CalendarComponent, {static: false}) myCalendar: CalendarComponent


  constructor() { }

 
  

  ngOnInit() {
  }

  onViewTitleChanged(title: string){
    this.currentMonth = title
  }

}
