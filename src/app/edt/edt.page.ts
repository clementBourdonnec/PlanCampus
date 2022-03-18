import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { PopoverComponent } from '../popover/popover.component';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { DatePipe } from '@angular/common'
import { MapPage } from '../map/map.page';
@Component({
  selector: 'app-edt',
  templateUrl: './edt.page.html',
  styleUrls: ['./edt.page.scss'],
})

export class EdtPage implements OnInit {
  selDate: Date;
  selTitle: String;
  eventSource = [];
  cpt: number;
  calendar;
  test: any;
  calendarTextFromFile: String;
  currentBuilding: String;

  @ViewChild(CalendarComponent, null) myCalendar: CalendarComponent;

  constructor(private popoverController: PopoverController, public datepipe: DatePipe, public loadingController: LoadingController, private modalCtr: ModalController) {
    this.calendar = {
      mode: 'week',
      currentDate: new Date(),
      startHour: '7',
      endHour: '23',
      step: '30',
      locale: 'fr-FR'
    }
  }

  createEvents(event) {
    var events = []
    var date: Date = event.selectedTime
    var startDate = new Date(date)
    var endDate = new Date(date)
    endDate.setHours(date.getHours() + 2)
    events.push({
      title: 'Event',
      startTime: startDate,
      endTime: endDate,
      allDay: false,
      details: "Test Detail"
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
  loadEventFromInfo(start: Date, end: Date, eventName: string, allday: boolean, detail: String) {
    var event = []
    event.push({
      title: eventName,
      startTime: start,
      endTime: end,
      allDay: allday,
      details: detail
    })


    if (this.cpt == 0) {
      this.eventSource = event;
      this.cpt++;
    }
    else {
      this.cpt++;
      var events = this.eventSource;
      events.push(event.pop());
      setTimeout(() => {
        this.eventSource = [];
      }, 0)
      setTimeout(
        () => {
          this.eventSource = events
        }, 0
      )
    }
  }

  /**
   * Loads an event on the calendar 
   * @param event an event that can be put in a calendar
   */
  loadEvents(event) {
    if (this.cpt == 0) {
      this.eventSource = this.createEvents(event);
      this.cpt++;
    }
    else {
      this.cpt++;
      var events = this.eventSource;
      events.push(this.createEvents(event)[0]);
      setTimeout(() => {
        this.eventSource = [];
      }, 5000)
      setTimeout(
        () => {
          this.eventSource = events
        }, 5000
      )
    }
  }

  onDayHeaderSelected(event) {
    console.log(event)
  }

  onCurrentDateChanged(event: Date) {

    console.log('Current date change: ' + event)
  }
  reloadSource(startTime, endTime) {
    console.log('start and end time : ' + startTime + ', ' + endTime);

  }
  onEventSelected(event: { selectedTime: Date, title: String }) {
    this.selDate = event.selectedTime
    //this.selTitle = event.title
    console.log('Event Selected: ' + this.selDate + ',' + this.selTitle);
    this.presentPopover(event)
  }

  onViewTitleChanged(title) {
    //console.log(title);
    //this.selTitle = title;
  }

  onTimeSelected(event) {
    console.log('Selected time: ' + event.selectedTime + ', hasEvents: ' +
      (event.events !== undefined && event.events.length !== 0) + ', disabled: ' + event.disabled + ", title: " + event.title);
    //this.loadEvents(event)
  }

  ngOnInit() {
    this.cpt = 0;

    //Getting Calendar File datas
    let content = "Calendar File";
    let data: BlobPart = new Blob([content]);
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    let calendarFile = new File(arrayOfBlob, "calendar.ics");
    //this.getCalendarFileContent(calendarFile)

    var tmp:Date = new Date();
    tmp.setHours(tmp.getHours() + 1)
    this.loadEventFromInfo(new Date(), tmp, "test", false, "b41 - oui");
  }

  /**
   * Shows the popover which corresponds to a certain event selected. Show the event information
   * @param ev event selected in the calendar
   */
  async presentPopover(ev: any) {
    var s = this.datepipe.transform(ev.startTime, 'dd MMMM yyyy').toString();
    var tmp = ev.startTime.getMinutes().toString();

    // Probleme pour les minutes 0 à 9 : affiche 10h4 par exemple => ajout d'un 0 à ce moment la
    if (ev.startTime.getMinutes() < 10) tmp = "0" + tmp;
    s += " • " + ev.startTime.getHours() + ":" + tmp;
    tmp = ev.endTime.getMinutes().toString();
    if (ev.endTime.getMinutes() < 10) tmp = "0" + tmp;
    s += " - " + ev.endTime.getHours() + ":" + tmp;

    var loc = ev.details.split("////")[0].split(" -")[0];
    var mapOpen: boolean = false;

    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: { title: ev.title, date: s, descr: ev.details }
    });
    await popover.present();

    const  role  = await popover.onDidDismiss().then((result) => {
      console.log(result);
      
      if (!(typeof result == "undefined") && result['data'] == true) {
        console.log("Map open" + result);
        
        mapOpen = true;
      }
      else{
        console.log("map not open");
        
      }
    });
    //const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

    if (popover.isConnected && mapOpen) {
      const map = await this.modalCtr.create({
        component: MapPage,
        cssClass: 'modal-fullscreen',
        componentProps: { buildingToSee: loc }
      });
      map.present();
    }
  }



  /**
   * recuperate the content of the file selected by the html page 'edt.page.html'
   * @param event 
   */
  getCalendarFileContent(event) {
    var reader = new FileReader();
    reader.onloadend = function (evt) {
      console.log('File opened successfully');
    }

    const file = event.target.files[0];
    //const file =  document.querySelector('input[type=file]').files[0];
    console.log("File opened : ");
    console.log(file);


    reader.readAsText(file);
    reader.onload = (e) => {
      this.calendarTextFromFile = reader.result as String;
      console.log("Text extracted from calendar file");
      var tmp = this.calendarTextFromFile.split('\n');
    }
  }

  /**
   * function that waits ms miliseconds
   * @param ms the time to wait
   */
  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  /**
   * Async function that loads a Loading screen (cover the entier screen)
   */
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
      duration: 1000,
      message: 'Veuillez patienter...',
      //mode: 'ios',
      translucent: false,
      cssClass: 'loading',
      backdropDismiss: true,
      id: 'loading-popover',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  /**
   * recuperate the Summer jet lag start following the year
   * @param year the year of the jet lag start wanted
   * @returns the start date of the summer jet lag
   */
  jetLagStart(year) {
    var date = new Date(2022, 3, 1);
    let weekday = date.getDay();
    let dayDiff = weekday === 0 ? 7 : weekday;
    let lastSunday = date.setDate(date.getDate() - dayDiff);
    return lastSunday;
  }

  /**
   * recuperate the Summer jet lag end following the year
   * @param year the year of the jet lag start wanted
   * @returns the end date of the summer jet lag
   */
  jetLagEnd(year) {
    var date = new Date(2022, 10, 1);
    let weekday = date.getDay();
    let dayDiff = weekday === 0 ? 7 : weekday;
    let lastSunday = date.setDate(date.getDate() - dayDiff);
    return lastSunday;
  }

  cleanStr(str: String) {
    var ret: string = "";
    str = str.substring(4);
    for (var i: number = 0; i < str.length; i++) {

      if (new RegExp('[A-Za-z0-9\ -:()çéèàî]').test(str.charAt(i))) {
        ret = ret + str.charAt(i);
      }
      else {
        ret = ret + "<br/>";
        i++
      }
    }

    return ret;
  }

  /**
   * Loads the events contained in the calendarTextFromFile variable as a text : parse this text
   */
  async loadCalendar() {
    if (this.calendarTextFromFile.length == 0) { }
    else {
      this.presentLoadingWithOptions();

      console.log("Starting loading calendar");
      var eventsTab = this.calendarTextFromFile.split('BEGIN');

      // Waiting to hide strange artifacts
      await new Promise(resolve => setTimeout(resolve, 500));

      // going on each available event
      for (let eventIndex = 2; eventIndex < /*3*/eventsTab.length; eventIndex++) {
        var eventInfoTab = eventsTab[eventIndex].split('\n');
        var start: string;
        var end: string;
        var loc: string;
        var sum: string;
        var descr: string;
        //console.log(eventsTab[eventIndex]);
        var descrBool: boolean = true;

        // getting each information of the current event
        for (let infoIndex = 0; infoIndex < eventInfoTab.length; infoIndex++) {


          var info = eventInfoTab[infoIndex]
          //console.log(info);
          info.includes('DTSTART') ? start = info.substring(8) : null;
          info.includes('DTEND') ? end = info.substring(6) : null;
          info.includes('LOCATION') ? loc = info.substring(9) : null;
          info.includes('SUMMARY') ? sum = info.substring(8) : null;
          info.includes('DESCRIPTION') ? descr = info.substring(12) : null;
          (!new RegExp("[A-Z]:").test(info)) ? descr += info : null;
        }
        descr = descr.substring(0, descr.lastIndexOf('('));
        //descr = descr.substring(0,descr.length-3);

        // parsing event informations
        var startDate: Date = new Date()
        startDate.setFullYear(parseInt(start.substring(0, 4)))
        startDate.setMonth(parseInt(start.substring(4, 6)) - 1)
        startDate.setDate(parseInt(start.substring(6, 8)))
        startDate.setHours(parseInt(start.substring(9, 11)) + 1)
        startDate.setMinutes(parseInt(start.substring(11, 13)))
        var endDate: Date = new Date()
        endDate.setFullYear(parseInt(end.substring(0, 4)))
        endDate.setMonth(parseInt(end.substring(4, 6)) - 1)
        endDate.setDate(parseInt(end.substring(6, 8)))
        endDate.setHours(parseInt(end.substring(9, 11)) + 1)
        endDate.setMinutes(parseInt(end.substring(11, 13)))

        //Check for the jet lag
        if (new Date(this.jetLagStart(startDate.getFullYear)) < new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
          && new Date(this.jetLagEnd(startDate.getFullYear)) > new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())) {
          startDate.setHours(startDate.getHours() + 1);
          endDate.setHours(endDate.getHours() + 1);
        }


        //Building and Cleaning the description text
        descr = this.cleanStr(descr);
        //descr = "<p>" + descr + "</p>";
        var description: String = loc + "////" + descr;

        //Loading the event in the calendar
        this.loadEventFromInfo(startDate, endDate, sum, false, description)
      }
    }
  }



}
