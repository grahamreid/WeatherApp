import { Component, OnInit, TemplateRef, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LocationService_Rest } from '@app-root/core/http/rest-api.services'

@Component({
  selector: 'app-add-new-location',
  templateUrl: './add-new-location.component.html',
  styleUrls: ['./add-new-location.component.scss'],
  providers: [LocationService_Rest]
})
export class AddNewLocationComponent implements OnInit {

  @Output() refresh: EventEmitter<any> = new EventEmitter();
  _error = false

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,
              private location_service: LocationService_Rest) {
  }

  ngOnInit() {  
  }

  //TODO: sanitize this
  add_new_location(location) {
    if (location === '')
      return
    this._error = false
    this.location_service.add_location(location)
      .subscribe((data) => {
        this.modalRef.hide()
        this.refresh.emit()
      }, (err) => {
          if (err.status==400) {
            this._error = true
          }
        })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
