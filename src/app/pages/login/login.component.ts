import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm, User } from '../../models/commonModel.interface';
import { Store } from '@ngrx/store';
import { selectUserList } from '../../common/userData/userData.selector';
import { isEmpty } from 'lodash';
import { setUserList } from '../../common/userData/userData.action';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { selectCurrentValue, selectLoginValue } from '../../common/loginData/loginData.selector';
import { setCurrentUser, setLoginValue } from '../../common/loginData/loginData.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.3s ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  errorObj: { [key: string]: string } = {}
  keys: string[] = []
  emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  userList: User[] = []
  studentData: User = new Object as User
  success: boolean = false
  adminRoute: boolean = false
  empty:boolean = false
  constructor(private store: Store, private router: Router) {

    const currentJson = localStorage.getItem("currentUser")
    const currentUser = currentJson ? JSON.parse(currentJson) : {}
    if(!isEmpty(currentUser))
    {
      const admin = localStorage.getItem("isAdmin") ?? ""
      if(admin == "1")
      {
        this.router.navigate([''])
      }
      else
      {
        this.router.navigate(['/student'])
      }
    }
  }
  handleClose() {
    this.empty = false
  }

  ngOnInit(): void {
    const userListJSON = localStorage.getItem("UserList");
    this.store.dispatch(setUserList({ UserList: userListJSON ? JSON.parse(userListJSON) : [] }));
    this.store.select(selectUserList).subscribe((res) => {
      this.userList = res
    })

    // if(isEmpty(this.userList))
    // {
    //   this.empty = true
    // }
  }

  loginFormData = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailRegex)]),
    password: new FormControl("", [Validators.required]),
  })

  inputData: LoginForm[] = [
    { label: "Your email", placeholder: "name@gmail.com", key: "email", value: "", type: "text", pattern: [Validators.required, Validators.pattern(this.emailRegex)] },
    { label: "Your password", placeholder: "enter your password", key: "password", type: "password", value: "", pattern: [Validators.required] }
  ]


  handleValidate() {
    this.errorObj = {}
    Object.keys(this.loginFormData.controls).map((item: string) => {
      if (this.loginFormData.get(item)?.errors?.['required']) {
        this.errorObj[item] = item + " is required"
      }
      if (this.loginFormData.get(item)?.errors?.['pattern']) {
        this.errorObj[item] = "invalid " + item
      }
    })
    return this.errorObj
  }

  handleSubmit() {
    this.errorObj = {}
    this.handleValidate()
    if(!isEmpty(this.errorObj)) return
    this.handleEmailCheck()
    if (isEmpty(this.errorObj)) {

      // this.success = true
      // setTimeout(()=>{
      //   this.success = false
      // },2000)

      this.router.navigate(['/home'])
      this.store.dispatch(setLoginValue({isLogin:true}))
      localStorage.setItem("currentUser",JSON.stringify(this.studentData))
      this.store.dispatch(setCurrentUser(this.studentData))
      this.store.select(selectCurrentValue).subscribe((res)=>{
        console.log("REs: ",res);
      })
      if (this.adminRoute) {
        this.router.navigate(['/'])
      }
      else {
        this.router.navigate(['/student'])
      }
    }
    else {
      console.log(this.errorObj);

    }



  }

  handleEmailCheck() {
    const emailController = this.loginFormData.get('email')?.value
    const passwordController = this.loginFormData.get('password')?.value
    console.log("email: ", emailController, " password: ", passwordController);
    console.log("userList: ", this.userList);

    if (this.userList.length > 0) {
      this.userList.map((item) => {
        if (item.email == emailController) {
          this.studentData = item
        }
      })
      console.log("StudentData: ", this.studentData);

      if (isEmpty(this.studentData)) {
        // this.empty = true
        return this.errorObj["email"] = "User not found"
      }
      else {
        if (this.studentData.password == passwordController) {
          if (this.studentData.isAdmin == true) {
            this.adminRoute = true
          }
          else {
            this.adminRoute = false
          }

          return true
        }
        else {
          return this.errorObj['password'] = "incorrect password"
        }
      }
    }
    this.empty = true
    return this.errorObj["user"] = "User not found"
  }




}

