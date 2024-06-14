import { totaisModel } from './../models/totais.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { httpClient } from "src/core/httpClient";

@Injectable()
export class adminApiProvider {

  _idUser: string = '';
  _idEmpresa: string='';

  constructor(
        public httpClient: httpClient,
        public apiService: BaseService
    ) { }

    public getTotais(): Promise<totaisModel[]>{
      const userJson = localStorage.getItem('bitADMIN.user');
        if (userJson) {
          const user = JSON.parse(userJson);
          this._idUser = user.id;
          this._idEmpresa = user.id_empresa
        } else {
          console.error('Usuário não encontrado');
        }

      let url = this.apiService.UrlServiceTotais;
      url = url.replace("{idUser}", this._idUser);
      url = url.replace("{idEmpresa}", this._idEmpresa);



      return new Promise((resolve, reject) => {
        this.httpClient.get(url,true,false).then((response : any) => {
          let totais: totaisModel[] = [];
          if(JSON.stringify(response.totais) === '{}'){
            totais = [];
          }else {
            for(const item of response.totais){
              totais.push(new totaisModel().mapFromApi(item));
            }
          }

          resolve(totais);
        }, (err) => {
          reject(err);
        })
      })
    }
}

