/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddCategoryPage } from '../add-category/add-category.page';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TodoService } from '../services/todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items = this.todoService.todos;
  isDone = false;

  today: number = Date.now();
  completedTask: {
    id: any;
    task: any;
    due_date: any;
    priority: any;
    category: any;
    is_done: boolean;
  };

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService
  ) {
    this.getAllTasks();
  }

  async addTask() {
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage,
    });

    modal.onDidDismiss().then(() => {
      this.getAllTasks();
    });

    return await modal.present();
  }

  async addCategory() {
    const modal = await this.modalCtrl.create({
      component: AddCategoryPage,
    });

    modal.onDidDismiss().then(() => {
      this.getAllTasks();
    });

    return await modal.present();
  }

  getAllTasks() {
    this.todoService.getAllTasks();
  }

  async delete(key) {
    console.log(key);
    await this.todoService.deleteTask(key);
    this.getAllTasks();
  }

  async update(selectedTask) {
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage,
      componentProps: { task: selectedTask },
    });
    modal.onDidDismiss().then(() => {
      this.getAllTasks();
    });

    return await modal.present();
  }

  async completeTask(item) {
    this.isDone = !this.isDone;
    this.completedTask = {
      id: item.id,
      task: item.task,
      due_date: item.due_date,
      priority: item.priority,
      category: item.category,
      is_done: this.isDone,
    };
    await this.todoService.updateTask(this.completedTask);
    this.getAllTasks();
  }
}
