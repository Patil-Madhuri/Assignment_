import { Component, OnInit } from '@angular/core';
import { newsList } from '../../shared-modules/constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  news = [];
  constructor(private router: Router) {
    localStorage.setItem('news', JSON.stringify(newsList))
  }

  ngOnInit(): void {
    this.news = JSON.parse(localStorage.getItem('news'));
  }
  redirectTo(object) {
    localStorage.setItem('singlenews', JSON.stringify(object));
    this.router.navigate(['comments']);
  }
}
