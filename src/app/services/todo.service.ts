/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';
import { Todo } from '../models/todo';

export interface Profile {
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private supabase: SupabaseClient;
  _todos = new Subject<Todo[]>();
  _categories = new Subject<Category[]>();

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get user() {
    return this.supabase.auth.user();
  }

  get session() {
    return this.supabase.auth.session();
  }

  get profile() {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', this.user?.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signIn({ email });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update, {
      returning: 'minimal', // Don't return the value after inserting
    });
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  async createNotice(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 5000 });
    await toast.present();
  }

  createLoader() {
    return this.loadingCtrl.create();
  }

  async addTask(task: Todo) {
    const newTask = {
      task: task.task,
      category: task.category,
      priority: task.priority,
      due_date: task.due_date,
      user_id: this.supabase.auth.user()?.id,
    };
    const { data, error } = await this.supabase
      .from('task_table')
      .insert([newTask]);
  }

  get todos(): Observable<Todo[]> {
    return this._todos.asObservable();
  }
  get categories(): Observable<Category[]> {
    return this._categories.asObservable();
  }

  async getAllTasks() {
    const { data, error } = await this.supabase.from('task_table').select(`*`);
    this._todos.next(data);
  }

  async deleteTask(id) {
    const { data, error } = await this.supabase
      .from('task_table')
      .delete()
      .eq('id', id);
  }

  async updateTask(task: Todo) {
    const { data, error } = await this.supabase
      .from('task_table')
      .update(task)
      .eq('id', task.id);
  }

  async addCategory(category: string) {
    const newCategory = {
      category,
      user_id: this.supabase.auth.user()?.id,
    };
    const { data, error } = await this.supabase
      .from('categories')
      .insert([newCategory]);
  }

  async getAllCategories() {
    const { data, error } = await this.supabase.from('categories').select(`*`);
    this._categories.next(data);
  }

  async getCategory(id) {
    console.log(id);
  }
}
