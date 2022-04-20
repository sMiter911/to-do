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
  todoList = [];

  today: number = Date.now();

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
    this.todoList = this.todoService.getAllTasks();
    console.log(this.todoList);
  }

  async delete(key) {
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
}
