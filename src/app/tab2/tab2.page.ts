import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonItemOptions, IonItemOption, IonItemSliding, IonTitle, IonContent, IonIcon, IonList, IonItem, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NgFor } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { EditCoursePage } from '../edit-course/edit-course.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [RouterLink, IonHeader, NgFor, IonItemOptions, IonButtons, IonMenuButton, IonItemOption, IonItemSliding, IonToolbar, IonTitle, IonContent, IonList, IonItem, ExploreContainerComponent, IonIcon]
})
export class Tab2Page {

  // courses: any = [
  //   { name: 'Interactive App Development', trimester: 'Trimester1, 2024', location: 'Online' },
  //   { name: 'Computer System and Network', trimester: 'Trimester1, 2024', location: 'Building G23 2.20' },
  //   { name: 'Information System', trimester: 'Trimester1, 2024', location: 'Building G23 2.22' },
  //   { name: 'Database Design', trimester: 'Trimester1, 2024', location: 'Building G17 1.17' },
  // ]

  courses: any = [
    {
      name: 'Interactive App Development',
      trimester: 'Trimester 1, 2024',
      location: 'Online',
      description: 'This course introduce students about modern technologies in mobile app development.',
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
      description: 'This course introduce students about disciplines',
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

  constructor(public router: Router, private modalController: ModalController) {
    addIcons({ addOutline, createOutline, trashOutline });
  }

  // ---- Delete selected course, ask user before deleting ------
  deleteCourse(i: number) {
    if (confirm("Delete " + this.courses[i].name + " course out of the list? ")) {
      this.courses.splice(i, 1);
    }
  }

  // ------ Add a new course into the list ----------
  async addCourse() {
    const modal = await this.modalController.create({
      component: EditCoursePage,
      componentProps: {}
    });
    modal.onDidDismiss()
      .then((retval: any) => {
        if (retval.data !== undefined) {
          this.courses.push(retval.data)
        }
      });
    modal.present();
  }

  // View details of selected course
  viewCourseDetail(course: any) {
    this.router.navigate(['/course-detail'], { state: { course } });
    console.log(course);
  }

}
