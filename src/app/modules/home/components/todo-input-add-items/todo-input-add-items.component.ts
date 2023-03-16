import { Component, DoCheck, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-input-add-items',
  templateUrl: './todo-input-add-items.component.html',
  styleUrls: ['./todo-input-add-items.component.scss'],
})
export class TodoInputAddItemsComponent {
  checkedIsEmptyToCreatePlaceHolder() {
    let placeholder = document
      .getElementById('addInputId')
      ?.getAttribute('placeholder');
    if (!placeholder?.length) {
      document
        .getElementById('addInputId')
        ?.setAttribute('placeholder', 'Digite sua nova task aqui...');
    }
  }
  clearInput() {
    document.getElementById('addInputId')?.setAttribute('placeholder', '');
  }
  @Output() public emmitItemTaskList = new EventEmitter();

  public addItemTaskList: string = '';

  public submitItemTaskList(): void {
    this.addItemTaskList = this.addItemTaskList.trim();
    if (this.addItemTaskList === '') {
      return;
    }
    this.emmitItemTaskList.emit(this.addItemTaskList);
    this.addItemTaskList = '';
  }
}
