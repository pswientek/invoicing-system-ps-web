import { Car } from "./car";

export class InvoiceEntries {

  constructor(
    public id: number,
    public description: string,
    public quantity: number,
    public price: number,
    public vatValue: number,
    public vatRate: number,
    public carExpenses: Car
  ) {
  }
}
