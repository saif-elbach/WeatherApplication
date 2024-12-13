import { Component, OnInit } from '@angular/core';
import { CallingAPIBackEndService } from '../services/calling-apiback-end.service';

@Component({
  selector: 'app-testing-back-end',
  templateUrl: './testing-back-end.component.html',
  styleUrls: ['./testing-back-end.component.css']
})
export class TestingBackEndComponent implements OnInit {
  
  data: any = [];

  constructor(private apiService: CallingAPIBackEndService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe(
      (response) => {
        console.log("my data : ", response);
        this.data = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
