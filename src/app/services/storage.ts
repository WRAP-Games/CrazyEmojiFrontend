import { DOCUMENT, inject, Injectable } from '@angular/core';
import { StorageKeys } from '../../definitions';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  private document: Document = inject(DOCUMENT);

  saveToStorage(key: StorageKeys, value: any):void {
    if (value === null || value === undefined) return;
    try {
      const stringifiedValue = typeof value === 'string' ? value : JSON.stringify(value);
      this.document.defaultView?.localStorage.setItem(key, stringifiedValue);
    } catch (error) {
      console.log(error);
    }
  }

  getFromStorage(key: StorageKeys, defaultValue: any = null):any {
    try {
      return this.document.defaultView?.localStorage.getItem(key) ?? defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  }

  removeFromStorage(key: StorageKeys):void {
    try {
      this.document.defaultView?.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }
}