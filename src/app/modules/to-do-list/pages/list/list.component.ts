import { Component, signal } from '@angular/core';

// Components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

// Interfaces
import { IListItems } from '../../interface/IListItems.interface';

@Component({
  selector: 'app-list',
  imports: [
    InputAddItemComponent,
    InputListItemComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true)

  #setListItems = signal<IListItems[]>(this.#parseItems())
  public getListItems = this.#setListItems.asReadonly()

  #parseItems(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]')
  }
  public getInputAndAddItem(value: IListItems){
    localStorage.setItem(
      '@my-list', JSON.stringify([...this.#setListItems(), value])
    )

    return this.#setListItems.set(this.#parseItems())
  }

  public deleteAllItems(){
    localStorage.removeItem('@my-list')
    return this.#setListItems.set(this.#parseItems())
  }
}
