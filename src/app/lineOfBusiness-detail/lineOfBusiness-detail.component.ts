import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { RecentQuoteService } from '../recentQuotes.service';
import { RecentQuote } from '../RecentQuote';
import { QuoteSummary } from '../QuoteSummary';
@Component({
  selector: 'app-lineOfBusiness-detail',
  templateUrl: './lineOfBusiness-detail.component.html',
  styleUrls: ['./lineOfBusiness-detail.component.css']
})
export class LineOfBusinessDetailComponent implements OnInit {
  lineOfBusiness: LineOfBusiness | undefined;
  recentQuotes: RecentQuote[] = []
  quoteSummary: QuoteSummary = { id: 0, name: "", count: 0 };
  constructor(
    private route: ActivatedRoute,
    private lineOfBusinessService: LineOfBusinessService,
    private recentQuotesService: RecentQuoteService,
    private location: Location

  ) { }

  ngOnInit(): void {
    this.getLineOfBusiness();
  }

  getLineOfBusiness(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe((lineOfBusiness) => { this.lineOfBusiness = lineOfBusiness; this.getRecentQuotes() });
  }
  getRecentQuotes(): void {
    this.recentQuotesService.getRecentQuotes()
      .subscribe((recentQuotes) => { this.recentQuotes = recentQuotes; this.getQuotesCountById() });

  }
  getQuotesCountById(): void {
    var lobName = this.lineOfBusiness?.name != null ? this.lineOfBusiness.name : "";
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    var group = this.recentQuotes.filter(recentQuote => recentQuote.lineOfBusiness === id);
    this.quoteSummary = { id: id, name: lobName, count: group.length };
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.lineOfBusiness) {
      this.lineOfBusinessService.updateLineOfBusiness(this.lineOfBusiness)
        .subscribe(() => this.goBack());
    }
  }
}
