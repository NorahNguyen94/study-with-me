import { Component, ViewChild } from '@angular/core';
import { IonHeader, IonRouterOutlet, IonMenu, IonApp, IonSplitPane, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, searchOutline, bookOutline } from 'ionicons/icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonHeader, IonRouterOutlet, IonMenu, IonApp, IonSplitPane, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon]
})
export class MenuComponent {
  @ViewChild(IonMenu, { static: true }) menu!: IonMenu;

  constructor(public router: Router) {
    addIcons({ homeOutline, searchOutline, bookOutline })
  }

  /*---
  When user clicks a link, they will be directed to the page of that link and the menu will be closed
  --*/
  directPage(route: string) {
    this.router.navigateByUrl(route);
    this.menu.close();
  }
}
