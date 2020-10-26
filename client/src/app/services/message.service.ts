import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class MessageService {

    constructor(private spinner: NgxSpinnerService) { }

    handleError(error) {
        alertify.set('notifier', 'position', 'top-right');
        if (typeof error == 'string') {
            alertify.error(error);
        }else{
            alertify.error(error.error['message']);
        }
       
    }

    handleSuccess(res) {
        alertify.set('notifier', 'position', 'top-right');
        if (typeof res == 'string') {
            alertify.success(res);
        }
        alertify.success(res['message']);
    }

    showLoader(status:boolean) {
      if (status) {
          this.spinner.show();
      } else {
          setTimeout(() => {
              this.spinner.hide();
            }, 500);
      }
  }


}
