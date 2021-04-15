import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared-modules/api.service';
import { ViewOrderComponent } from '../view-order/view-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  currentDate = new Date();
  // orderHistory = {}
  orderHistory = {}
  ordersList = {}

  constructor(private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.getOrders();
    this.getOrdersHistory()
  }
  redirectTo() {
    this.router.navigate(['home'])
  }
  openViewDialog(data) {
    const dialog = this.dialog.open(ViewOrderComponent, {
      width: '40%',
      data: data ? data : null,
    });

  }
  getOrders() {
    this.apiService.getAllOrders().subscribe(response => {
      this.ordersList = response
      for (let index = 0; index < this.ordersList['response']['order'].length; index++) {
        const element = this.ordersList['response']['order'][index];
        element.tax = 10
      }
    })
  }

  getOrdersHistory() {
    this.apiService.getOrderHistory().subscribe(response => {
      this.orderHistory = response
      for (let index = 0; index < this.orderHistory['response']['order'].length; index++) {
        const element = this.orderHistory['response']['order'][index];
        element.date = new Date()
      }
    })
  }

  removeOrders(val) {
    this.apiService.deleteOrder().subscribe(response => {
      if (val == 'complete') {
        this.snackBar.open("Order completed successfully", '', {
          duration: 2000,
        });
        this.router.navigate(['home'])
      } else {
        this.snackBar.open("Order deleted successfully", '', {
          duration: 2000,
        });
      }
      this.getOrders()
    })
  }
  returnGT() {
    let array = this.ordersList['response']['order'];
    let taxTotal = 0;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      taxTotal = taxTotal + element.tax
    }
    return parseFloat(this.ordersList['response'].total + taxTotal).toFixed(2)
  }
}
