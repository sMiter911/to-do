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
  categories = ['work', 'school', 'personal'];
  taskName;
  taskDueDate;
  taskPriority;
  taskCategory;
  taskObject;

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService
  ) {}

  ngOnInit() {
    this.fillData();
  }

  fillData() {
    this.taskName = this.task.value.itemName;
    this.taskDueDate = this.task.value.itemDueDate;
    this.taskPriority = this.task.value.itemPriority;
    this.taskCategory = this.task.value.itemCategory;
  }

  selectCategory(index) {
    this.taskCategory = this.categories[index];
  }

  async dismiss() {
    await this.modalCtrl.dismiss(this.taskObject);
  }

  async updateTask() {
    this.taskObject = {
      itemName: this.taskName,
      itemDueDate: this.taskDueDate,
      itemPriority: this.taskPriority,
      itemCategory: this.taskCategory,
    };
    const uid = this.task.key;
    await this.todoService.updateTask(uid, this.taskObject);
    this.dismiss();
  }
}
