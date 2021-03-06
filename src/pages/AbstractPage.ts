import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
/**
 * New typescript file
 */
export class AbstractPage{
  loading: Loading;
  
  constructor(
    private navController: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController){}
  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
  
  dismissLoading() {
    if(this.loading){
      this.loading.dismiss();
    }
  }
  
  showError(text) {
    this.showPopup("Error", text);
  }
  
  showInfo(text) {
    this.showPopup("Info", text);
  }
  
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    alert.present();
  }
  
  showPopupAndRedirect(title, text, page, params) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if ( page ){
              this.navController.setRoot(page, params);
            }
          }
        }
      ]
    });
    alert.present();
  }
  
  
}