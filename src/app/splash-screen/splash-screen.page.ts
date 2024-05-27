import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule]
})
export class SplashScreenPage {

  constructor(private router: Router) {
    this.displayScreen();
  }

  async displayScreen() {
    setTimeout(() => {
      this.router.navigateByUrl('/tabs');
    }, 3000);
  }

}
