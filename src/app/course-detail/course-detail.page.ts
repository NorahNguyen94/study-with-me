import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCheckbox, IonLabel, IonIcon, IonList, IonItem, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, locationOutline, addOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular/standalone';
import { AddAssignmentPage } from '../add-assignment/add-assignment.page';
import { EditCoursePage } from '../edit-course/edit-course.page';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import { DateFormatService } from '../date-format.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
  standalone: true,
  imports: [IonContent, RouterLink, IonCheckbox, IonLabel, IonList, IonItem, IonIcon, IonButtons, IonBackButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CourseDetailPage implements OnInit {

  course: any;
  courses: any[] = [];

  constructor(public router: Router, private modalController: ModalController, private route: ActivatedRoute, private storage: StorageServiceService, private date: DateFormatService) {
    addIcons({ calendarOutline, locationOutline, addOutline });

    // Get course object passed by router
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.course = navigation.extras.state['course'];
    }
  }

  async ngOnInit(): Promise<void> {
    this.courses = await this.storage.get('courses');
  }

  // direct the page to show the map
  showMap(location: string) {
    if (location == 'Online' || location == 'online') return;
    else {
      this.router.navigate(['/map'], { state: { location } });
    }
  }

  // get day value for the corresponding date
  getDay(dateStr: string) {
    return this.date.getDay(dateStr);
  }

  // get time range for each class
  getTimeRange(dateStr: string) {
    return this.date.getTimeRange(dateStr);
  }

  // get date without time
  getDateOnly(dateStr: string) {
    return this.date.getDateOnly(dateStr);
  }

  // update value of checked varibale of checkbox
  updateCheckBox() {
    this.storage.updateCourseStorage(this.course, this.courses);
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
          this.course.assessments.push(retval.data);
          this.storage.updateCourseStorage(this.course, this.courses);
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
          this.storage.updateCourseStorage(this.course, this.courses);
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
          this.storage.updateCourseStorage(this.course, this.courses);
        }
      });
    modal.present();
  }

}
