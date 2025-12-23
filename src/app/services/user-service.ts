import { Injectable } from '@angular/core';
import { User } from '../../definitions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  
  getOrCreateUser(username: string):User {
    const foundedUser = this.users.find(user => user.username === username);
    if (foundedUser) return foundedUser;
    
    const newUser: User = { username: username };
    this.users.push(newUser);
    return newUser;
  }
}
