import { Component, DoCheck } from '@angular/core';
import { last } from 'rxjs';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  public taskList: Array<TaskList> = JSON.parse(
    localStorage.getItem('list') || '[]'
  );

  constructor() {}

  ngDoCheck(): void {
    if (!this.taskList) {
      return;
    }
    this.sortTaskList();
    this.setLocalStorage();
  }

  public setLocalStorage(): void {
    localStorage.setItem('list', JSON.stringify(this.taskList));
  }

  public sortTaskList(): void {
    this.taskList.sort(
      (first, last) => Number(first.checked) - Number(last.checked)
    );
  }
  setTaskToList(event: string) {
    this.taskList.push({ task: event, checked: false });
  }

  public deleteItemTaskList(index: number): void {
    this.taskList.splice(index, 1);
  }

  public deleteAll(): void {
    const confirm = window.confirm(
      'Vodê deseja realmente deletar todas as suas tasks?'
    );
    if (confirm) {
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number): void {
    if (event.length) {
      return;
    }

    const confirm = window.confirm('Task está vazia, prefere deletar?');
    if (confirm) {
      this.deleteItemTaskList(index);
    }
  }
}
