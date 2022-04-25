import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private todoService: TodoService, private router: Router) {
    this.todoService.authChanges((_, session) => {
      console.log(session);
      if (session?.user) {
        this.router.navigate(['/home']);
      }
    });
  }
}
