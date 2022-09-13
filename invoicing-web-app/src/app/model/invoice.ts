import { InvoiceEntries } from "./invoice-entries";
import { Company } from "./company";

export class Invoice {

  public editMode: boolean = false;
  public editedInvoice: Invoice = null;
  public detailInvoice: Invoice = null;

  constructor(
    public id: number,
    public number: string,
    public date: any,
    public buyer: Company,
    public seller: Company,
    public entries: InvoiceEntries

  ) {
  }
}
