import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Company } from "../model/company";
import { CompanyService } from "../service/company-service";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

    companies: Company[] = [];

    newCompany: Company = new Company(0, "", "", "", 0, 0);

    currentUser: any = {};

    constructor(
      private companiesService: CompanyService,
      public authService: AuthService,
      private actRoute: ActivatedRoute
    ) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.authService.getUserProfile(id).subscribe((res) => {
          this.currentUser = res.msg;
        });
    }

    ngOnInit(): void {
      this.companiesService.getCompanies()
            .subscribe(companies => {
              this.companies = companies;
            });
    }

    addCompany() {
            this.companiesService.addCompany(this.newCompany)
                .subscribe(id => {
                    this.newCompany.id = id;
                    this.companies.push(this.newCompany);

                    this.newCompany = new Company(0, "", "", "", 0, 0);
                });
        }

    deleteCompany(companyToDelete: Company) {
            this.companiesService.deleteCompany(companyToDelete.id)
                .subscribe(() => {
                    this.companies = this.companies.filter(company => company !== companyToDelete);
                })
        }

    triggerUpdate(company: Company) {
      company.editedCompany = new Company(
        company.id,
        company.taxIdentificationNumber,
        company.address,
        company.name,
        company.healthInsurance,
        company.pensionInsurance
      )
      company.editMode = true;
    }

    cancelCompanyUpdate(company: Company) {
      company.editMode = false;
    }

     updateCompany(updatedCompany: Company) {
            this.companiesService.editCompany(updatedCompany.editedCompany)
                .subscribe(() => {
                    updatedCompany.taxIdentificationNumber = updatedCompany.editedCompany.taxIdentificationNumber
                    updatedCompany.address = updatedCompany.editedCompany.address
                    updatedCompany.name = updatedCompany.editedCompany.name
                    updatedCompany.healthInsurance = updatedCompany.editedCompany.healthInsurance
                    updatedCompany.pensionInsurance = updatedCompany.editedCompany.pensionInsurance

                    updatedCompany.editMode = false;
                })
        }

}
