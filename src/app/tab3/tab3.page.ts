import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonSelectOption, IonButtons, IonMenuButton, IonButton, IonInput, IonLabel, IonToolbar, IonSelect, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageServiceService } from '../storage-service.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, IonHeader, IonButton, IonButtons, IonMenuButton, IonSelectOption, IonInput, IonLabel, IonSelect, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab3Page implements OnInit, AfterViewInit {
  @ViewChild('graph', { static: true }) graph!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  courses: any;
  selectedCourse: any;
  userInput = new Array(); // array storing scores that user enter
  result: any = 0;
  grade: any;
  chartConfig: any = { // Chart configuration
    type: 'pie',
    data: {
      labels: ['Achieved', 'Remaining'],
      datasets: [
        {
          label: 'Score acheived',
          data: [this.result, 100 - this.result],
          // backgroundColor: ['#4caf50', '#f44336'],
          // hoverBackgroundColor: ['#66bb6a', '#ef5350']
        }
      ]
    },
    options: {
      responsive: true
    }
  }

  constructor(private storage: StorageServiceService) { }

  ngAfterViewInit() {
    // show the chart
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(this.graph.nativeElement, this.chartConfig);

  }

  async ngOnInit(): Promise<void> {
    this.courses = await this.storage.get('courses');
  }

  /*
  ----- When user select a course from the select tag ----
  -- assign the option selected to selectedCourse variable -----
  */
  courseChange() {
    this.result = null;

    // find index of the selected course in the course list to show assessments of it in html template
    const index = this.courses.findIndex((course: any) => course.name === this.selectedCourse);
    if (index !== -1) {
      this.selectedCourse = this.courses[index];
    } else {
      console.log('Course not found.');
    }
  }

  /* 
  -- Take inputs entered and calculate the final score (GPA) of the course selected
  -- User can input only fields that they want to see the result from
  */
  checkScore() {
    if (!this.selectedCourse) {
      return;
    }

    let totalWeight = 0;
    let totalScore = 0;

    // iterate values input to calculate total score and total weight
    if (this.userInput) {
      for (let i = 0; i < this.userInput.length; i++) {
        const [score, maxScore] = this.userInput[i].split('/').map(Number);
        if (!isNaN(score) && !isNaN(maxScore) && maxScore !== 0) {
          const percentage = (score / maxScore) * 100;
          totalScore += Number((percentage * this.selectedCourse.assessments[i].weight)) / 100;
          totalWeight += Number(this.selectedCourse.assessments[i].weight);
        }
      }
    }

    this.result = (totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0).toFixed(2);

    this.updateChart(this.result);
    // Check the grade based on the score (HD, D, C, P, F) 
    switch (true) {
      case (this.result >= 85): this.grade = "HD"; break;
      case (this.result < 85 && this.result >= 75): this.grade = "D"; break;
      case (this.result < 75 && this.result >= 65): this.grade = "C"; break;
      case (this.result < 65 && this.result >= 50): this.grade = "P"; break;
      case (this.result < 50): this.grade = "F"; break;
    }
  }

  updateChart(result: any) {
    const gpa = parseFloat(result);
    if (this.chart) {
      this.chart.data.datasets[0].data = [gpa, 100 - gpa];
      this.chart.update();
    }
  }
}

