import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { ApiService } from 'src/app/shared-modules/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss']
})
export class AdminScreenComponent implements OnInit {
  currentDate = new Date();
  jsonArray = []
  userName= "";
  constructor(private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  redirectTo() {
    this.router.navigate(['home'])
    this.userName = localStorage.getItem('username')
  }
  addNew(data?) {
    const dialog = this.dialog.open(AddComponent, {
      width: '40%',
      data: data ? data : null,
    });
    dialog.afterClosed().subscribe(res => {
      console.log("res", res);
      if (res.data !== true) {
        this.apiService.addProduct(res.data).subscribe(response => {
          this.snackBar.open("Product added successfully", '', {
            duration: 2000,
          });
          this.getProducts()
        })

      } else {
        console.log("normal close");
      }
    })
  }
  getProducts() {
    this.apiService.getAllProducts().subscribe(response => {
      this.jsonArray = response['response'];
    })
  }
}
