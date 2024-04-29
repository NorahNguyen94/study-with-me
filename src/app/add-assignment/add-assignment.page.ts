import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonButton, IonInput, IonItem, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ModalController, NavParams } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.page.html',
  styleUrls: ['./add-assignment.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonLabel, IonItem, IonInput, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddAssignmentPage implements OnInit {

  assignment: any = { name: '', weight: '', due_date: '' };

  constructor(private navParams: NavParams, private modalcontroller: ModalController) { }

  //-- Get variables passes by ModalController in ComponentProps --
  ngOnInit() {
    this.assignment.name = this.navParams.get('name');
    this.assignment.weight = this.navParams.get('weight');
    this.assignment.due_date = this.navParams.get('due_date');
  }

  //-- Close the modal when user hits the Done button
  closemodal() {
    this.modalcontroller.dismiss(this.assignment);
  }
}
