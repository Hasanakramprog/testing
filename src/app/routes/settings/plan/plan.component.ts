import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/shared/services/plan.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  constructor(
    private planService: PlanService ,
    private toastr : ToastrService
  ) { }

  items;
  newItem = {};
  selectedItem ; 

  ngOnInit() {
    this.planService.getAll().subscribe(result => {
      this.items = result['data'];
      console.log("plans", this.items);
    });
  }

  create(form : NgForm) {
    console.log("create" , this.newItem) ;
    this.planService.create(this.newItem).subscribe(result => {
      this.items.push(result['data']);
      this.newItem = {};
      this.toastr.success("Plan Created") ;
      form.resetForm();
    })
  }

  selectItem(item){
    this.selectedItem = item ;
  }

  update(){
    this.planService.update(this.selectedItem.id , this.selectedItem ).subscribe(result=>{
       this.toastr.success("Plan Updated") ;
    })
  }

  delete(){
    this.planService.delete(this.selectedItem.id).subscribe(result=>{
     
      for (let index = 0; index < this.items.length; index++) {
        const element = this.items[index];
        if(element.id === this.selectedItem.id){
          this.items.splice(index , 1) ;
          this.selectedItem = null ;
          break ;
          
        }
      }
      this.toastr.success("Plan Deleted") ;
      
    });

  }
}
