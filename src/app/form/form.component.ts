import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataTransferService } from '../data-transfer.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  name = new FormControl('');
  feedback = new FormControl('');
  comment = new FormControl('');
  email = new FormControl('');
  constructor(private dataTransferService: DataTransferService,
    private location: Location) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() : void {
    this.dataTransferService.getData()
    .subscribe(data =>{
     this.name.setValue(data.name)
      this.feedback.setValue(data.feedback)
      this.comment.setValue(data.comment)
      this.email.setValue(data.email)
    }
      )
  }

  goBack(): void{
    this.location.back()
  }

  onClick(): void{
    const obj = {
      name: this.name.value,
      email: this.email.value,
      comment: this.comment.value,
      feedback: this.feedback.value
    }
    this.dataTransferService.sendData(obj)
    .subscribe(()=>this.goBack());
  }
}
