import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  category;
  categories = [];
  newCategory;

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService
  ) {}

  ngOnInit() {}

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async addCategory() {
    this.newCategory = {
      category: this.category,
    };
    const uid = uuidv4();
    if (uid) {
      await this.todoService.addCategory(uid, this.newCategory);
    } else {
      console.log('Error: Cannot add category');
    }
  }

  async getCategories() {
    this.categories = await this.todoService.getAllCategories();
  }

  selectCategory(index) {
    console.log(this.categories[index]);
  }
}
