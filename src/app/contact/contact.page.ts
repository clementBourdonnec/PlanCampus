import { Component, OnInit } from '@angular/core';
import { HttpConfigService } from '../services/http-config.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  
  url: string;
  itemListData = [];
  page_number = 1;
  page_limit = 8;


  constructor(private httpConfigService: HttpConfigService
    ) { }

  ngOnInit() {  
    this.getEmployees(false, "");
  }

  getEmployees(isFirstLoad, event) {

    this.url = '?_page=' + this.page_number + '&_limit=' + this.page_limit;

    this.httpConfigService.getListItems(this.url)
      .subscribe((data: any) => {

        for (let i = 0; i < data.length; i++) {
          this.itemListData.push(data[i]);
        }

        if (isFirstLoad)
          event.target.complete();

        this.page_number++;
      }, error => {
        console.log(error);
      })
  }

  doInfinite(event) {
    this.getEmployees(true, event);
  }
}
