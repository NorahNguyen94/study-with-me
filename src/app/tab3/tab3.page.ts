import { Component } from '@angular/core';
import { IonHeader, IonSelectOption, IonButtons, IonMenuButton, IonButton, IonInput, IonLabel, IonToolbar, IonSelect, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, IonHeader, IonButton, IonButtons, IonMenuButton, IonSelectOption, IonInput, IonLabel, IonSelect, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab3Page {

  assignments1: any = [
    { label: 'Mini Test 1', weight: '10', due_date: '27/03/2024' },
    { label: 'Mini Test 2', weight: '10', due_date: '13/04/2024' },
    { label: 'Assignment Part A', weight: '20', due_date: '25/04/2024' },
    { label: 'Assignment Part B', weight: '20', due_date: '03/05/2024' },
  ];
  assignments2: any = [
    { label: 'Mini Test 11', weight: '10', due_date: '27/03/2024' },
    { label: 'Mini Test 2w', weight: '10', due_date: '13/04/2024' },
    { label: 'Assignment Part A', weight: '20', due_date: '25/04/2024' },
    { label: 'Assignment Part B', weight: '20', due_date: '03/05/2024' },
  ];

  courses =
    [{
      name: "Computer System",
      trimester: "Trimester 1, 2024",
      location: "Building 23 2.22",
      description: "It provides students knowledge about modern technologies for app development.",
      schedule: [
        {
          type: "Lecture",
          datetime: "",
          frequency: "",
          mode: "Online"
        },
      ],
      assessments: this.assignments1
    },
    {
      name: "Interactive App Development",
      trimester: "Trimester 1, 2024",
      location: "Building 23 2.22",
      description: "It provides students knowledge about modern technologies for app development.",
      schedule: [
        {
          type: "Lecture",
          datetime: "",
          frequency: "",
          mode: "Online"
        },
      ],
      assessments: this.assignments2
    }

    ]

  selectedCourse: any;
  result: any;
  grade: any;

  constructor() { }

  /*
  ----- When user select a course from the select tag ----
  -- assign the option selected to selectedCourse variable -----
  */
  courseChange() {
    this.result = null;

    // find index of the selected course in the course list to show assessments of it in html template
    const index = this.courses.findIndex(course => course.name === this.selectedCourse);
    if (index !== -1) {
      console.log(`Selected course index: ${index}`);
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
    this.selectedCourse.assessments.forEach((assessment: { userInput: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: NumberConstructor): [any, any]; new(): any; }; }; }; weight: number; }) => {
      if (assessment.userInput) {
        const [score, maxScore] = assessment.userInput.split('/').map(Number);
        if (!isNaN(score) && !isNaN(maxScore) && maxScore !== 0) {
          const percentage = (score / maxScore) * 100;
          totalScore += Number((percentage * assessment.weight)) / 100;
          totalWeight += Number(assessment.weight);
        }
      }
    });

    this.result = (totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0).toFixed(2);

    // Check the grade based on the score (HD, D, C, P, F) 
    switch (true) {
      case (this.result >= 85): this.grade = "HD"; break;
      case (this.result < 85 && this.result >= 75): this.grade = "D"; break;
      case (this.result < 75 && this.result >= 65): this.grade = "C"; break;
      case (this.result < 65 && this.result >= 50): this.grade = "P"; break;
      case (this.result < 50): this.grade = "F"; break;
    }
  }
}

