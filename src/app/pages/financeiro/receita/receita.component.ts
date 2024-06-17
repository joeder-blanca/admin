import { Component, OnInit } from '@angular/core';
import { getISOWeek } from 'date-fns';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { FormBuilder, FormGroup } from '@angular/forms';

interface DataItem {
  codigo: number;
  nome: string;
  data: string;
  conta: string;
  categoria: string;
  valor: number;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css']
})
export class ReceitaComponent implements OnInit {

  date = null;
  isEnglish = false;
  searchForm!: FormGroup;

  listOfColumns: ColumnItem[] = [
    {
      name: 'Cod.',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.codigo - b.codigo,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Nome',
      sortOrder: 'descend',
      sortFn: (a: DataItem, b: DataItem) => a.nome.localeCompare(b.nome),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Data',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => new Date(a.data).getTime() - new Date(b.data).getTime(),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Conta',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.conta.localeCompare(b.conta),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Categoria',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.categoria.localeCompare(b.categoria),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Valor',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.valor - b.valor,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Ações',
      sortOrder: null,
      sortFn: null,
      sortDirections: ['ascend', 'descend', null],
    }
  ];

  listOfData: DataItem[] = [
    {
      codigo: 1,
      nome: 'Joe Blanca',
      data: '2024-01-01',
      conta: 'Banco Inter',
      categoria: 'Salário',
      valor: 12345,
    }
  ];

  constructor(
    private i18n: NzI18nService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      dataDe: [null],
      dataAte: [null]
    });
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }
}
