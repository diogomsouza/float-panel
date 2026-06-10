import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  FloatPanelButtonsDirective,
  FloatPanelComponent,
  FloatPanelTriggerDirective,
} from '@stagyra/float-panel';

interface AssetRow {
  market: string;
  submarket: string;
  asset: string;
  broker: string;
  number: string;
  status: string;
  date: Date;
}

const DATA: AssetRow[] = [
  {
    market: 'Acoes',
    submarket: 'B3',
    asset: 'PETR4',
    broker: 'Rico',
    number: '1024',
    status: 'Ativo',
    date: new Date(2026, 3, 16),
  },
  {
    market: 'Fundos',
    submarket: 'Imobiliario',
    asset: 'HGLG11',
    broker: 'XP',
    number: '2048',
    status: 'Ativo',
    date: new Date(2026, 4, 3),
  },
  {
    market: 'Renda Fixa',
    submarket: 'Tesouro',
    asset: 'Tesouro IPCA+',
    broker: 'Clear',
    number: '4096',
    status: 'Inativo',
    date: new Date(2026, 4, 29),
  },
  {
    market: 'Acoes',
    submarket: 'BDR',
    asset: 'AAPL34',
    broker: 'Rico',
    number: '8192',
    status: 'Ativo',
    date: new Date(2026, 5, 7),
  },
];

@Component({
  selector: 'app-root',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    FloatPanelButtonsDirective,
    FloatPanelComponent,
    FloatPanelTriggerDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly displayedColumns = ['market', 'asset', 'broker', 'status', 'date'];
  protected rows = DATA;

  protected readonly filterForm = this.formBuilder.group({
    market: [''],
    submarket: [''],
    status: [''],
    broker: [''],
    number: [''],
    startDate: [null as Date | null],
    endDate: [null as Date | null],
    orderBy: ['date'],
    order: ['desc'],
  });

  protected readonly markets = ['Acoes', 'Fundos', 'Renda Fixa'];
  protected readonly submarkets = ['B3', 'BDR', 'Imobiliario', 'Tesouro'];
  protected readonly brokers = ['Clear', 'Rico', 'XP'];

  protected clearForm(): void {
    this.filterForm.reset({
      market: '',
      submarket: '',
      status: '',
      broker: '',
      number: '',
      startDate: null,
      endDate: null,
      orderBy: 'date',
      order: 'desc',
    });
    this.rows = DATA;
  }

  protected searchclick(): void {
    const filters = this.filterForm.getRawValue();

    this.rows = DATA.filter((row) => {
      const afterStart = !filters.startDate || row.date >= filters.startDate;
      const beforeEnd = !filters.endDate || row.date <= filters.endDate;

      return (
        (!filters.market || row.market === filters.market) &&
        (!filters.submarket || row.submarket === filters.submarket) &&
        (!filters.status || row.status === filters.status) &&
        (!filters.broker || row.broker === filters.broker) &&
        (!filters.number || row.number.includes(filters.number)) &&
        afterStart &&
        beforeEnd
      );
    }).sort((a, b) => {
      const direction = filters.order === 'asc' ? 1 : -1;

      if (filters.orderBy === 'asset') {
        return a.asset.localeCompare(b.asset) * direction;
      }

      return (a.date.getTime() - b.date.getTime()) * direction;
    });
  }
}
