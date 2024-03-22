export interface UserData {
    label: string;
    type:string
    key: string;
    value: string | boolean;
    pattern?:any
  }

  export interface User {
    [key:string]:string | undefined | boolean;
    student_name: string | undefined;
    email: string | undefined;
    mobile: string | undefined;
    password: string | undefined;
    isAdmin: boolean | undefined;
  }

  export interface params {
    id: string;
  }

  export interface LoginForm{
    label: string;
    type:string
    key: string;
    value: string | boolean;
    pattern?:any,
    placeholder:string
  }

