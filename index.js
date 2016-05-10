/**
 * Created by ztt on 16-5-9.
 */
var submitButton = document.getElementsByTagName('button')[0];
var score = 0;

submitButton.onclick = function() {
    var className = document.getElementById('className');
    var studentNumber = document.getElementById('studentNumber');
    var studentName = document.getElementById('studentName');


    var basicInfo = '';

    if(className.value === '') {
        alert('please write your className');
    }else {
        basicInfo += className.value + '班';
    }
    if(studentNumber.value === '') {
        alert('please write your studentNumber');
    }else {
        basicInfo += studentNumber.value + '号';
    }
    if(studentName.value === '') {
        alert('please write your studentName');
    }else {
        basicInfo += studentName.value + '同学、总成绩为：';
    }

    if(className.value !== '' && studentName.value !== '' && studentNumber.value !== '') {
        var manyFill = document.getElementsByClassName('manyFill');

        for(var i = 0; i < manyFill.length; i++) {
            if(manyFill[i].value === '封装性' || manyFill[i].value === '继承性' || manyFill[i].value === '多态性') {
                score += 5;
            }
        }

        var choice_1 = document.getElementsByName('choice_1');
        selectScore(choice_1, 'A');

        var choice_2 = document.getElementsByName('choice_2');
        selectScore(choice_2, 'C');

        var checkbox_1 = document.getElementsByName('checkbox_1');
        selectScore(checkbox_1, 'A', 'B');

        var checkbox_2 = document.getElementsByName('checkbox_2');
        selectScore(checkbox_2, 'C', 'D');

        var fill_in_1_0 = document.getElementsByName('fill_in_1_0')[0];
        if(fill_in_1_0.value === '统一建模语言') {
            score += 5;
        }

        var judge1 = document.getElementsByName('judge1')[0];
        if(judge1.value === 'F'){
            score += 5;
        }

        var judge2 = document.getElementsByName('judge2')[0];
        if(judge2.value === 'T'){
            score += 5;
        }

        basicInfo += score;
        alert(basicInfo);
    }
}
function selectScore(selectName, answer1, answer2) {
    for(var i = 0; i < selectName.length; i++) {
        if(selectName[i].checked) {
            if(selectName[i].value === answer1 || selectName[i].value === answer2){
                score += 5;
            }else if(selectName[i].value === answer1 && selectName[i].value === answer2) {
                score += 10;
            }
        }
    }
}
