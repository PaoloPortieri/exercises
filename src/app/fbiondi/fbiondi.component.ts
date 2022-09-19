import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fbiondi',
  template: `
  <form #f="ngForm" (submit)="add(f)">
    <input
      type="text"
      placeholder="Add User name"
      [ngModel]="user?.label"
      name="label"
    >

    <input
      type="number"
      placeholder="Add User age"
      [ngModel]="user?.age"
      name="age"
    >

    <input
      type="text"
      placeholder="Add User city"
      [ngModel]="user?.city"
      name="city"
    >

    <input
      type="text"
      placeholder="Add User color"
      [ngModel]="user?.color"
      name="color"
    >

<button type="submit">ADD</button>
</form>

<li *ngFor="let user of users"
  (click)="setActive(user)"
  [style.background]="user.color"
>
  {{user.label}}, {{user.city}}, {{user.age}}
</li>

`,
  styleUrls: ['./fbiondi.component.scss']
})


export class FbiondiComponent implements OnInit {
  user?: User;
  users = [
    { label: 'Mario', age: 100, city: 'rome', color: 'red'}
  ];

  add(form: NgForm){
    this.users.push(form.value);
  }

  setActive(user: User){
    this.user = user;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

interface User {
  label: string;
  age: number;
  city: string;
  color: string;
}
