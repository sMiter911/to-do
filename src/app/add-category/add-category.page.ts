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
  categories = [];
  newCategory;

  constructor(
    public modalCtrl: ModalController,
    private readonly ngf: NgForage,
    private readonly cache: NgForageCache
  ) {}

  public getItem<T = any>(key: string): Promise<T> {
    return this.ngf.getItem<T>(key);
  }

  public getCachedItem<T = any>(key: string): Promise<T | null> {
    return this.cache.getCached<T>(key).then((r: CachedItem<T>) => {
      if (!r.hasData || r.expired) {
        return null;
      }

      return r.data;
    });
  }

  public setItem<T = any>(key: string, data: T): Promise<T> {
    return this.ngf.setItem<T>(key, data);
  }

  public removeItem<T = string>(key: string): Promise<void> {
    return this.ngf.removeItem(key);
  }

  public async iterate<T, U>(
    iteratee: (value: T, key: string, iterationNumber: number) => U
  ): Promise<U> {
    return await this.ngf.iterate(iteratee);
  }

  public async clear(): Promise<void> {
    return await this.ngf.clear();
  }

  async ngOnInit() {
    this.ngf.name = 'Categories';
    this.cache.driver = Driver.INDEXED_DB;

    await this.iterate((value, key, iterationNumber) => {
      this.categories.push(value);
    });
    console.log(this.categories);
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async addCategory() {
    const uid = uuidv4();
    this.newCategory = {
      category: this.category,
      uid,
    };
    if (uid) {
      await this.setItem(uid, this.newCategory);
    } else {
      console.log('Error: Cannot add category');
    }
    this.dismiss();
  }

  async removeCategory(index) {
    this.removeItem(this.categories[index].uid);
    this.dismiss();
  }

  async deleteCategories() {
    await this.clear();
    this.dismiss();
  }

  selectCategory(index) {
    console.log(this.categories[index]);
  }
}
