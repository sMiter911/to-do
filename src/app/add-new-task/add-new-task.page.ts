/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { AddCategoryPage } from '../add-category/add-category.page';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories = this.todoService.categories;
  taskName;
  taskDueDate;
  taskPriority;
  taskCategory;
  taskObject;
  taskIsDone = false;

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService
  ) {
    this.getAllCategories();
  }

  ngOnInit() {}

  async dismiss() {
    await this.modalCtrl.dismiss(this.taskObject);
  }

  async getAllCategories() {
    this.todoService.getAllCategories();
  }

  selectCategory(item) {
    this.taskCategory = item;
  }

  async addTask() {
    this.taskObject = {
      task: this.taskName,
      due_date: this.taskDueDate,
      priority: this.taskPriority,
      category: this.taskCategory,
      is_done: this.taskIsDone,
    };
    const uid = uuidv4();
    if (uid) {
      await this.todoService.addTask(this.taskObject);
    } else {
      console.log('Error: Cannot save empty task');
    }
    this.dismiss();
  }

  async addCategory() {
    const modal = await this.modalCtrl.create({
      component: AddCategoryPage,
    });

    modal.onDidDismiss().then(() => {
      this.getAllCategories();
    });

    return await modal.present();
  }
}
