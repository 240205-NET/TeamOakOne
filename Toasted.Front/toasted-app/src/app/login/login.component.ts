import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { WeatherAPIService } from '../services/weather-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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

  function() {
    const $body: HTMLBodyElement | null = document.querySelector('body')

    // Play initial animations on page load.
    window.addEventListener('load', function () {
      window.setTimeout(function () {
        $body != null ? $body.classList.remove('is-preload') : console.log("error removing class: body is null");
      },
        100);
    });

    // Slideshow Background.
    (function () {
      // Settings.
      const settings: { images: Record<string, string>; delay: number; } = {
        // Images (in the format of 'url': 'alignment').
        images: {
          'images/bg01.jpg': 'center',
          'images/bg02.jpg': 'center',
          'images/bg03.jpg': 'center'
        },
        // Delay.
        delay: 6000
      };


      // Vars.
      var pos: number = 0,
        lastPos: number = 0,
        $wrapper: HTMLDivElement,
        $bgs: any[] = [],
        $bg: HTMLDivElement,
        k,
        v;

      // Create BG wrapper, BGs.
      $wrapper = document.createElement('div');
      $wrapper.id = 'bg';
      $body != null ? $body.appendChild($wrapper) : console.log("error appnding wrapper: body null");

      for (k in settings.images) {

        // Create BG.
        $bg = document.createElement('div');
        $bg.style.backgroundImage = 'url("' + k + '")';
        $bg.style.backgroundPosition = settings.images[k];
        $wrapper.appendChild($bg);

        // Add it to array.
        $bgs.push($bg);

      }

      // Main loop.
      $bgs[pos].classList.add('visible');
      $bgs[pos].classList.add('top');

      // // Bail if we only have a single BG or the client doesn't support transitions.
      // if ($bgs.length == 1
      //   || !canUse('transition'))
      //   return;

      window.setInterval(function () {

        lastPos = pos;
        pos++;

        // Wrap to beginning if necessary.
        if (pos >= $bgs.length)
          pos = 0;

        // Swap top images.
        $bgs[lastPos].classList.remove('top');
        $bgs[pos].classList.add('visible');
        $bgs[pos].classList.add('top');

        // Hide last image after a short delay.
        window.setTimeout(function () {
          $bgs[lastPos].classList.remove('visible');
        }, settings.delay / 2);

      }, settings.delay);
    });
  };
}
