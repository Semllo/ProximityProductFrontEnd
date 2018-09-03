import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

    // tslint:disable-next-line:no-input-rename
  @Input('chartLabels') doughnutChartLabels = [];
  // tslint:disable-next-line:no-input-rename
  @Input('chartData') doughnutChartData = [];
  // tslint:disable-next-line:no-input-rename
  @Input('chartType ') doughnutChartType = '';




  constructor() {

  }

  ngOnInit() {
  }

}
