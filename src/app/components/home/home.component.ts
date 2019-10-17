import { environment } from './../../../environments/environment.prod';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HomeService } from './home.service';
import * as moment from 'moment';
import { Constants } from '../../shared/constants/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,AfterViewInit{

  quotesData: any = [];
  previousData: any = [];
  readonly URL: string = environment.WS_URL;
  readonly defaultColor = Constants.NO_CHANGE_COLOR;
  readonly riseColor = Constants.RISE_COLOR;
  readonly fallColor = Constants.FALL_COLOR;
  readonly dateFomat = Constants.DATE_FORMAT;
  readonly decimalPlaces = Constants.DECIMAL_PLACES;

  constructor( private homeService: HomeService) {
  }

  // Updates previous data with new data
  private updatePreviousData(arr) {
    this.previousData = arr;
  }

  // Calculate the precentage from given old and new values inspite of sign
  private calculatePercentage(oldValue, newValue) {
    return ( (Math.abs(( oldValue - newValue)) / oldValue ) * 100).toFixed(this.decimalPlaces);
  }

  // Adds/update the stock data
  // Creates object of array format : quoteObjArray = [Name, Price, Time, Color, lastModifiedString, %Change] and
  // add or update in array         : quotesArray=[quoteObjArray]
  private updateArray(quotesArray, quoteObjArray) {

    const index = quotesArray.findIndex((e) => quoteObjArray[0] === e[0]);
    // Search for existing stock value, if exists update value else push new field in array
    if (index === -1) {
      quoteObjArray.push(moment(new Date()).format(this.dateFomat));              // Pushing new date field
      quoteObjArray.push(this.defaultColor);                                      // Pushing new color field
      quoteObjArray.push("Now");                                                  // Initial tag
      quoteObjArray.push(0.0);                                                    // Initial change
      quotesArray.push(quoteObjArray);                                            // Insert object in array
      this.previousData.push(quoteObjArray);                                      // Update previous data
    } else {
      quotesArray[index][2] = moment(new Date()).format(this.dateFomat);
      quotesArray[index][1] = quoteObjArray[1];
      quotesArray[index][3] = (quotesArray[index][1] > this.previousData[index][1]) ? this.riseColor : this.fallColor;
      quotesArray[index][5] = this.calculatePercentage(this.previousData[index][1], quotesArray[index][1]);
    }

    // Update previous data with latest data
    if(quotesArray && quotesArray.length>0) {
      this.updatePreviousData(JSON.parse(JSON.stringify(quotesArray)));
    }

    // Find out last modified time for all the stocks
    quotesArray.forEach((item) => {
      item[4] = (moment(item[2], this.dateFomat).fromNow());
    });

  }

  ngAfterViewInit() {}

  ngOnInit() {
    // subscribe incoming data
    this.homeService.messages.subscribe(quotesArray => {
      quotesArray.forEach((item) => {
        let name = item[0],
            price = item[1].toFixed(this.decimalPlaces);
        this.updateArray(this.quotesData, [name, price  ]);
      });
		});
  }

}
