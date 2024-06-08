import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RefundsService } from './refunds.service';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.scss']
})
export class RefundsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  searchForm!: UntypedFormGroup;
  refunds: any[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private refundsService: RefundsService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Refunds', active: true }
    ];

    this.searchForm = this.formBuilder.group({
      id: [null],
      day: [null],
      nit: [null]
    });
  }

  // Método para buscar ventas
  onSearch(): void {
    const params = this.searchForm.value;
    console.log(params)
    this.refundsService.getSales(params).subscribe(response => {
      if (response.success) {
        this.refunds = response.sells;
      } else {
        Swal.fire('Error', response.message, 'error');
      }
    });
  }

  // Método para realizar devolución
  onRefund(sellId: number, refundItems: any[]): void {
    const refundData = {
      sellId: sellId,
      refundItems: refundItems
    };
    this.refundsService.saveRefund(refundData).subscribe(response => {
      if (response.success) {
        Swal.fire('Éxito', 'Devolución realizada con éxito.', 'success');
      } else {
        Swal.fire('Error', response.message, 'error');
      }
    });
  }
}
