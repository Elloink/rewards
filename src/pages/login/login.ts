import { PageConfig } from '../../providers/PageConfig';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/AuthService';
import { Config } from '../../providers/Config';
import { ModymService } from '../../providers/ModymService';
import { ForgotPage } from '../forgot/forgot/forgot';
import { SummaryPage } from '../summary/summary';
import { PreRegisterPage } from '../preregister/preregister';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController,
    private navParams: NavParams,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    protected config: Config,
    protected modymService: ModymService,
    private pageConfig: PageConfig
  ) { 
    this.registerCredentials.email = navParams.get("username");
    this.registerCredentials.password= navParams.get("password");
  }

  public createAccount() {
    this.nav.push(PreRegisterPage);
  }
  
  public forgotPassword(){
    this.nav.push(ForgotPage);
  }

  public login() {
    this.showLoading();

    this.auth.login(this.registerCredentials).subscribe(response => {
        if (response && response.token) {
          
          this.auth.currentUser = response;
          this.modymService.config.userToken = response.token;
          this.pageConfig.refreshMenuPages(response);
          setTimeout(() => {
            this.loading.dismiss();
            this.nav.setRoot(SummaryPage);
            
          });
        } else {
          var message= typeof response === 'string' ?  response : "Access Denied";
          this.showError(message);
        }
      },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}