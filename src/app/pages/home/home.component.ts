import { Component } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Router, RouterLink } from '@angular/router';
import { isEmpty } from 'lodash';
import { Store } from '@ngrx/store';
import { setUserList } from '../../common/userData/userData.action';
import { User } from '../../models/commonModel.interface';
import { selectUserList } from '../../common/userData/userData.selector';
import { setCurrentUser, setLoginValue } from '../../common/loginData/loginData.action';
import { selectModal } from '../../common/modal/modal.selector';
import { setModal } from '../../common/modal/modal.action';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListComponent,RouterLink,ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userList:User[] = []
  currentUserData:User = new Object() as User
  popUp:boolean = false
  dlt:boolean = false
  constructor(private store:Store,private router:Router){
   
    this.store.select(selectModal).subscribe(res=>{
      this.popUp = res.popup
    })
    const currentJson = localStorage.getItem("currentUser")
    
    const currentUser = currentJson ? JSON.parse(currentJson) : {}
    if(isEmpty(currentUser))
    {
     this.handleLogout()
    }
    else
    {
      localStorage.setItem("isAdmin","1")
     this.currentUserData = currentUser
     this.store.dispatch(setCurrentUser(currentUser))
    }

    const userListJSON = localStorage.getItem("UserList");    
    this.store.dispatch(setUserList({ UserList: userListJSON ? JSON.parse(userListJSON) : [] }));
    this.store.select(selectUserList).subscribe((res)=>{
      this.userList = res
    })

  }
  handleLogout()
  {
    this.currentUserData = new Object() as User
    localStorage.removeItem("currentUser")
    localStorage.removeItem("isAdmin")
    this.store.dispatch(setCurrentUser(this.currentUserData))
    this.store.dispatch(setLoginValue({isLogin:false}))
    this.router.navigate(['/login'])
  }


  handleEmpty()
  {
    return isEmpty(this.userList)
  }
}
