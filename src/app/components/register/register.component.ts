import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserData } from '../../models/commonModel.interface';
import { CommonModule } from '@angular/common';
import { isEmpty, map, set } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  errorObj: { [key: string]: string } = {}
  emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  regex:RegExp = /^[0-9]{10}$/;
  studentFormData = new FormGroup({})
  constructor(private formBuilder: FormBuilder, private router: Router) {
    const admin = localStorage.getItem("isAdmin") ?? ""
    if(admin != "1")
    {
      this.router.navigate(['/login'])
    }
    this.formGenerator()
  }

  initialUserData = {
    student_name: '',
    email: '',
    mobile: '',
    password: '',
    isAdmin: false
  };

  formGenerator() {
    this.inputData.map((item: UserData) => {
      const value = this.formBuilder.control(item.value, item?.pattern)
      this.studentFormData.addControl(item.key, value)
    })
    console.log("StudentFormData: ", this.studentFormData.value);
  }

  handleValidate() {
    this.errorObj = {}
    this.inputData.map((item: UserData) => {
      if (this.studentFormData.get(item.key)?.errors?.['required']) {
        this.errorObj[item.key] = item.label + " is required"
      }
      if (this.studentFormData.get(item.key)?.errors?.['pattern']) {
        this.errorObj[item.key] = "Invalid " + item.label
      }
    })
    return this.errorObj
  }

  handleSubmit() {
    this.errorObj = {};
    this.handleValidate();

    // if (!isEmpty(this.errorObj)) return; 
    const userEmail = this.studentFormData.get('email')
    const userListJSON = localStorage.getItem("UserList");

    const userList = userListJSON ? JSON.parse(userListJSON) : [];

    if (!isEmpty(userList) && userEmail) {
      userList.map((item: User) => {

        if (item.email == userEmail.value) {
          this.errorObj['email'] = "Email Already Exist"
        }
        return this.errorObj
      })
    }
    if (!isEmpty(this.errorObj)) return;
    const upadatedUserList = [...userList]
    upadatedUserList.unshift(this.studentFormData.value);
    localStorage.setItem("UserList", JSON.stringify(upadatedUserList));
    this.studentFormData.reset(this.initialUserData);

    this.router.navigate(['/'])
  }


  inputData: UserData[] = [
    { label: "Student Name", key: "student_name", type: "text", value: "", pattern: [Validators.required] },
    { label: "Email", key: "email", value: "", type: "text", pattern: [Validators.required, Validators.pattern(this.emailRegex)] },
    { label: "Mobile Number", key: "mobile", type: "text", value: "", pattern: [Validators.required,Validators.pattern(this.regex)] },
    { label: "Password", key: "password", type: "password", value: "", pattern: [Validators.required] },
    { label: "Admin", key: "isAdmin", type: "toggle", value: false }
  ]

}

