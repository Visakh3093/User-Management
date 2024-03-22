import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/commonModel.interface';
import { isEmpty } from 'lodash';
import { Router } from '@angular/router';
import { setCurrentUser, setLoginValue } from '../../common/loginData/loginData.action';

@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent implements OnInit {

  userData:User = new Object() as User
  constructor(private store:Store,private router:Router){
    const admin = localStorage.getItem("isAdmin") ?? ''
    if(admin == '1')
    {
      router.navigate(['/'])
    }
   const localJson = localStorage.getItem("currentUser")
   const currentUser = localJson ? JSON.parse(localJson) : {}
   if(isEmpty(currentUser))
   {
    this.handleLogout()
   }
   else
   {
    this.userData = currentUser
    this.store.dispatch(setCurrentUser(currentUser))
   }
  }

  handleLogout()
  {
    this.userData = new Object() as User
    localStorage.removeItem("currentUser")
    this.store.dispatch(setCurrentUser(this.userData))
    this.store.dispatch(setLoginValue({isLogin:false}))
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    
  }
}
