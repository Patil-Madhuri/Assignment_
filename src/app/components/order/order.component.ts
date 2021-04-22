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
  orderHistory = []
  ordersList = []
  grandTotal = ""
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
      this.ordersList = response['response']['order']
      this.grandTotal = response['response'].total
      for (let index = 0; index < this.ordersList.length; index++) {
        const element = this.ordersList[index];
        element.tax = 10
      }
    })
  }

  getOrdersHistory() {
    this.apiService.getOrderHistory().subscribe(response => {
      const mapped = Object.keys(response['response']).map(key => ({type: key, value: response['response'][key]}));
      this.orderHistory = mapped;
      console.log("orderhistory",this.orderHistory);
      
      for (let index = 0; index < this.orderHistory.length; index++) {
        const element = this.orderHistory[index];
        element.date = new Date()
      }
    })
  }

  removeOrders() {
    this.apiService.deleteOrder().subscribe(response => {
      this.snackBar.open("Order deleted successfully", '', {
        duration: 2000,
      });
    })
    this.getOrders()
  }

  completeOrder() {
    this.apiService.gettransaction().subscribe(response => {
      this.getOrdersHistory()
      this.snackBar.open("Order completed successfully", '', {
        duration: 2000,
      });
    })
  }
  returnGT() {
    let array = this.ordersList;
    let taxTotal = 0;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      taxTotal = taxTotal + element.tax
    }
    console.log(this.ordersList);

    return parseFloat(this.grandTotal + taxTotal).toFixed(2)
  }
}
