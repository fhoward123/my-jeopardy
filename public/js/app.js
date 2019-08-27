// The name we use in "index.html"
const app = angular.module('JeopardyApp', []);

app.controller('JeopardyController', [ '$http', '$timeout', function($http, $timeout) {
    this.appName = 'Welcome to Jeopardy!';
    this.URL = 'http://jservice.io/api/random';
    this.question = '';
    this.answer = '';
    this.category = '';
    this.airdate = '';
    this.value = 0;
    this.score = 0;
    this.showAnswer = false;
    this.showAnsBtn = false;
    this.showQuesBtn = true;
    this.showAddSubBtns = false;
    this.showText = false;
    this.timeLimit = 20;
    this.counter = this.timeLimit;
    this.countdownBy = 1000;
    this.decrementValue = this.countdownBy;

    // Must be Arrow Function because of recurvise use of "this"
    this.countdown = () => {
        this.counter -= 1;
        // $interval(this.countdown, 1000);
        if ( this.counter !== 0 ) {
            $timeout(this.countdown, this.decrementValue);
        }
        else {
            this.counter = "TIME'S UP!";
        }
    };

    this.getQuestion = () => {
        // Use $http service to make AJAX request
        $http({
            method: 'GET',
            // When ng-submit is executed it will update this.movieTitle
            // with the value that was input
            url: this.URL
            // .then runs if call succeeds. $http returns a Promise
        }).then( response => {  // MUST be Arrow Function because "this"
            // is used inside of it!!!
            this.counter = this.timeLimit;
            this.decrementValue = this.countdownBy;
            console.log('Data returned: ', response.data);
            this.question = response.data[0].question;
            this.answer = response.data[0].answer;
            this.value = response.data[0].value;
            this.category = response.data[0].category.title;
            // airdate: "2001-02-02T12:00:00.000Z"
            this.airdate = response.data[0].airdate.substr(0, 10);
            this.showAnsBtn = true;
            this.showAnswer = false;
            this.showText = true;
            this.showQuesBtn = false;
        // Handles errors in case AJAX call failed
        }).catch( err => console.error('Catch: ', err ));
        this.countdown();
    };

    this.toggleDisplay = function() {
        this.decrementValue = 1;
        this.showAnswer = ! this.showAnswer;
        this.showAnsBtn = ! this.showAnsBtn;
        this.showAddSubBtns = true;
    };

    this.addPoint = function() {
        this.score += this.value;
        this.showQuesBtn = true;
        this.showAddSubBtns = false;
    };

    this.subPoint = function() {
        this.score -= this.value;
        this.showQuesBtn = true;
        this.showAddSubBtns = false;
    }

    this.resetGame = function() {
        this.question = '';
        this.answer = '';
        this.category = '';
        this.airdate = '';
        this.value = 0;
        this.score = 0;
        this.showAnswer = false;
        this.showAnsBtn = false;
        this.showText = false;
        this.showQuesBtn = true;
        this.showAddSubBtns = false;
    }
}]);
