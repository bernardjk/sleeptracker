import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];
	private hascreated:boolean = false

	constructor(private storage: Storage) {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
			SleepService.LoadDefaultData = false;
		}
		if(this.hascreated==false){
			this.storage.create();
			this.hascreated = true;
			console.log("created db");
		}
	 this.loadalldata();
	}

	private addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
	}
	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		if(this.hascreated)
		{
			this.storage.set(sleepData.id,sleepData);
		}
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		if(this.hascreated)
		{
			this.storage.set(sleepData.id,sleepData);
		}
	}

	private loadalldata()
	{
		this.storage.forEach((value) => {
			this.storage.get(value.id).then((content) =>
			{
				if(content.sleepStart)
				{
					let sleep = new OvernightSleepData(null,null);
					sleep.set(content);
					SleepService.AllSleepData.push(sleep);
					SleepService.AllOvernightData.push(sleep);
				}
				else
				{
					let sleep = new StanfordSleepinessData(null,null);
					sleep.set(content);
					SleepService.AllSleepData.push(sleep);
					SleepService.AllSleepinessData.push(sleep);
				}
			})
		});
		// this.storage.clear();
	}
}
