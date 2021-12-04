import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginInfo:any;
  constructor(private service: UsersService,
    public toast: ToastrService, public router: Router) { }

  ngOnInit(): void {
  }
  onLogin(form :NgForm){
    this.service.login1(form.value["username"],form.value["password"]).subscribe((res)=>{
      if(res){

        console.log(res);
        this.loginInfo = res;
        this.router.navigate(["/accueil"]);
        localStorage.setItem('isLogin', JSON.stringify(this.loginInfo));
      }else{
        this.service.login2(form.value["username"],form.value["password"]).subscribe((res)=>{
          if(res){
            console.log(res);
            this.loginInfo = res;
            this.router.navigate(["/userSpace"]);
            localStorage.setItem('isLogin', JSON.stringify(this.loginInfo));
          }else {
            this.toast.error("Login ou mot de passe incorrect");
            this.router.navigate(["/login"])
            console.log("login non connecter");
          
        } 
        
      })
    }
  })
}
}
