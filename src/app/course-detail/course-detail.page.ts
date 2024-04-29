import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCheckbox, IonLabel, IonIcon, IonList, IonItem, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, locationOutline, addOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular/standalone';
import { AddAssignmentPage } from '../add-assignment/add-assignment.page';
import { EditCoursePage } from '../edit-course/edit-course.page';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
  standalone: true,
  imports: [IonContent, RouterLink, IonCheckbox, IonLabel, IonList, IonItem, IonIcon, IonButtons, IonBackButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CourseDetailPage {

  assignments: any = [
    { name: 'Mini Test 1', weight: '10', due_date: '27/03/2024' },
    { name: 'Mini Test 2', weight: '10', due_date: '13/04/2024' },
    { name: 'Assignment Part A', weight: '20', due_date: '25/04/2024' },
    { name: 'Assignment Part B', weight: '20', due_date: '03/05/2024' },
  ];

  constructor(public router: Router, private modalController: ModalController) {
    addIcons({ calendarOutline, locationOutline, addOutline });
  }
  // -------- Add new assignment into the assignment list by viewing a modal -----------
  async addAssignment() {
    const modal = await this.modalController.create({
      component: AddAssignmentPage,
      componentProps: {}
    });
    modal.onDidDismiss()
      .then((retval: any) => {
        if (retval.data !== undefined) {
          this.assignments.push(retval.data)
        }
      });
    modal.present();
  }

  // -------- Edit the course selected -----------
  async editCourse() {
    const modal = await this.modalController.create({
      component: EditCoursePage,
      componentProps: {}
    });
    modal.onDidDismiss()
      .then((retval: any) => {
        if (retval.data !== undefined) {
          //this.assignments.push(retval.data)
        }
      });
    modal.present();
  }

  // -------- Edit the selected assignment -----------
  async editAssigment(i: number) {
    const modal = await this.modalController.create({
      component: AddAssignmentPage,
      componentProps: { name: this.assignments[i].name, weight: this.assignments[i].weight, due_date: this.assignments[i].due_date } // passing parameters
    });
    modal.onDidDismiss()
      .then((retval: any) => {
        if (retval.data !== undefined) {
          this.assignments[i] = retval.data
        }
      });
    modal.present();
  }
}
