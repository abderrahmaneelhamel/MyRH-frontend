
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table-test',
  templateUrl: './table-test.component.html',
  styleUrls: ['./table-test.component.css']
})
export class TableTestComponent implements OnInit {
    customers!: any[];

    representatives!: any[];

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    constructor() {}

    ngOnInit() {
      this.customers = [
          { id: '1', name: 'John Doe', country: 'USA', date: '2022-02-12', status: 'in progress', activity: 10, representative: 'Amy Elsner' },
          { id: '2', name: 'Jane Smith', country: 'Canada', date: '2022-01-01', status: 'complete', activity: 100, representative: 'Amy Elsner' },
          { id: '3', name: 'Don Joe', country: 'USA', date: '2022-01-10', status: 'in progress', activity: 50, representative: 'Samppa Nori' },
          { id: '4', name: 'Emily Davis', country: 'UK', date: '2022-01-12', status: 'complete', activity: 100, representative: 'Samppa Nori' },
          { id: '5', name: 'Lara Clos', country: 'France', date: '2022-01-10', status: 'in progress', activity: 75, representative: 'Amy Elsner' },
          { id: '6', name: 'Johnatan Doe', country: 'USA', date: '2022-01-15', status: 'complete', activity: 100, representative: 'Samppa Nori' },
          { id: '7', name: 'Emma Smith', country: 'USA', date: '2022-01-05', status: 'in progress', activity: 80, representative: 'Amy Elsner' },
          { id: '8', name: 'Sophia Stark', country: 'USA', date: '2022-01-05', status: 'complete', activity: 100, representative: 'Samppa Nori' },
          { id: '9', name: 'Alice Taylor', country: 'UK', date: '2022-01-12', status: 'in progress', activity: 70, representative: 'Amy Elsner' },
          { id: '10', name: 'John Lark', country: 'USA', date: '2022-01-01', status: 'complete', activity: 100, representative: 'Samppa Nori' },
          { id: '11', name: 'John Lark', country: 'USA', date: '2022-01-01', status: 'complete', activity: 100, representative: 'Samppa Nori' }
      ];

      this.representatives = [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
        { label: 'Unqualified', value: 'unqualified' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'New', value: 'new' },
        { label: 'Negotiation', value: 'negotiation' },
        { label: 'Renewal', value: 'renewal' },
        { label: 'Proposal', value: 'proposal' }
    ];

      this.customers.forEach((customer) => (customer.date = new Date(customer.date)));
      this.loading = false;
  };

        

    clear(table: Table) {
        table.clear();
    }
}