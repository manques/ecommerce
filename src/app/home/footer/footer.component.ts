import { Component, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements AfterViewInit {
  @ViewChild('footerDiv') footerChild: ElementRef;
  @Output() footerValue = new EventEmitter<number>();
  constructor() {}
  ngAfterViewInit() {
    this.footerValue.emit(this.footerChild.nativeElement.clientHeight);
  }
}
