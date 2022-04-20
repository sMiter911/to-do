import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todoList = [
    {
      itemName: 'Coding',
      itemDueDate: '2022-04-05',
      itemPriority: 'high',
      itemCategory: 'Work',
    },
    {
      itemName: 'Assignment',
      itemDueDate: '2022-05-01',
      itemPriority: 'medium',
      itemCategory: 'School',
    },
    {
      itemName: 'Shopping',
      itemDueDate: '2022-04-27',
      itemPriority: 'low',
      itemCategory: 'Personal',
    },
    {
      itemName: 'Gym',
      itemDueDate: '2022-04-27',
      itemPriority: 'low',
      itemCategory: 'Personal',
    },
  ];

  today: number = Date.now();

  constructor() {}
}
