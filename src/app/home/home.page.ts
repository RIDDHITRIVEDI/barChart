import { Component, ViewChild } from '@angular/core';
import { DatasetsService } from '../api/datasets.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('barChart') barChart;
  dataSet = [];
  bars: any;
  
  constructor(private apiService: DatasetsService) {}
  ngOnInit() {}

  ionViewDidEnter() {
    this.getDatasets();
  }

  getDatasets(){
    this.apiService
      .getDatasets()
      .valueChanges()
      .subscribe((res) => {
        let xValues = [];
        let yValues = [];
        let barColors = [];
       
        res.map((item) => {
          xValues.push(item.xValues);
          yValues.push(item.yValues);
          barColors.push(item.barColors);
        });
       
        setTimeout(() => {
          this.bars = new Chart(this.barChart.nativeElement, {
            type: 'bar',
            data: {
              labels: xValues,
              datasets: [{
                label: 'World Wine Production 2020',
                data: yValues,
                backgroundColor: barColors, // array should have same number of elements as number of dataset
                borderColor: barColors,// array should have same number of elements as number of dataset
                borderWidth: 1
              }]
            },
            options: {
              legend: {display: false},
              title: {
                display: true,
                text: "World Wine Production 2020"
              }
            }
          });
        }, 150);
    });
  }
}
