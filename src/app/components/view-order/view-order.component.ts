import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  masterFormGroup: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewOrderComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data);
    
  }

  closeForm(data) {
    this.dialogRef.close({ data: data });
  }

}
