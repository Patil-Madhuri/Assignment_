import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  news;
  commenttext = '';
  newsList = [];
  constructor() { }

  ngOnInit(): void {
    this.news = JSON.parse(localStorage.getItem('singlenews'));
    this.newsList = JSON.parse(localStorage.getItem('news'))
  }

  addComment() {
    console.log(this.commenttext);
    let commentsArray = [];
    if (this.news.comments !== undefined) {
      commentsArray = this.news.comments;
      commentsArray.push({
        'name': 'Default user',
        'comment': this.commenttext
      })
    }
    var newObj = {
      id: this.news.id,
      title: this.news.title,
      link: this.news.link,
      minutes: this.news.minutes,
      by: this.news.by,
      pointCount: this.news.pointCount,
      commentsCount: this.news.commentsCount++,
      comments: commentsArray
    }
    this.commenttext = "";
    let foundIndex = this.newsList.findIndex(obj => obj.id === this.news.id)
    this.newsList.splice(foundIndex + 1, 1)
    this.newsList.splice(foundIndex + 1, 0, newObj);
    localStorage.removeItem('news');
    localStorage.setItem('news', JSON.stringify(this.newsList))

  }
}
