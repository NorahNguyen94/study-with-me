import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonList, IonItem, IonCheckbox, IonButton } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonList, IonItem, IonCheckbox, IonButton, RouterLink]
})
export class SignupPage {

  username!: string;
  password!: string;
  passwordRetyped!: string;
  validator = true;

  constructor(private storage: StorageServiceService, private router: Router) { }

  async signup(username: string, password: string, passretyped: string) {
    if (username !== null && password != null && password === passretyped) {
      await this.storage.set('username', username);
      await this.storage.set('password', password);
      this.router.navigateByUrl('/');
    }
    else {
      this.validator = false;
    }
  }

  resetData() {
    this.username = '';
    this.password = '';
    this.passwordRetyped = '';
  }
}
