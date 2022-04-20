/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _taskStorage: Storage | null = null;
  private _categoryStorage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const taskStorage = await this.storage.create();
    const categoryStorage = await this.storage.create();

    this._taskStorage = taskStorage;
    this._categoryStorage = categoryStorage;
  }

  addTask(key, value) {
    this._taskStorage?.set(key, value);
  }

  deleteTask(key) {
    this._taskStorage?.remove(key);
  }

  updateTask(key, task) {
    this._taskStorage?.set(key, task);
    this.getAllTasks();
  }

  getAllTasks() {
    const task: any = [];
    this._taskStorage?.forEach((key, value, index) => {
      task.push({ key: value, value: key });
    });
    return task;
  }
}
