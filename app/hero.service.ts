import { Injectable } from '@angular/core';
import { headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
//import { HEROES } from './mock-heroes'; -- Replaced by the mock server.

//A Promise essentially promises to call back when the results are ready. 
//You ask an asynchronous service to do some work and give it a callback function. 
//The service does that work and eventually calls the function with the results or an error.
@Injectable() 
export class HeroService { 
	
	private heroesUrl = 'api/heroes'; //URL to web api
	private headers = new Headers({'Content-type': 'application/json'});
	
	constructor(private http: Http) { }
		
	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroesUrl)
				   .toPromise()
				   .then(response => response.json().data as Hero[])
				   .catch(this.handleError);
	}
	
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); //for demo purposes only
		return Promise.reject(error.message || error);
	}
	
	/*
	getHeroesSlowly(): Promise<Hero[]>{
		return new Promise(resolve => {
			//Simulate server latency with seconds delay.
			setTimeout(() => resolve(this.getHeroes()), 3000);
		});
	}
	*/
	getHero(id: number): Promise<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json().data as Hero)//.then(heroes => heroes.find(hero => hero.id === id));
			.catch(this.handleError);
	}
	
	update(hero: Hero): Promise<Hero> {
			const url = `${this.heroesUrl}/${hero.id}`;
			return this.http
			.put(url, JSON.stringify(hero), {headers: this.headers})
			.toPromise()
			.then(() => hero)
			.catch(this.handleError);
	}
	
	create(name: string): Promise<Hero> {
	  return this.http
		.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
		.toPromise()
		.then(res => res.json().data as Hero)
		.catch(this.handleError);
    }
	
	delete(id: number): Promise<void> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}
}

