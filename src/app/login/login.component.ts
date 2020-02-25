import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  showSubmit=false

  constructor(private _formBuilder: FormBuilder,private router:Router, private service: ApiService, private toastr: ToastrService) {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  authenticateUser() {
    this.showSubmit=true
    let data = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.service.loogedIn(data).subscribe((user: any) => {
      console.log('response', user)
      if (user.token) {
        let data = {
          email: user.data.email,
          username: user.data.username,
          token: user.token
        }
        localStorage.setItem('userinfo', JSON.stringify(data))
        this.toastr.success('logged in successfully')
        this.router.navigate(['navbar'])
      }
      else{
        console.log("ijhjh")
        this.showSubmit=false
        this.toastr.error('',user.message)
      }
    }, (err) => {
      this.toastr.error('Something went wrong')
    })
  }
}
