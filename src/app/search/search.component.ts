import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer, IAPIResponse, IStation, ITrain, PassengerData, Search } from '../Model/train';
import { TrainService } from '../../Services/train.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  activatedRoutee = inject(ActivatedRoute);
  searchData: Search = new Search();
  trainService = inject(TrainService);
  trainList: ITrain[] = [];
  stationList: IStation[] = [];
  selectedTrain?: ITrain;
  passenger: PassengerData = new PassengerData();
  passengerList: any[] = [];
  loggedUser : Customer = new Customer();

  ngOnInit(): void {
    this.loadAllStation();
  }
  constructor() {


      try{
      const localData = localStorage.getItem("trainAPP");
      if(localData != null){
        this.loggedUser = JSON.parse(localData);
        }
      } catch(e){
        console.log("Local Storage Not Defined error occured");
      }
  


    this.activatedRoutee.params.subscribe((res: any) => {
      this.searchData.dateOfBooking = res.dateOfBooking;
      this.searchData.fromStationId = res.fromStationId;
      this.searchData.toStationId = res.toStationId;

      this.getSearchTrains();

    })
  }

  loadAllStation() {

    this.trainService.getAllStations().subscribe((res: any) => {
      this.stationList = res.data;
    })
  }

  getSearchTrains() {
    this.trainService.getTrainsSearch(this.searchData.fromStationId, this.searchData.toStationId, this.searchData.dateOfBooking).subscribe((res: any) => {
      this.trainList = res.data;
    }
    );
  }

  openBooking(train: ITrain) {
    this.selectedTrain = train;
    const modal = document.getElementById("BookingModal");
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  closeBooking() {
    const modal = document.getElementById("BookingModal");
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  addPassenger() {
    const strObj = JSON.stringify(this.passenger);
    const parseObj = JSON.parse(strObj);
    this.passengerList.push(parseObj);
    this.passenger.passengerName='';
    this.passenger.age=0;

  }

  bookTicket(){
    const BookingObj ={
      
        "bookingId": 0,
        "trainId": this.selectedTrain?.trainId,
        "passengerId": this.loggedUser.passengerID,
        "travelDate": this.selectedTrain?.departureDate,
        "bookingDate": new Date(),
        "totalSeats": 0,
        "TrainAppBookingPassengers": [] as any
      
    }
    BookingObj.TrainAppBookingPassengers= this.passengerList;
    BookingObj.totalSeats= this.passengerList.length;
    this.trainService.bookTrain(BookingObj).subscribe((res: IAPIResponse) => {

      if (res.result) {

        alert("Ticket Booked Successfully..!")
        this.closeBooking();

      }
      else {
        alert(res.message)
      }
    })
  }
}

  // removePassenger(){
  //   this.passengerList.;
  //     }
  // getStationName(){


  //   this.activatedRoutee.params.subscribe((res:any)=>{
  //     debugger;
  //     this.searchData.dateOfBooking=res.dateOfBooking;
  //     this.searchData.fromStationId=res.fromStationId;
  //     this.searchData.toStationId=res.toStationId;
  //     this.loadAllStation();

  //     for (let index = 0; index < this.stationList.length; index++) {
  //       let element = this.stationList[index];
  //       if(this.stationList[index].stationID==this.searchData.fromStationId){
  //         element=this.stationList[index].stationName;
  //       }

  //     }
  //   })




