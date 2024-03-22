import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserData, params } from '../../models/commonModel.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmpty, map } from 'lodash';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUserList } from '../../common/userData/userData.selector';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  userFormData = new FormGroup({})
  errorObj:{[key:string]:string} = {}
  paramsId: string = ''
  userList:User[] = []
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,private router:Router,private store:Store) { }
  ngOnInit(): void {
  
    this.store.select(selectUserList).subscribe((res)=>{
      this.userList = res
    })

    this.inputData.map((item) => {
      const controlValue = this.formBuilder.control(item.value,item.pattern)
      this.userFormData.addControl(item.key,controlValue)
    })
    this.route.params.subscribe((res: Partial<params>) => {
      this.paramsId = res.id ?? ''
      console.log("Params: ", this.paramsId);
    })

    if (this.userList.length > 0) {
      const userData = this.userList.find((item) => item.email == this.paramsId)
      console.log("userData: ",userData);
      
      if(userData) {
        Object.keys(userData).forEach((key) => {
          const controller = this.userFormData.get(key);
          if (controller) {
            controller.patchValue(userData[key]);
          }
        });
      }
    }


console.log("this.userFormData: ",this.userFormData.value);

  }




  inputData: UserData[] = [
    { label: "Student Name", key: "student_name", type: "text", value: "", pattern: [Validators.required] },
    { label: "Email", key: "email", value: "", type: "text", pattern: [Validators.required, Validators.pattern(this.emailRegex)] },
    { label: "Mobile Number", key: "mobile", type: "text", value: "", pattern: [Validators.required] },
    { label: "Password", key: "password", type: "text", value: "", pattern: [Validators.required] },
    { label: "Admin", key: "isAdmin", type: "toggle", value: false }
  ]

  handleValidate() {
    this.errorObj = {}
    this.inputData.map((item: UserData) => {
      if (this.userFormData.get(item.key)?.errors?.['required']) {
        this.errorObj[item.key] = item.label + " is required"
      }
      if (this.userFormData.get(item.key)?.errors?.['pattern']) {
        this.errorObj[item.key] = "Invalid " + item.label
      }
    })
    return this.errorObj
  }

  handleSubmit()
  {
    console.log("Clicked");
    const userEmail = this.userFormData.get('email')?.value
    this.errorObj = {}
    this.handleValidate()
    if(isEmpty(this.errorObj) && userEmail)
    {
            

      if (this.userList.length > 0) {
        this.userList.forEach((item,index)=>{
          
          if(item.email == this.paramsId)
          {
          console.log("userData: ",this.userFormData.value);
          const updatedData:any[] = [...this.userList]
           updatedData[index] = this.userFormData.value 
           console.log("UpdatedData: ",updatedData);
           localStorage.setItem("UserList",JSON.stringify(updatedData))
           this.router.navigate(['/'])
          }
          
          return
        })
      }

    }
    
    
  }

  


}
