import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { PopoverComponent } from '../popover/popover.component';
import { PopoverController } from '@ionic/angular';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-edt',
  templateUrl: './edt.page.html',
  styleUrls: ['./edt.page.scss'],
})

export class EdtPage implements OnInit {
  selDate :Date;
  selTitle :String;
  eventSource = [];
  cpt:number;
  calendar;
  test:any;
  calendarTextFromFile:String;

  @ViewChild(CalendarComponent, null) myCalendar: CalendarComponent;

  constructor(private popoverController:PopoverController, public datepipe: DatePipe) {
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
      allDay: false,
      details:"Test Detail"
  })
    return events
  }

  /**
   * Loads an event on the calendar with the provided informations in the parameters
   * @param start : Date the starting date of the event
   * @param end : Date the ending date of the event
   * @param eventName : String the name of the event
   * @param allday : boolean if the event happens all day long
   * @param detail : String the details of the event
   */
  loadEventFromInfo(start:Date,end:Date,eventName:string,allday:boolean, detail:String){
    var event=[]
    event.push({
      title: eventName,
      startTime:start,
      endTime:end,
      allDay: allday,
      details:detail
    })
    
    
    if(this.cpt == 0){
      this.eventSource = event;
      this.cpt++;
    }
    else{
      this.cpt++;
      var events = this.eventSource;
      events.push(event.pop());
      setTimeout(()=>{
        this.eventSource = [];
      },0)
      setTimeout(
        ()=>{
          this.eventSource = events
        },0
      )
    }
  }

  /**
   * Loads an event on the calendar 
   * @param event an event that can be put in a calendar
   */
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
  onEventSelected(event: { selectedTime: Date,  title: String }){
    this.selDate = event.selectedTime
    //this.selTitle = event.title
    console.log('Event Selected: ' + this.selDate + ',' + this.selTitle);
    this.presentPopover(event)
  }
  
  onViewTitleChanged(title){
    //console.log(title);
    //this.selTitle = title;
  }

  onTimeSelected(event){
    console.log('Selected time: ' + event.selectedTime + ', hasEvents: ' + 
    (event.events !== undefined && event.events.length !==0 ) + ', disabled: ' + event.disabled + ", title: " + event.title);
    //this.loadEvents(event)
  }

  ngOnInit() {
    this.cpt=0;

    var start=new Date();
    var end=new Date();
    end.setHours(end.getHours()+2);
    end.setMinutes(start.getMinutes());
    var eventName='Event Created on Init';
    this.loadEventFromInfo(start,end,eventName,false,"Test Detail");
    //this.file.getFile(downloadPath,fileName,{create:false});
    /*this.http.get("https://planning.univ-rennes1.fr/direct/myplanning.jsp?ticket=ST-304837-f4bwEaof1-bKxZ1qsrqhfx8gIfQvmjava-pcas1").subscribe((data) => {
      console.log(data);
    });
    */
    //"https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/OnEkwy3r.shu"

    //Getting Calendar File datas
    let content = "Calendar File";
    let data:BlobPart = new Blob([content]);
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    let calendarFile = new File(arrayOfBlob, "calendar.ics");
    //this.getCalendarFileContent(calendarFile)
  }

  /**
   * Shows the popover which corresponds to a certain event selected. Show the event information
   * @param ev event selected in the calendar
   */
  async presentPopover(ev: any) {
    console.log(ev);
    var s = this.datepipe.transform(ev.startTime, 'dd MMMM yyyy').toString();
    var tmp = ev.startTime.getMinutes().toString();
    //console.log(ev.startTime.getMinutes());
    
    // Probleme pour les minutes 0 à 9 : affiche 10h4 par exemple => ajout d'un 0 à ce moment la
    if(ev.startTime.getMinutes()<10)tmp = "0"+tmp;
    s += " • " + ev.startTime.getHours() + ":"+tmp;
    tmp = ev.endTime.getMinutes().toString();
    if(ev.endTime.getMinutes()<10)tmp = "0"+tmp;
    s += " - " + ev.endTime.getHours() + ":" + tmp;

    console.log(s);
    console.log(ev.details);
    
    
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps:{title:ev.title,date:s, descr: ev.details}
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  /**
   * recuperate the content of the file selected by the html page 'edt.page.html'
   * @param event 
   */
  getCalendarFileContent(event){
    var reader = new FileReader();
    reader.onloadend = function(evt){
      console.log('File opened successfully');
    }
  
    const file = event.target.files[0];
    //const file =  document.querySelector('input[type=file]').files[0];
    console.log(file);
    
    reader.readAsText(file);
    reader.onload = (e)=>{
      this.calendarTextFromFile = reader.result as String;
      console.log("Text extracted from calendar file");
      var tmp = this.calendarTextFromFile.split('\n');
    }
  }

  /**
   * Loads the events contained in the calendarTextFromFile variable as a text : parse this text
   */
  loadCalendar() {
    if(this.calendarTextFromFile.length==0){

    }
    else{
    console.log("Starting loading calendar");
    var eventsTab = this.calendarTextFromFile.split('BEGIN');

    // going on each available event
    for(let eventIndex = 2; eventIndex<eventsTab.length; eventIndex++){
      var eventInfoTab = eventsTab[eventIndex].split('\n');
      var start:string;
      var end:string;
      var loc:string;
      var sum:string;
      var descr:string;

      // getting each information of the current event
      for( let infoIndex = 0; infoIndex<eventInfoTab.length; infoIndex++){
        var info = eventInfoTab[infoIndex]
        info.includes('DTSTART')?start=info.substring(8):null;
        info.includes('DTEND')?end=info.substring(6):null;
        info.includes('LOCATION')?loc=info.substring(9):null;
        info.includes('SUMMARY')?sum=info.substring(8):null;
        info.includes('DESCRIPTION')?descr=info.substring(12):null;
      }

      // parsing event informations
      var startDate:Date = new Date()
      startDate.setFullYear(parseInt(start.substring(0,4)))
      startDate.setMonth(parseInt(start.substring(4,6))-1)
      startDate.setDate(parseInt(start.substring(6,8)))
      startDate.setHours(parseInt(start.substring(9,11)))
      startDate.setMinutes(parseInt(start.substring(11,13)))
      var endDate:Date = new Date()
      endDate.setFullYear(parseInt(end.substring(0,4)))
      endDate.setMonth(parseInt(end.substring(4,6))-1)
      endDate.setDate(parseInt(end.substring(6,8)))
      endDate.setHours(parseInt(end.substring(9,11)))
      endDate.setMinutes(parseInt(end.substring(11,13)))
      //Check for the jet lag
      
      /*if((startDate.getMonth()==10 && startDate.getDate() >= 30) 
      || (startDate.getMonth()==3 && startDate.getDate() <= 27) 
      || (startDate.getMonth()>10 && startDate.getMonth()<3)){
        startDate.setHours(startDate.getHours()+1);
        endDate.setHours(endDate.getHours()+1);
      }*/
      
      this.loadEventFromInfo(startDate,endDate,sum,false,"Localisation " + loc + "\n" + descr)
    }
    }
  }
}
