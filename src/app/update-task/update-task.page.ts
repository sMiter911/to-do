/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task;
  categories = this.todoService.categories;
  taskName;
  taskDueDate;
  taskPriority;
  taskCategory;
  taskObject;

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService
  ) {
    this.getAllCategories();
  }

  ngOnInit() {
    this.fillData();
  }

  async getAllCategories() {
    this.todoService.getAllCategories();
  }

  fillData() {
    this.taskName = this.task.task;
    this.taskDueDate = this.task.due_date;
    this.taskPriority = this.task.priority;
    this.taskCategory = this.task.category;
  }

  selectCategory(item) {
    this.taskCategory = item;
  }

  async dismiss() {
    await this.modalCtrl.dismiss(this.taskObject);
  }

  async updateTask() {
    this.taskObject = {
      id: this.task.id,
      task: this.taskName,
      due_date: this.taskDueDate,
      priority: this.taskPriority,
      category: this.taskCategory,
    };
    await this.todoService.updateTask(this.taskObject);
    this.dismiss();
  }
}
