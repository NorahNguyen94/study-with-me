import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonTextarea, IonSelect, IonSelectOption, IonInput, IonList, IonItem, IonButton, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ModalController, NavParams } from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.page.html',
  styleUrls: ['./edit-course.page.scss'],
  standalone: true,
  imports: [IonContent, IonTextarea, IonSelect, IonSelectOption, IonInput, IonList, IonItem, IonButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditCoursePage implements OnInit {

  course: any = { course_name: '', trimester: '', location: '', description: '' };

  constructor(private navParams: NavParams, private modalcontroller: ModalController) { }

  ngOnInit() {
    this.course.name = this.navParams.get('');
  }

  // Close the modal
  closemodal() {
    this.modalcontroller.dismiss(this.course);
  }
}
