import { Component, OnInit } from '@angular/core';

// Los plugins se cargan en el sidebar
// declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // init_plugins();
  }

}
