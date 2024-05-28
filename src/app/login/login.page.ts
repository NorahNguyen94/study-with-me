import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonList, IonItem, IonCheckbox, IonButton } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonList, IonItem, IonCheckbox, IonButton, RouterLink]
})
export class LoginPage implements OnInit {

  username!: string;
  password!: string;
  usernameInput!: string;
  passwordInput!: string;
  checkUser: boolean = true;

  constructor(private router: Router, private storage: StorageServiceService) { }

  async ngOnInit(): Promise<void> {
    this.username = await this.storage.get('username');
    this.password = await this.storage.get('password');
  }
  login(username: string, password: string) {
    // if(username === this.username && password === this.password) {
    this.router.navigateByUrl('/splash-screen');
    // }
    // else {
    //   this.checkUser = false;
    // }
  }
}
