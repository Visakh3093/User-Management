import { Component, Input, OnInit, Output, input } from '@angular/core';
import { User, UserData } from '../../models/commonModel.interface';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEmpty, map } from 'lodash';
import { Store } from '@ngrx/store';
import { selectUserList } from '../../common/userData/userData.selector';
import { setUserList } from '../../common/userData/userData.action';
import { setModal } from '../../common/modal/modal.action';
import { selectModal } from '../../common/modal/modal.selector';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() itemprop: User = new Object() as User
  @Input() index: number = 0

  
  
  constructor(private router: Router, private store: Store) {

  }

  popUp(email:string | undefined)
  {
    
    
    if(email)
    {
      
      this.store.dispatch(setModal({popup:true,email:email}))
      this.store.select(selectModal).subscribe(res=>{
        console.log("Res: ",email);
        
      })
    }
  }
 


}
