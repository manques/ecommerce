import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  actualHeight = 600;
  screenHeight;
  footerHeight;
  title = 'client';
  constructor() {}
  ngOnInit() {
    this.screenHeight = screen.availHeight;
  }
  ngAfterViewInit() {
    this.actualHeight = this.screenHeight -  (this.footerHeight - 56);
  }

  onFooter(event) {
    this.footerHeight = event;

  }
}
