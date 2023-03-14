import { Component, OnInit } from '@angular/core';
import { RecentQuote } from '../RecentQuote';
import { QuoteSummary } from '../QuoteSummary';
import { RecentQuoteService } from '../recentQuotes.service';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LineOfBusiness } from '../LineOfBusiness';
@Component({
  selector: 'app-quoting-detail',
  templateUrl: './quoting-detail.component.html',
  styleUrls: ['./quoting-detail.component.css']
})
export class QuotingDetailComponent implements OnInit {
  recentQuotes: RecentQuote[] = [];
  lineOfBusiness: LineOfBusiness[] = [];
  quoteSummary: QuoteSummary[] = [];
  grouped = [];
  constructor(
    private recentQuotesService: RecentQuoteService,
    private lineOfBusinessService: LineOfBusinessService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getRecentQuotes();

  }
  getRecentQuotes(): void {
    this.recentQuotesService.getRecentQuotes()
      .subscribe((recentQuotes) => { this.recentQuotes = recentQuotes; this.getLineOfBusiness() });

  }

  getLineOfBusiness(): void {
    this.lineOfBusinessService.getLinesOfBusiness()
      .subscribe((lineOfBusiness) => { this.lineOfBusiness = lineOfBusiness; this.getQuoteCountById() });
  }
  getQuoteCountById(): void {
    for (var l of this.lineOfBusiness) {
      var group = this.recentQuotes.filter(recentQuote => recentQuote.lineOfBusiness === l.id);
      this.quoteSummary.push({ id: l.id, name: l.name, count: group.length });
      this.quoteSummary.sort((a, b) => b.count - a.count);
    }
    this.quoteSummary = this.quoteSummary.slice(0, 2);
  }
}
