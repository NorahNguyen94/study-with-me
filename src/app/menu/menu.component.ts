import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonRouterOutlet, IonMenu, IonApp, IonSplitPane, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, searchOutline, bookOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonHeader, IonRouterOutlet, IonMenu, IonApp, IonSplitPane, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon]
})
export class MenuComponent implements OnInit {
  @ViewChild(IonMenu, { static: true }) menu!: IonMenu;

  username: any;
  imageFile: any;

  constructor(public router: Router, private storage: StorageServiceService) {
    addIcons({ homeOutline, searchOutline, bookOutline })
  }

  async ngOnInit(): Promise<void> {
    this.username = await this.storage.get('username');
    this.imageFile = await this.storage.get('avatar');
  }

  /*---
  When user clicks a link, they will be directed to the page of that link and the menu will be closed
  --*/
  directPage(route: string) {
    this.router.navigateByUrl(route);
    this.menu.close();
  }

  /*---
  Set avatar of the app
  --*/
  imageSelected(files: any) {
    // create the file reader to perform the data URL conversion
    let fileReader = new FileReader(); 

    // create an event handler to be called when the file has loaded
    fileReader.onload = e => {
      this.imageFile = fileReader.result;
      this.storage.set('avatar', this.imageFile);
    }

    // pass in the file to read and instruct it to convert to a data URL
    fileReader.readAsDataURL(files[0]);
  }
}
