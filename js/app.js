angular
    .module('app', [])
    // .value('tests', {})
    .factory('connectionFactory', ['$http', connectionFactory])
    .controller('appController', ['$scope', 'connectionFactory', appController])

function connectionFactory($http) {
    var questionsUrl = 'questions.json',
        sendUrl = '/'; // should be replaced with original URL

    function getTests() {
        return $http.get(questionsUrl);
    }

    function sendData(data) {
        $http.post(sendUrl, data);
    }

    return {
        getTests: getTests,
        sendData: sendData
    }
}

function appController($scope, connectionFactory) {
    $scope.current = 0;
    $scope.userAnswers = [];
    $scope.next = next;
    $scope.back = back;
    $scope.isDisabled = isDisabled;
    $scope.submitData = submitData;
    $scope.currentPosition = 0;

    connectionFactory.getTests()
        .then(successCB, errorCB);

    function successCB(response) {
        $scope.questions = response.data.questions;
        $scope.questions.forEach(function (item) {
            $scope.userAnswers.push({
                question: item.question,
                answers: []
            });
        });
    }
    function errorCB(err) {
        throw err;
    }
    function replaceFalse() {
        $scope.questions[$scope.current].answers.forEach(function (answer, i) {
            if(!$scope.userAnswers[$scope.current].answers[i]) {
                $scope.userAnswers[$scope.current].answers[i] = false;
            }
        });
    }
    function next() {
        var qstWrapper = angular.element(document.querySelector('.test-wrapper'));

        $scope.currentPosition += 100;
        qstWrapper.css('margin-left', -$scope.currentPosition + '%');
        replaceFalse();
        return $scope.current++
    }
    function back() {
        var qstWrapper = angular.element(document.querySelector('.test-wrapper'));

        $scope.currentPosition -= 100;
        qstWrapper.css('margin-left', -$scope.currentPosition + '%');
        return $scope.current--
    }
    function isDisabled() {
        if($scope.userAnswers[$scope.current]) {
            return !~$scope.userAnswers[$scope.current].answers.indexOf(true);
        }
        return false;
    }
    function submitData() {
        $scope.isSubmitted = true;
        replaceFalse();
        var userData = replaceText(); // or $scope.userAnswers instead of replaceText() if only true-false of results needed;
        var creativeId = creativeIdGenerator();
        var sendData = {
            creativeId: creativeId,
            answers: userData
        };
        console.log($scope.userAnswers);
        connectionFactory.sendData(sendData);


        function replaceText() {
            var result = [];
            $scope.userAnswers.forEach(function (question, i) {
                result[i] = {
                    question: question.question,
                    answers: []
                };
                question.answers.forEach(function (answer, j) {
                    if(answer) {
                        result[i].answers.push($scope.questions[i].answers[j]);
                    }
                });
            });
            return result;
        }
        function creativeIdGenerator() {
            var S4 = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
    }
}