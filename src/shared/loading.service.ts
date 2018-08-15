import { Injectable } from "@angular/core";
import { Loading, LoadingController } from "ionic-angular";

@Injectable()
export class LoadingService {
	loading: Loading;
	
	constructor(
		private loadingCtrl: LoadingController
	) {}

	initialize() {
		this.loading = this.loadingCtrl.create({
			spinner: "crescent",
			cssClass: "custom-loading"
		});
	}

	recreate() {
		this.loading.dismiss().then(() => {
			this.loading = this.loadingCtrl.create({
				spinner: "crescent",
				cssClass: "custom-loading"
			});
		})
	}

	dismiss() {
		this.loading.dismissAll();
	}

	present() {
		this.loading.present();
	}
	
}