import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'snapwork';
  // @HostListener('window:beforeunload', ['$event']) beforeUnload($event) {
  //   console.log("refresshed");
  //   event.preventDefault();
  //   $event.returnValue = true;
  //   localStorage.setItem('token', '');
  //   this.router.navigate(['login']);
  //   return "Your data will be lost!"
  // }

  constructor(private router: Router) { }
  ngOnInit() {
    // this.router.navigate(['login']) 
  }
}
