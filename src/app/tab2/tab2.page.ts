import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonItemOptions, IonItemOption, IonItemSliding, IonTitle, IonContent, IonIcon, IonList, IonItem, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NgFor } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { EditCoursePage } from '../edit-course/edit-course.page';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [RouterLink, IonHeader, NgFor, IonItemOptions, IonButtons, IonMenuButton, IonItemOption, IonItemSliding, IonToolbar, IonTitle, IonContent, IonList, IonItem, ExploreContainerComponent, IonIcon]
})
export class Tab2Page implements OnInit {

  courses: any;

  constructor(public router: Router, private modalController: ModalController, private storage: StorageServiceService) {
    addIcons({ addOutline, createOutline, trashOutline });
  }

  async ngOnInit(): Promise<void> {
    this.courses = await this.storage.get('courses');
    if (this.courses == undefined) { // default values for courses
      this.courses = [
        {
          name: 'Interactive App Development',
          trimester: 'Trimester 1, 2024',
          location: 'Online',
          description: 'The course introduces essential concepts, software tools and modern frameworks required for designing, creating and testing of interactive web and mobile applications.',
          schedules:
            [
              {
                type: 'Lecture',
                datetime: "2024-05-24T10:00:00",
                frequency: 'Weekly',
                mode: 'Online'
              }
            ],
          assessments:
            [
              {
                label: 'Mini Test 1',
                weight: '10',
                due_date: new Date().toISOString(),
                checked: false
              }
            ]
        },
        {
          name: 'Computer System and Network',
          trimester: 'Trimester 1, 2024',
          location: 'Building 23 2.22',
          description: 'This course provides an overview of the hardware, software, network, and security concepts and technologies that define modern computer systems.',
          schedules:
            [
              {
                type: 'Lecture',
                datetime: new Date().toISOString(),
                frequency: 'Weekly',
                mode: 'On-campus'
              }
            ],
          assessments:
            [
              {
                label: 'Mini Test 1',
                weight: '10',
                due_date: new Date().toISOString(),
                checked: false
              }
            ]
        }
      ];
    }
    // console.log(this.courses);
  }

  // ---- Delete selected course, ask user before deleting ------
  deleteCourse(i: number) {
    if (confirm("Delete " + this.courses[i].name + " course out of the list? ")) {
      this.courses.splice(i, 1);
      this.storage.set('courses', this.courses);
    }
  }

  // ------ Add a new course into the list ----------
  async addCourse() {
    const modal = await this.modalController.create({
      component: EditCoursePage,
      componentProps: {}
    });
    modal.onDidDismiss()
      .then(async (retval: any) => {
        if (retval.data !== undefined) {
          await this.courses.push(retval.data);
          await this.storage.set('courses', this.courses);
        }
      });
    modal.present();
  }

  // View details of selected course
  viewCourseDetail(course: any) {
    this.router.navigate(['/course-detail'], { state: { course } });
  }

}
