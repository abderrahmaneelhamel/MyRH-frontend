import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Company } from 'src/app/interfaces/Company';
import { selectLoggedInUser } from 'src/app/auth.selectors';
import { CompanyService } from 'src/app/services/CompanyService/company.service';
import { Plan } from 'src/app/interfaces/Plan';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css']
})
export class SubscriptionPlansComponent implements OnInit {
  company!: Company;
  selectedPlan?: Plan;

  constructor(private store: Store, private router: Router, private companyService: CompanyService) {}

  ngOnInit() {
    this.store.select(selectLoggedInUser).subscribe(loggedInCompany => {
      if (loggedInCompany) {
        this.company = loggedInCompany;
        this.selectedPlan = loggedInCompany.plan;
      }
    });
  }

  choosePlan(planId: number) {
    this.companyService.updateCompanyPlan(this.company.id!, planId).subscribe(
      (updatedCompany) => {
      this.company = updatedCompany;
      this.selectedPlan = updatedCompany.plan;
      Swal.fire({
        icon: 'success',
        title: 'success',
        text: 'Plan updated successfully',
      });
    },
    (error)=>{
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'an error happened while updating the plan',
      });
      console.log(error);
      
    }
    );
  }
}
