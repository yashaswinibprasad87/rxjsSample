import { Observable } from 'rxjs';
import { merge } from 'rxjs/operators';
import { mapTo } from 'rxjs/operators';
import axios from 'axios';

let observable$ = Observable.create( ( observer ) => {
    axios.get( 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=190dc942d5f848d7b9fd7392b4474e85' )
    .then( ( response ) => {
        observer.next( response.data );
        observer.complete();
    } )
    .catch( ( error ) => {
        observer.error( error );
    } );
} );
let subscription = observable$.subscribe( {
    next: data => console.log( '[data] => ', data ),
    complete: data => console.log( '[complete]' ),
} );

let observableflight$ = Observable.create( ( observer ) => {
    axios.get( 'https://opensky-network.org/api/states/all?time=1458564121&icao24=3c6444' )
    .then( ( response ) => {
        observer.next( response.data );
        observer.complete();
    } )
    .catch( ( error ) => {
        observer.error( error );
    } );
} );
let subscriptionflight = observableflight$.subscribe( {
    next: data => console.log( '[dataflight] => ', data ),
    complete: data => console.log( '[completeflight]' ),
} );

const output =observable$.pipe(merge(observableflight$));
const subscribe = output.subscribe(val => console.log(val));