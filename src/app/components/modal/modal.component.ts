import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { setModal } from '../../common/modal/modal.action';
import { selectModal } from '../../common/modal/modal.selector';
import { User } from '../../models/commonModel.interface';
import { selectUserList } from '../../common/userData/userData.selector';
import { setUserList } from '../../common/userData/userData.action';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  dltEmail: string = ''
  userList: User[] = []
  constructor(private store: Store) { }
  
  ngOnInit(): void {
    this.store.select(selectModal).subscribe(res => {
      console.log("REs: ", res);
      this.dltEmail = res.email ?? ''
    })
    
  }


  handleClose() {
    this.store.dispatch(setModal({ popup: false }))
  }


  handleDlt() {
    console.log("Email: ", this.dltEmail);
    let updatedUserList: User[];
    this.store.select(selectUserList).subscribe((res) => {
      this.userList = res
    })


    updatedUserList = [...this.userList];
    updatedUserList.forEach((item: User, index: number) => {
      if (item.email == this.dltEmail) {
        updatedUserList.splice(index, 1);
      }

    })

    this.store.dispatch(setUserList({ UserList: updatedUserList }))
    localStorage.setItem("UserList", JSON.stringify(updatedUserList))
    this.store.dispatch(setModal({ popup: false }))
  }
}
