import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { ModalController } from '@ionic/angular';
import { AddmodalComponent } from '../addmodal/addmodal.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	hasstarted = false;
	sleepStart:Date;
	sleepEnd:Date;
	sleeps:OvernightSleepData[];

	constructor(private modalCtrl: ModalController,public sleepService:SleepService) {

	}

	ngOnInit() {
		// console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}
	logClick(){
		if(this.hasstarted == false){
			this.hasstarted = true;
			this.sleepStart = new Date();
		}
		else{
			this.hasstarted = false;
			this.sleepEnd = new Date();
			let sleep = new OvernightSleepData(this.sleepStart,this.sleepEnd);
			this.sleepService.logOvernightData(sleep);
		}
	}
	async openModal() {
		const modal = await this.modalCtrl.create({
		  component: AddmodalComponent,
		});
		modal.present();
	
		modal.onDidDismiss().then((data)=>{
			if(data.data.role == "confirm")
			{
				this.sleepStart = new Date(data.data.sdate);
				this.sleepEnd = new Date(data.data.edate);
				let sleep = new OvernightSleepData(this.sleepStart,this.sleepEnd);
				this.sleepService.logOvernightData(sleep);
				// console.log(data.data.sdate);
				// console.log(data.data.edate);
			}
			else
			{
				console.log("bruh");
			}
		})
		// const { data, role } = await modal.onWillDismiss();
	
		// if (role === 'confirm') {
		//   console.log(data.data.sdate);
		//   console.log(data.data.edate);
		// }
	  }

}
