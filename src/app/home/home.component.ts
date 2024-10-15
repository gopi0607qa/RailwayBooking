import { Component, inject, OnInit } from '@angular/core';
import { TrainService } from '../../Services/train.service';
import { IStation } from '../Model/train';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

trainservice = inject(TrainService);
router= inject(Router);
stationList: IStation[]=[];
fromStationId: number=0;
toStationId: number=0;
dateOfTravel: string='';

ngOnInit(): void {
  this.loadAllStation();
}

loadAllStation(){

  this.trainservice.getAllStations().subscribe((res:any) =>{
    this.stationList = res.data;
  })
}
onSearch(){
  let SearchFromStId=this.fromStationId;
  let SearchToStId=this.toStationId;
  let SearchDateOfTravel=this.dateOfTravel;

  if(SearchFromStId == 0 || SearchToStId == 0 || SearchDateOfTravel == ''){

    alert('Select your Journey Details');
  }else if((SearchFromStId == SearchToStId )){
    alert('From Station and To Station cannot be same');
  }else{
    this.router.navigate(['/search',SearchFromStId,SearchToStId,SearchDateOfTravel])
  }
}

}
