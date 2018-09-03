import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pogress',
  templateUrl: './pogress.component.html',
  styles: []
})
export class PogressComponent implements OnInit {


  progreso1 = 50;
  progreso2 = 80;

  constructor() { }

  ngOnInit() {
  }


}
