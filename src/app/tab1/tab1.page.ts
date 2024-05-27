import { Component, OnInit } from '@angular/core';
import { IonHeader, IonButtons, IonMenuButton, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { locationOutline, timeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { StorageServiceService } from '../storage-service.service';
import { NgIf, NgFor } from '@angular/common';
import { DateFormatService } from '../date-format.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonButtons, NgIf, NgFor, IonMenuButton, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonIcon, IonList, IonItem, IonLabel],
})
export class Tab1Page implements OnInit {

  todayDate!: string;
  tomorrowDate!: string;  

  todayClasses: any[] = [];
  todayClassNames: any[] = [];
  todayClassLocations: any[] = [];
  
  tomorrowClasses: any[] = [];
  tomorrowClassNames: any[] = [];
  tomorrowClassLocations: any[] = [];

  courses: any;

  constructor(private storage: StorageServiceService, private date: DateFormatService) {
    addIcons({ locationOutline, timeOutline }); // add icons to use them
  }
  async ngOnInit(): Promise<void> {
    this.courses = await this.storage.get('courses');
    this.setDates();
    this.filterClasses();
  }

  // set today and tomorrow by the specific format (e.g. Monday, May 27)
  setDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    this.todayDate = today.toLocaleDateString('en-AU', options);
    this.tomorrowDate = tomorrow.toLocaleDateString('en-AU', options);

  }

  // get time range for each class
  getTimeRange(dateStr: string) {
    return this.date.getTimeRange(dateStr);
  }

  filterClasses() {
    const tday = new Date();
    const tmor = new Date(tday);
    tmor.setDate(tday.getDate() + 1);

    // convert to ISOTime and ignores the timezone offset
    const today = (new Date(Date.now() - tday.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    const tomorrow = (new Date(tmor.getTime() - tmor.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);

    // filter today classes and tomorrow classes with their names
    this.courses.forEach((course: any) => {
      course.schedules.forEach((schedule: any) => {
        if (schedule.datetime.split('T')[0] === today.split('T')[0]) {
          this.todayClasses.push(schedule);
          this.todayClassNames.push(course.name);
          this.todayClassLocations.push(course.location);
        }
        if (schedule.datetime.split('T')[0] === tomorrow.split('T')[0]) {
          this.tomorrowClasses.push(schedule);
          this.tomorrowClassNames.push(course.name);
          this.tomorrowClassLocations.push(course.location);
        }
      })
    });
  }

}
