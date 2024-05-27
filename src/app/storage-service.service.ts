import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(private storage: Storage) {
  }

  public async set(key: string, value: any) {
    await this.storage?.set(key, value);
  }

  public async get(key: string) {
    let value = await this.storage?.get(key);
    return value;
  }

  public async remove(key: string) {
    await this.storage?.remove(key);
  }

  public async clear() {
    await this.storage?.clear();
  }

  public async keys(key: string) {
    let value = await this.storage?.keys();
    return value;
  }

  public async updateCourseStorage(course: any, courses: any) {
    const index = courses.findIndex((object: any) => object.name === course.name);
    if (index === -1) return;
    courses[index] = course;
    console.log(courses[index]);
    await this.storage.set('courses', courses);
  }
}
