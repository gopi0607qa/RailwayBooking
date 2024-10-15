import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Customer, IAPIResponse, Login } from './Model/train';
import { FormsModule } from '@angular/forms';
import { TrainService } from '../Services/train.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RailwayBooking';

  RegisterObj: Customer = new Customer();
  trainService = inject(TrainService);
  LoginObj: Login = new Login();
  loggedUser: Customer = new Customer();
  
  constructor() {
    try{
    const localData = localStorage.getItem("trainAPP");
    if(localData != null){
      this.loggedUser = JSON.parse(localData);
      }
    } catch(e){
      console.log("Local Storage Not Defined error occured");
    }

  }

  onRegister() {

    this.trainService.createNewCustomer(this.RegisterObj).subscribe((res: IAPIResponse) => {

      if (res.result) {
        alert("Registered Successfully..!")
        this.RegisterObj.email='';
        this.RegisterObj.firstName='';
        this.RegisterObj.lastName='';
        this.RegisterObj.password='';
        this.RegisterObj.phone='';
        this.closeRegister();
      }
      else {
        alert(res.message)
      }
    })

  }

  onLogin() {

    if (this.LoginObj.phone == '' && this.LoginObj.password == '') {
      alert("Enter Phone and Password")
    }
    else if (this.LoginObj.phone == '') {
      alert("Enter Phone")
    }
    else if (this.LoginObj.password == '') {
      alert("Enter Password")
    }
    else {
      this.trainService.loginCustomer(this.LoginObj).subscribe((res: IAPIResponse) => {

        if (res.result) {

          localStorage.setItem("trainAPP", JSON.stringify(res.data));
          this.loggedUser = res.data;
          this.closeLogin();
          alert("Login Successfully..!")
          this.LoginObj.phone='';

        }
        else {
          alert(res.message)
        }
      })
    }
  }

  onLogout() {
    this.loggedUser = new Customer();
    localStorage.removeItem('trainAPP');
    alert("Logged out SUCCESSFULLY..!!")
  }


  openRegister() {
    const modal = document.getElementById("registermodal");
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  closeRegister() {
    const modal = document.getElementById("registermodal");
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  openLogin() {
    const modal = document.getElementById("loginmodal");
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  closeLogin() {
    const modal = document.getElementById("loginmodal");
    if (modal != null) {
      modal.style.display = 'none';
    }
  }
}
