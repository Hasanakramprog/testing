import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeesConfigService } from 'src/app/shared/services/fees-config.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fees-config',
  templateUrl: './fees-config.component.html',
  styleUrls: ['./fees-config.component.scss']
})
export class FeesConfigComponent implements OnInit {

  constructor(
    private feesConfigService: FeesConfigService ,
    private toastr : ToastrService
  ) { }


  beneficiaries = [
    { value: "CST", label: "CST" },
    { value: "Insurance", label: "Insurance" },
    { value: "Company", label: "Company" }
  ];

  amountTypes  = [
    {value : "%" , label : "%"},
    {value : "USD" , label : "USD"}
  ]
  ;
  providerClaims = [
    {value : "Open_Request" , label : "Open Request"} ,
    {value : "Execution" , label : "Execution"}
  ]
  ;

  companyClaims = [
    {value : "Sent_To_CST" , label : "Sent To CST"} ,
    {value : "Execution" , label : "Execution"} ,
    {value : "Remaining_Bonds" , label: "Remaining Bonds"}
  ]


  items;
  newItem = {};
  selectedItem ; 

  ngOnInit() {
    this.feesConfigService.getAll().subscribe(result => {
      this.items = result['data'];
      console.log("plans", this.items);
    });
  }

  create(form : NgForm) {
    console.log("create" , this.newItem) ;
    this.feesConfigService.create(this.newItem).subscribe(result => {
      this.items.push(result['data']);
      this.newItem = {};
      this.toastr.success("Fees Config Created") ;
      form.resetForm();
    })
  }

  selectItem(item){
    this.selectedItem = item ;
  }

  update(){
    this.feesConfigService.update(this.selectedItem.id , this.selectedItem ).subscribe(result=>{
       this.toastr.success("Fees Config Updated") ;
    })
  }

  delete(){
    this.feesConfigService.delete(this.selectedItem.id).subscribe(result=>{
     
      for (let index = 0; index < this.items.length; index++) {
        const element = this.items[index];
        if(element.id === this.selectedItem.id){
          this.items.splice(index , 1) ;
          this.selectedItem = null ;
          break ;
          
        }
      }
      this.toastr.success("Fees Config Deleted") ;
      
    });

  }

}
