import { Component, OnInit } from '@angular/core';

import { Invoice } from "../model/invoice";
import { Company } from "../model/company";
import { Car } from "../model/car";
import { InvoiceEntries } from "../model/invoice-entries"
import { InvoiceService } from "../service/invoice-service";

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

  invoices: Invoice[] = [];

  constructor(
        private invoicesService: InvoiceService
      ) {
      }

  ngOnInit(): void {
  }



}
