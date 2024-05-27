import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonDatetime, IonLabel, IonButton, IonInput, IonItem, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ModalController, NavParams } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.page.html',
  styleUrls: ['./add-assignment.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonDatetime, IonButton, IonLabel, IonItem, IonInput, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddAssignmentPage implements OnInit {

  assessment: any = { label: '', weight: '', due_date: '', checked: false };

  constructor(private navParams: NavParams, private modalcontroller: ModalController) {
    addIcons({closeOutline});
  }

  //-- Get variables passes by ModalController in ComponentProps --
  ngOnInit() {
    this.assessment.label = this.navParams.get('label');
    this.assessment.weight = this.navParams.get('weight');
    this.assessment.due_date = this.navParams.get('due_date');
  }

  // add assignment and close modal when user hits the Done button
  addAssignment() {
    this.modalcontroller.dismiss(this.assessment);
  }

  // only close modal
  closeModal() {
    this.modalcontroller.dismiss();
  }
}
