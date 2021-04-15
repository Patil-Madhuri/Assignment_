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
  isEdit = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewOrderComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formInit();

  }

  formInit() {

    this.masterFormGroup = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      color: ['', Validators.required],
      barcode: ['', Validators.required],
      qty: ['', Validators.required],
      price: ['', Validators.required]
    })
    this.masterFormGroup.patchValue(this.data);
  }
  closeForm(data) {
    this.dialogRef.close({ data: data });
  }

}
