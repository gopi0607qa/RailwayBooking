import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, IAPIResponse, Login } from '../app/Model/train';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  apiURL: string='https://freeapi.miniprojectideas.com/api/TrainApp/';

  constructor(private http:HttpClient) {}

   getAllStations(){

    return this.http.get(`${this.apiURL}GetAllStations`);
   }

   getTrainsSearch(from:number,to:number,date:string){

    return this.http.get(`${this.apiURL}GetTrainsBetweenStations?departureStationId=${from}&arrivalStationId=${to}&departureDate=${date}`);
   }

   createNewCustomer(obj:Customer){
    return this.http.post<IAPIResponse>(`${this.apiURL}AddUpdatePassengers`,obj)

   }

   loginCustomer(obj:Login){
    return this.http.post<IAPIResponse>(`${this.apiURL}Login`,obj)

   }
}
