import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CrowdfundService } from '../crowdfund.service';

@Component({
  selector: 'app-edit-fund',
  templateUrl: './edit-fund.component.html',
  styleUrls: ['./edit-fund.component.css'],
  providers: [ CrowdfundService ]
})
export class EditFundComponent implements OnInit {
  fundId: string = null;
  fund;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private crowdfundService: CrowdfundService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.fundId = urlParameters['id'];
    });
    this.fund = this.crowdfundService.getFundById(this.fundId)
  }

  saveFundChanges(title: string, goalAmount: string, description: string, contact: string, category: string) {
    let fundToEdit = this.crowdfundService.getFundById(this.fundId);
    fundToEdit.update({
      title: title,
      goalAmount: goalAmount,
      description: description,
      contact: contact,
      category: category
    });
    this.router.navigate(['funds', this.fundId]);
  }

  deleteFund() {
    let fundInDatabase = this.crowdfundService.getFundById(this.fundId);
    fundInDatabase.remove();
    this.router.navigate(['']);
  }

  deleteLevel(level) {
    let fundInDatabase;
    this.crowdfundService.getFundById(this.fundId).subscribe(dataLastEmittedFromObserver => {
      fundInDatabase = dataLastEmittedFromObserver;
    });
    let levelIndex = fundInDatabase.levels.indexOf(level);
    let observableLevel = this.crowdfundService.getLevelByIndex(levelIndex, this.fundId);
    observableLevel.remove();

  }

}
