import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  async handleLogin(event: any) {
    event.preventDefault();
    const loader = await this.todoService.createLoader();
    await loader.present();
    try {
      await this.todoService.signIn(this.email);
      await loader.dismiss();
      await this.todoService.createNotice(
        'Check your email for the login link!'
      );
    } catch (error) {
      await loader.dismiss();
      await this.todoService.createNotice(
        error.error_description || error.message
      );
    }
  }
}
