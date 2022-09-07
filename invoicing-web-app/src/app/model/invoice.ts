import { InvoiceEntries } from "./invoice-entries";
import { Company } from "./company";

export class Invoice {

  public editMode: boolean = false;
  public editedInvoice: Invoice = null;

  constructor(
    public id: number,
    public number: string,
    public date: Date,
    public buyer: Company,
    public seller: Company,
    public entries: InvoiceEntries

  ) {
  }
}
