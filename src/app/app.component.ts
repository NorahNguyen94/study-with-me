import { Component } from '@angular/core';
import { IonApp, IonSplitPane, IonRouterOutlet } from '@ionic/angular/standalone';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonSplitPane, IonRouterOutlet, MenuComponent],
})
export class AppComponent {
  constructor() {}
}
