import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders
} from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ApiService implements HttpInterceptor {
    // export class ApiService {
    URL = environment.apiUrl;

    urls = {
        login: 'login',
        getOrders: 'orders',
        addorder: 'add-order',
        addproduct: 'add-product',
        editProduct: 'update-product',
        products: 'products',
        ordersHistory: 'orders-history',
        transaction: 'transaction',
        deleteProduct: 'delete-product'
    };
    get currentDate() {
        return new Date();
    }
    constructor(
        private http: HttpClient
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log(req);
        
        if(!req.url.includes('delete-product')){
            const dubReq = req.clone({
                url: this.URL + req.url
            });
            return next.handle(dubReq);
        }else {
            const dubReq = req.clone({
                url: req.url
            });
            return next.handle(dubReq);
        }
    }

    login(payload) {
        return this.http.post(this.urls.login, payload)
    }

    getAllProducts() {
        return this.http.get(this.urls.products)
    }
    getAllOrders() {
        return this.http.get(this.urls.getOrders)
    }
    addOrder(payload) {
        return this.http.post(this.urls.addorder, payload)
    }
    deleteOrder() {
        return this.http.delete(this.urls.getOrders)
    }
    deleteProduct(payload) {
        return this.http.delete(this.urls.deleteProduct, payload)
    }
    getOrderHistory() {
        return this.http.get(this.urls.ordersHistory)
    }
    gettransaction() {
        return this.http.get(this.urls.transaction)
    }
    addProduct(payload) {
        return this.http.post(this.urls.addproduct, payload)
    }
    editProduct(payload) {
        return this.http.post(this.urls.editProduct, payload)
    }

}

