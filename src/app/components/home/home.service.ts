import { QuoteModel } from './../../shared/models/quote.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SocketService } from '../../shared/services/socket-service.service';
import { map } from 'rxjs/operators';
const URL = 'ws://stocks.mnet.website';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public messages: Subject<QuoteModel[]>;

	constructor(socketService: SocketService) {

    // Service for home component
    // Data over socket
		this.messages = <Subject<QuoteModel[]>>socketService
			.connect(URL)
			.pipe(map((response: MessageEvent) => {
				return JSON.parse(response.data);
			}));
	}
}
