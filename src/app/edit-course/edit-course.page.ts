import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonTextarea, IonIcon, IonSelect, IonSelectOption, IonInput, IonList, IonItem, IonButton, IonHeader, IonDatetimeButton, IonTitle, IonToolbar, IonLabel, IonDatetime, IonModal } from '@ionic/angular/standalone';
import { ModalController, NavParams } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, addOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.page.html',
  styleUrls: ['./edit-course.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonTextarea, IonSelect, IonSelectOption, IonInput, IonList, IonItem, IonButton, IonHeader, IonTitle, IonDatetimeButton, IonLabel, IonDatetime, IonToolbar, IonModal, CommonModule, FormsModule]
})
export class EditCoursePage implements OnInit {

  course: any = {
    name: '',
    trimester: '',
    location: '',
    description: '',
    schedules:
      [
        {
          type: '',
          datetime: '',
          frequency: '',
          mode: ''
        }
      ],
    assessments:
      [
        {
          label: '',
          weight: '',
          due_date: '',
          checked: false
        }
      ]
  };

  scheduleTypes = ['Lecture', 'Workshop', 'Lab', 'Common Time', 'Seminar'];
  actionSheetOptions = {
    header: 'Types',
    subHeader: 'Select a type of schedule'
  }; //to custom the select tag in html

  constructor(private navParams: NavParams, private modalcontroller: ModalController) {
    addIcons({ closeOutline, addOutline, trashOutline });
  }

  ngOnInit() {
    this.course.name = this.navParams.get('name');
    this.course.trimester = this.navParams.get('trimester');
    this.course.location = this.navParams.get('location');
    this.course.description = this.navParams.get('description');
    this.course.schedules = this.navParams.get('schedules');
    this.course.assessments = this.navParams.get('assessments');
  }

  // Only close the modal
  closeModal() {
    this.modalcontroller.dismiss();
  }

  // Add or edit course and close modal
  addCourse() {
    console.log(this.course);
    this.modalcontroller.dismiss(this.course);
  }

  addSchedule() {
    this.course.schedules.push(
      {
        type: '',
        datetime: '',
        frequency: '',
        mode: ''
      });
  }

  removeSchedule(i: number) {
    if (confirm("Delete this schedule out of the list? ")) {
      this.course.schedules.splice(i, 1);
    }
  }
}
