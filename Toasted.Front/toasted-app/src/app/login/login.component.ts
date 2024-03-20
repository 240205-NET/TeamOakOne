import { Component} from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { WeatherAPIService } from '../services/weather-api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./alt_login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    location: new FormControl('')
  });

  geoLocationForm = new FormGroup({
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl('')
  });

  constructor(private openWeatherService: WeatherAPIService, private authService: AuthServiceService, private userService: UserService) {



  }
users: object[] = []
  onButtonClick() {
    this.authService.getAllUsers().subscribe((data) => {
      this.users = data
      // const resultElement = document.getElementById('result');
      // if (resultElement) {
      //   resultElement.innerHTML = JSON.stringify(data);
      // }
    });
  }

  toggleLoginVerification() {
    const loginVerificationElement = document.getElementById('inputveri');
    if (loginVerificationElement) {
      loginVerificationElement.style.display = loginVerificationElement.style.display === 'none' ? 'block' : 'none';
    }
  }

  onSubmit() {
    var values = this.loginForm.value;
    if (values.username && values.password) {
      this.authService.login(values.username, values.password).subscribe((data) => {
        if (data) {
          this.authService.toggleLogin();
          this.userService.setCurrentUser(data);
        }
        else {
          this.toggleLoginVerification();
          console.log('Login failed');
        }
      });
      // HOTFIX ALWAYS LOG IN
      this.authService.toggleLogin();
    }
    else {
      this.toggleLoginVerification();
      console.log('Invalid input');
    }
  }

  onRegister() {
    var values = this.registerForm.value;
    if (values.username && values.password && values.firstName && values.lastName && values.email && values.location) {
      this.authService.register(values.username, values.password, values.firstName, values.lastName, values.email, values.location).subscribe((data) => {
        if (data) {
          this.authService.toggleLogin();
          this.userService.setCurrentUser(data);
          console.log('Registration successful');
          console.log(data);
        }
        else {
          this.toggleLoginVerification();
          console.log('Registration failed');
        }
      });
    }
    else {
      this.toggleLoginVerification();
      console.log('Invalid input');
    }
  }

  getLocation() {
    var values = this.geoLocationForm.value;

    const resultElement = document.getElementById('locationJson');
    if (values.city && values.state && values.country) {
      this.openWeatherService.getCoordinates(values.city, values.state, values.country).subscribe((data) => {
        if (data) {
          if (resultElement) {
            resultElement.innerHTML = JSON.stringify(data);
          }
        }
        else {
          if (resultElement) {
            resultElement.innerHTML = 'Invalid input';
          }
        }
      });
    }
    else {
      console.log('Invalid input');
    }

  }


  // private $bgs: HTMLDivElement[] = [];
  // private pos = 0;
  // private lastPos = 0;
  // private delay = 6000;

  // ngOnInit(): void {
  //   this.playInitialAnimations();
  //   this.setupSlideshowBackground();
  // }

  // private playInitialAnimations(): void {
  //   window.addEventListener('load', () => {
  //     window.setTimeout(() => {
  //       document.body.classList.remove('is-preload');
  //     }, 100);
  //   });
  // }

  // private setupSlideshowBackground(): void {
  //   const images: Record<string, string> = {
  //     '/images/bg01.jpg': 'center',
  //     '/images/bg02.jpg': 'center',
  //     '/images/bg03.jpg': 'center'
  //   };

  //   const $wrapper = document.createElement('div');
  //   $wrapper.id = 'bg';
  //   document.body.appendChild($wrapper);

  //   for (const k in images) {
  //     const $bg = document.createElement('div');
  //     // $bg.style.backgroundImage = `url("${k}")`;
  //     $bg.style.backgroundImage = `${k}`;
  //     console.log(`${k}`)
  //     $bg.style.backgroundPosition = images[k];
  //     $wrapper.appendChild($bg);
  //     this.$bgs.push($bg);
  //   }

  //   this.$bgs[this.pos].classList.add('visible');
  //   this.$bgs[this.pos].classList.add('top');

  //   if (this.$bgs.length === 1 || !this.canUse('transition')) {
  //     return;
  //   }

  //   window.setInterval(() => {
  //     this.lastPos = this.pos;
  //     this.pos = (this.pos + 1) % this.$bgs.length;

  //     this.$bgs[this.lastPos].classList.remove('top');
  //     this.$bgs[this.pos].classList.add('visible');
  //     this.$bgs[this.pos].classList.add('top');

  //     window.setTimeout(() => {
  //       this.$bgs[this.lastPos].classList.remove('visible');
  //     }, this.delay / 2);
  //   }, this.delay);
  // }

  // private canUse(feature: string): boolean {
  //   let testBoolean: boolean
  //   if(feature){
  //     console.log("just checking this")
  //     testBoolean = true
  //   } else{
  //     console.log("something else happened")
  //     testBoolean = true
  //   }
  //   return testBoolean;
  // }
}
