import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-raida-status',
  templateUrl: './raida-status.component.html',
  styleUrls: ['./raida-status.component.scss']
})
export class RaidaStatusComponent implements OnInit {

  public isTimeout: boolean = false;
  payload: any;
  public latencies: any;
  public errorInfo: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getEcho();
  }
  async doTaskPoll(taskID: any) {
    let task: any = await this.api.doTaskPoll(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "completed") {
        this.latencies = this.payload?.data?.latencies;
        var item = this.latencies.filter(x => x === 0);
        if (item?.length !== 0) {
          this.isTimeout = true;
        }
        // let data = this.payload.data;
        // let h = "";
        // for (let i = 0; i < data.pownarray.length; i++) {
        //   let st = data.pownarray[i]
        //   if (st != 1) {
        //     h += "<span class='rf'>" + i + "</span>"
        //   } else {
        //     h += "<span class='pf'>" + i + "</span>"
        //   }
        // }
        return;
      }
      setTimeout(() => {
        this.doTaskPoll(taskID)
      }, 500)
    }
  }
  async getEcho() {
    this.errorInfo = false;
    this.payload = null;
    try {
      let response: any = await this.api.raidaEcho();
      if (response) {
        this.payload = response.payload;
        this.doTaskPoll(this.payload?.id);
      }
    }
    catch (e) {
      Swal.fire({
        title: 'Raida Servers disconnected!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SYNC',
      }).then((result) => {
        if (result.value) {
          {
            this.getEcho();
          }
        }
      });
    }
  }


  // tabToggler(val: string) {
  //   this.tabSelector = val;
  // }

}
