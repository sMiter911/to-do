import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { TodoService } from '../services/todo.service';
import { NgForage, Driver, NgForageCache, CachedItem } from 'ngforage';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
  providers: [NgForage, NgForageCache],
})
export class AddCategoryPage implements OnInit {
  category;
  categories = this.todoService.categories;

  constructor(
    public modalCtrl: ModalController,
    private todoService: TodoService
  ) {
    this.getAllCategories();
  }

  async ngOnInit() {}

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async getAllCategories() {
    this.todoService.getAllCategories();
  }

  async addCategory() {
    await this.todoService.addCategory(this.category);
    this.dismiss();
  }

  async removeCategory(index) {
    this.dismiss();
  }

  async deleteCategories() {
    this.dismiss();
  }

  selectCategory(index) {
    console.log(this.categories[index]);
  }
}
