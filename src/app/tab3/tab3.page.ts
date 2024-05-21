import { Component } from '@angular/core';
import { IonHeader, IonSelectOption, IonButtons, IonMenuButton, IonButton, IonInput, IonLabel, IonToolbar, IonSelect, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [NgFor, IonHeader, IonButton, IonButtons, IonMenuButton, IonSelectOption, IonInput, IonLabel, IonSelect, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab3Page {
  constructor() { }
}
