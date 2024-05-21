import { Component } from '@angular/core';
import { IonHeader, IonButtons, IonMenuButton, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { locationOutline, menu, timeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [ IonButtons, IonMenuButton, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonIcon, IonList, IonItem, IonLabel],
})
export class Tab1Page {
  constructor() {
    addIcons({ locationOutline, timeOutline }); // add icons to use them
  }

}
