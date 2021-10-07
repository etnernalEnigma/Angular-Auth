import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents:any={'name':'', 'description':'', 'date':new Date()}
  constructor(private _specialEvents: EventService, private _router:Router) { }

  ngOnInit(): void {
    this._specialEvents.getSpecialEvents().subscribe(
      res=>this.specialEvents=res,
      err=> {if(err instanceof HttpErrorResponse)
        if(err.status=== 401)
        {
          this._router.navigate(['/login'])
        }
      }
    )
  }

}
