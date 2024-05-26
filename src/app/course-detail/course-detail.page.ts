import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCheckbox, IonLabel, IonIcon, IonList, IonItem, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, locationOutline, addOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular/standalone';
import { AddAssignmentPage } from '../add-assignment/add-assignment.page';
import { EditCoursePage } from '../edit-course/edit-course.page';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
  standalone: true,
  imports: [IonContent, RouterLink, IonCheckbox, IonLabel, IonList, IonItem, IonIcon, IonButtons, IonBackButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CourseDetailPage {

  // assignments: any = [
  //   { label: 'Mini Test 1', weight: '10', due_date: '27/03/2024' },
  //   { label: 'Mini Test 2', weight: '10', due_date: '13/04/2024' },
  //   { label: 'Assignment Part A', weight: '20', due_date: '25/04/2024' },
  //   { label: 'Assignment Part B', weight: '20', due_date: '03/05/2024' },
  // ];

  // course = {
  //   name: "Interactive App Development",
  //   trimester: "Trimester 1, 2024",
  //   location: "Building 23 2.22",
  //   description: "It provides students knowledge about modern technologies for app development.",
  //   schedule: [
  //     { 
  //       type: "Lecture",
  //       datetime: new Date().toISOString(), 
  //       frequency: "",
  //       mode: "Online" 
  //     }
  //   ],
  //   assessments: this.assignments
  // }
  course: any;

  constructor(public router: Router, private modalController: ModalController, private route: ActivatedRoute) {
    addIcons({ calendarOutline, locationOutline, addOutline });

    // Get course object passed by router
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.course = navigation.extras.state['course'];
    }
    console.log(this.course);
  }

  // get day value for the corresponding date
  getDay(dateStr: string) {
    const date = new Date(dateStr);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  // get time range for each class
  getTimeRange(dateStr: string) {
    const date = new Date(dateStr);
    const startTime = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
    const endTime = String(date.getHours() + 2).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
    return startTime + '-' + endTime;
  }

  // get date without time
  getDateOnly(dateStr: string) {
    return dateStr.split('T')[0];
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
          this.course.assessments.push(retval.data)
        }
      });
    modal.present();
  }

  // -------- Edit the selected course -----------
  async editCourse() {
    const modal = await this.modalController.create({
      component: EditCoursePage,
      componentProps: {
        name: this.course.name,
        trimester: this.course.trimester,
        location: this.course.location,
        description: this.course.description,
        schedules: this.course.schedules,
        assessments: this.course.assessments
      }
    });
    modal.onDidDismiss()
      .then((retval: any) => {
        if (retval.data !== undefined) {
          this.course = retval.data;
        }
      });
    modal.present();
  }

  // -------- Edit the selected assignment -----------
  async editAssignment(i: number) {
    const modal = await this.modalController.create({
      component: AddAssignmentPage,
      componentProps: { label: this.course.assessments[i].label, weight: this.course.assessments[i].weight, due_date: this.course.assessments[i].due_date } // passing parameters
    });
    modal.onDidDismiss()
      .then((retval: any) => {
        if (retval.data !== undefined) {
          this.course.assessments[i] = retval.data;
        }
      });
    modal.present();
  }
}
