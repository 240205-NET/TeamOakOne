import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

//Decorator function
@Component({
  selector: 'app-register', //extend html vocab
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    location: new FormControl('')
  });

  constructor(private authService: AuthServiceService, private userService: UserService) {
  }
  

  onButtonClick() {
    this.authService.getAllUsers().subscribe((data) => {
      const resultElement = document.getElementById('result');
      if (resultElement) {
        resultElement.innerHTML = JSON.stringify(data);
      }
    });
  }

  toggleLoginVerification() {
    const loginVerificationElement = document.getElementById('inputveri');
    if (loginVerificationElement) {
      loginVerificationElement.style.display = loginVerificationElement.style.display === 'none' ? 'block' : 'none';
    }
  }

  onRegister(){
    var values = this.registerForm.value;
    if(values.username && values.password && values.firstName && values.lastName && values.email && values.location){
      this.authService.register(values.username, values.password, values.firstName, values.lastName, values.email, values.location).subscribe((data) => {
        if(data){
          this.authService.toggleLogin();
          this.userService.setCurrentUser(data);
          console.log('Registration successful');
          console.log(data);
        }
        else{
          this.toggleLoginVerification();
          console.log('Registration failed');
        }
      });
    }
    else{
      this.toggleLoginVerification();
      console.log('Invalid input');
    }
  }

}
