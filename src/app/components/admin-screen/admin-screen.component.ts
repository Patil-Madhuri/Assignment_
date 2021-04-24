import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { ApiService } from 'src/app/shared-modules/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss']
})
export class AdminScreenComponent implements OnInit {
  currentDate = new Date();
  jsonArray = []
  userName = "";
  constructor(private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private http: HttpClient) { }

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

  deleteItem(object) {
    this.http.delete(`https://ecommerce-app-product.herokuapp.com/delete-product/${object.id}`).pipe(
      map((response: Response) => {
        this.snackBar.open("Product deleted successfully", '', {
              duration: 2000,
            });
            this.getProducts()
      }))
      .subscribe();

  }
}
