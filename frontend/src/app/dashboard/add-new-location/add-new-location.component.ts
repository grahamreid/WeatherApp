import { Component, OnInit, TemplateRef, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LocationService_Rest } from '@app-root/core/http/rest-api.services'

// Card and modal for when user is adding new location
@Component({
  selector: 'app-add-new-location',
  templateUrl: './add-new-location.component.html',
  styleUrls: ['./add-new-location.component.scss'],
  providers: [LocationService_Rest]
})
export class AddNewLocationComponent implements OnInit {

  // update dashboard after new location is added
  @Output() refresh: EventEmitter<any> = new EventEmitter();

  @ViewChild("new_location")

  // alert if adding location fails (displayed in modal)
  _error = false

  modalRef: BsModalRef;
  constructor(private modal_service: BsModalService,
              private location_service: LocationService_Rest) {
  }

  ngOnInit() {  
  }

  add_new_location(location) {
    if (location === '')
      return

    // Handle when user tries to save new location in modal
    this._error = false
    this.location_service.add_location(location)
      .subscribe((data) => {
        this.modalRef.hide()
        this.refresh.emit()
      }, (err) => {
          if (err.status==400) {
            this._error = true
            document.getElementById('name-alert').hidden = false
          }
        })
  }

  //hacky, really the modal should be its own component but this is a quickfix
  openModal(template: TemplateRef<any>) {
    const mod_ref = this.modalRef = this.modal_service.show(template);
    document.getElementById('name-alert').hidden = true
    setTimeout(() => document.getElementById('new_location').focus(), 100
    )}
}
