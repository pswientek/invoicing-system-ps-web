import { Component, OnInit } from '@angular/core';

import { Invoice } from "../model/invoice";
import { Company } from "../model/company";
import { Car } from "../model/car";
import { InvoiceEntries } from "../model/invoice-entries"
import { InvoiceService } from "../service/invoice-service";

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

    invoices: Invoice[] = [];

    newInvoice = new Invoice(
          0,
          "",
          new Date(),
          new Company(0, "", "", "", 0, 0),
          new Company(0, "", "", "", 0, 0),
          new InvoiceEntries(0, "", 0, 0, 0, 0, new Car(0, "", false)));

    newBuyer = new Company(0, "", "", "", 0, 0);
    newSeller = new Company(0, "", "", "", 0, 0);
    newEntries = new InvoiceEntries(0, "", 0, 0, 0, 0, new Car(0, "", false));
    newCar = new Car(0, "", false);

    constructor(
      private invoicesService: InvoiceService
    ) {
    }

    ngOnInit(): void {
      this.invoicesService.getInvoices()
            .subscribe(invoices => {
              this.invoices = invoices;
            });
    }

    addInvoice() {
                this.invoicesService.addInvoice(this.newInvoice)
                    .subscribe(id => {
                        this.newInvoice.id = id;
                        this.invoices.push(this.newInvoice);

                        this.newInvoice = new Invoice(
                          0,
                          "",
                          new Date(),
                          new Company(0, "", "", "", 0, 0),
                          new Company(0, "", "", "", 0, 0),
                          new InvoiceEntries(0, "", 0, 0, 0, 0, new Car(0, "", false)));
                    });
            }

    deleteInvoice(invoiceToDelete: Invoice) {
            this.invoicesService.deleteInvoice(invoiceToDelete.id)
                .subscribe(() => {
                    this.invoices = this.invoices.filter(invoice => invoice !== invoiceToDelete);
                })
        }

    triggerUpdate(invoice: Invoice) {
      invoice.editedInvoice = new Invoice(
        invoice.id,
        invoice.number,
        invoice.date,
        invoice.buyer,
        invoice.seller,
        invoice.entries
      )
      invoice.editMode = true;
    }

    triggerDetail(invoice: Invoice) {
            invoice.detailInvoice = new Invoice(
              invoice.id,
              invoice.number,
              invoice.date,
              invoice.buyer,
              invoice.seller,
              invoice.entries
            )
          }

    cancelInvoiceUpdate(invoice: Invoice) {
      invoice.editMode = false;
    }

     updateInvoice(updatedInvoice: Invoice) {
            this.invoicesService.editInvoice(updatedInvoice.editedInvoice)
                .subscribe(() => {
                    updatedInvoice.number = updatedInvoice.editedInvoice.number
                    updatedInvoice.date = updatedInvoice.editedInvoice.date
                    updatedInvoice.buyer = updatedInvoice.editedInvoice.buyer
                    updatedInvoice.seller = updatedInvoice.editedInvoice.seller
                    updatedInvoice.entries = updatedInvoice.editedInvoice.entries

                    updatedInvoice.editMode = false;
                })
        }

}
