import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.less']
})
export class IframeComponent implements OnInit {
  iframeShow = false;

  constructor() { }

  ngOnInit(): void {
    this.showIframe()
  }


  showIframe () {
    setTimeout(() => {
      this.iframeShow = true;
    }, 1200);
  }
}
