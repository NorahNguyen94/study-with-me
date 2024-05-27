import { Component } from '@angular/core';
import { IonApp, IonSplitPane, IonRouterOutlet } from '@ionic/angular/standalone';
import { MenuComponent } from './menu/menu.component';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonSplitPane, IonRouterOutlet, MenuComponent],
})
export class AppComponent {
  constructor(private storage: Storage) {
    this.init();
  }
  async init() {
    await this.storage.create();
  }
}
