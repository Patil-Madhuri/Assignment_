import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  masterFormGroup: FormGroup
  isEdit = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.data) {
      this.openEditForm(this.data);
    } else {
      this.formInit();
    }
  }
  openEditForm(data) {
    this.isEdit = true;
    this.formInit();
    this.masterFormGroup.patchValue(data);
  }
  formInit() {
    this.masterFormGroup = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      color: ['', Validators.required],
      barcode: ['', Validators.required],
      qty: ['', Validators.required],
      price: ['', Validators.required],
      desc: ['', Validators.required],
      reason: ['', Validators.required],
    })
  }
  closeForm(data) {
    this.dialogRef.close({data: data });
  }
  addItem(){
    console.log(this.masterFormGroup.value);
    this.closeForm(this.masterFormGroup.value)
    
  }

}
