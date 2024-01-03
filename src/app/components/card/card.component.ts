import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Company } from 'src/app/interfaces/Company';
import { Job } from 'src/app/interfaces/Job';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() job! : Job;
  @Input() botton: boolean = true;
  @Output() applyForJob = new EventEmitter<Job>();
  
  constructor(private sanitizer: DomSanitizer) {}

  getImageUrl(companyImage:any) {
    const imageUrl = `data:${companyImage.type};base64,${companyImage.data}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  onClick() {
    this.applyForJob.emit(this.job);
  }
}
