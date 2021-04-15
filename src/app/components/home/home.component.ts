import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared-modules/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentDate = new Date();
  isAdmin
  userName=""
  jsonArray = []
  constructor(private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('type')
    this.userName = localStorage.getItem('username')
    this.getProducts();
  }
  getProducts() {
    this.apiService.getAllProducts().subscribe(response => {
      this.jsonArray = response['response'];
    })
  }
  addOrder(item) {
    let postData = {
      "id": item.id,
      "title": item.title,
      "barcode": item.barcode,
      "qty": item.qunatity,
      "price": item.price

    }
    this.apiService.addOrder(postData).subscribe(response => {
      this.snackBar.open("Item added to order successfully", '', {
        duration: 2000,
      });
    })
  }
  redirectTo(url){
    this.router.navigate([url])
  }

}
