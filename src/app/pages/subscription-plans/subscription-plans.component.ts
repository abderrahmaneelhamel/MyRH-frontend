import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Company } from 'src/app/interfaces/Company';
import { selectLoggedInUser } from 'src/app/NGRX/auth.selectors';
import { CompanyService } from 'src/app/services/CompanyService/company.service';
import { Plan } from 'src/app/interfaces/Plan';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StripeService } from 'src/app/services/StripeService/stripe.service';
import { PopupComponent } from 'src/app/components/popup/popup.component';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css'],
})
export class SubscriptionPlansComponent implements OnInit {
  company!: Company;
  selectedPlan?: Plan;
  PlanId: number = 0;
  card: any;

  @ViewChild('cardElement') cardElement!: ElementRef;
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;

  constructor(
    private store: Store,
    private router: Router,
    private companyService: CompanyService,
    private stripeService: StripeService
  ) {}

  ngOnInit() {
    this.store.select(selectLoggedInUser).subscribe((loggedInCompany) => {
      if (loggedInCompany) {
        this.company = loggedInCompany;
        this.selectedPlan = loggedInCompany.plan;
      }
    });
  }

  async payWithCard() {
    const { token, error } = await this.stripeService.createToken(this.card);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while processing the card information.',
      });
    } else {
      this.companyService
        .updateCompanyPlan(this.company.id!, this.PlanId, token.id)
        .subscribe(
          (updatedCompany) => {
            this.company = updatedCompany;
            this.selectedPlan = updatedCompany.plan;
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Plan updated successfully',
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while updating the plan',
            });
            console.error(error);
          }
        );
    }
  }

  async choosePlan(planId: number) {
    this.PlanId = planId;
    this.card = this.stripeService.createCardElement();
    this.card.mount(this.cardElement.nativeElement);
    this.popupComponent.Toggle();
  }
}
