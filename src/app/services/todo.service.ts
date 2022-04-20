import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  addTask(key, value) {
    this.storage.set(key, value);
  }

  deleteTask(key) {
    this.storage.remove(key);
  }

  updateTask(key, task) {
    this.storage.set(key, task);
    this.getAllTasks();
  }

  getAllTasks() {
    const task: any = [];
    this.storage.forEach((key, value, index) => {
      task.push({ key: value, value: key });
    });
    return task;
  }
}
