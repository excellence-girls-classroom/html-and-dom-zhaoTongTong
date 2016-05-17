var className = document.getElementsByName('className');
var studentNumber = document.getElementsByName('studentNumber');
var studentName = document.getElementsByName('studentName');
var submitButton = document.getElementsByTagName('button')[0];

submitButton.onclick = function() {
    if(className  != '' && studentName != '' && studentNumber != '') {
        var inputAnswer = getAnswer();
        xhr(inputAnswer);
    }else {
        if(className == '') {
            alert('please input className');
        }else if(studentName == '') {
            alert('please input studentName');
        }else {
            alert('please input studentNumber');
        }
    }

    return false;
}

function xhr(inputAnswer) {
    var request = new XMLHttpRequest();
    var json = [];
    var score = 0;
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
            if(request.status == 200) {
                json = JSON.parse(request.responseText);
                score = getScore(json, inputAnswer);
                document.getElementById('score').innerHTML = score;
            }
        }
    }
    request.open('GET', 'answer.json', false);
    request.send();
}

function getAnswer() {
    var studentsAnswer = [];

    var fill_in_1_0 = document.getElementsByName('fill_in_1_0')[0].value;
    var fill_in_2_0 = document.getElementsByName('fill_in_2_0')[0].value;
    var fill_in_2_1 = document.getElementsByName('fill_in_2_1')[0].value;
    var fill_in_2_2 = document.getElementsByName('fill_in_2_2')[0].value;
    var choice_1 = document.getElementsByName('choice_1');
    var choice_2 =document.getElementsByName('choice_2');
    var checkbox_1 = document.getElementsByName('checkbox_1');
    var checkbox_2 = document.getElementsByName('checkbox_2');
    var judge1 = document.getElementsByName('judge1')[0].value;
    var judge2 = document.getElementsByName('judge2')[0].value;
    var textarea = document.getElementsByTagName('textarea')[0].value;
    var choiceOne = '';
    var choiceTwo = '';
    var checkboxOne = [];
    var checkboxTwo = [];

    for(var i = 0; i < 4; i++){
        if(choice_1[i].checked) {
            choiceOne = choice_1[i].value;
        }
    }
    for(var i = 0; i < 4; i++) {
        if(choice_2[i].checked) {
            choiceTwo = choice_2[i].value;
        }
    }
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 4; j++) {
            if(checkbox_1[j].checked) {
                checkboxOne[i] = checkbox_1[j].value;
            }
            if(checkbox_2[j].checked) {
                checkboxTwo[i] = checkbox_2[j].value;
            }
        }
    }
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 4; j++) {
            if(checkbox_2[j].checked) {
                checkboxTwo[i] = checkbox_2[j].value;
            }
        }
    }

    studentsAnswer.push({"answer":[{"answer": fill_in_1_0},{"answer":[{"answer": fill_in_2_0}, {"answer": fill_in_2_1},{"answer": fill_in_2_2}]}]}, {"answer":[{"answer": choiceOne}, {"answer": choiceTwo}]}, {"answer":[{"answer": [{"answer": checkboxOne[0]}, {"answer": checkboxOne[1]}, {"answer": checkboxOne[2]}]}, {"answer": [{"answer": checkboxTwo[0]}, {"answer": checkboxTwo[1]}, {"answer": checkboxTwo[2]}]}]}, {"answer":[{"answer": judge1}, {"answer": judge2}]}, {"answer": textarea});

    return studentsAnswer;
}

function getScore(json, inputAnswer) {
    var score = 0;

    for(var i = 0; i < inputAnswer.length; i++) {
        switch(i){
            case 0:
                if(json[i].answer[0].answer === inputAnswer[i].answer[0].answer)
                score += 5;
                for(var j = 0; j < 3; j++) {
                    if(json[i].answer[1].answer[j].answer === inputAnswer[i].answer[1].answer[j].answer)
                    score += 5;
                }
                break;
            case 1:
                for(var j = 0; j < 2; j++) {
                    if(json[i].answer[j].answer === inputAnswer[i].answer[j].answer)
                    score += 5;
                }
                break;
            case 2:
                for(var a = 0; a < 2; a++) {
                    for(var j = 0; j < 3; j++){
                        if(json[i].answer[a].answer[j].answer === inputAnswer[i].answer[a].answer[j].answer)
                        score += 5;
                    }
                }
                break;
            case 3:
                for(var j = 0; j < 2; j++) {
                    if(json[i].answer[j].answer === inputAnswer[i].answer[j].answer)
                    score += 5;
                }
                break;
            default:
                if(json[i].answer === inputAnswer[i].answer)
                score += 5;
        }
    }

    return score;
}

