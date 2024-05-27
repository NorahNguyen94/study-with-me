import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor() { }

  // get time range for each class
  public getTimeRange(dateStr: string) {
    const date = new Date(dateStr);
    const startTime = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
    const endTime = String(date.getHours() + 2).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
    return startTime + '-' + endTime;
  }

  // get day value for the corresponding date
  getDay(dateStr: string) {
    const date = new Date(dateStr);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  // get date without time
  getDateOnly(dateStr: string) {
    return dateStr.split('T')[0];
  }

}
