import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router : Router) {}

  goTo(page) {
    if(page === 'Contact') {
      this.router.navigate(['/contact']);
    } else if(page === 'Map Page') {
      this.router.navigate(['/map']);
    }
  }
}
