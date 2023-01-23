let bg = document.getElementById('loader-bg'), loader = document.getElementById('loader');
bg.classList.remove('is-hide');
loader.classList.remove('is-hide');
window.addEventListener("load", endLoad, false);
function endLoad() {
    setTimeout(() => {
        bg.classList.add('fadeout-bg');
        loader.classList.add('fadeout-loader');
    }, 1500)
}
let music = 0, filePath, FileOption, FileName, Path = [];
FileName = document.getElementById("fileName");
Path = FileName.innerText.split('\n');
let buttonText = document.getElementById("Button");
let Judgement = document.getElementById("Judge");
let adjSpeed = document.getElementById("Speed");
const alphabet = ['A', 'S', 'D', 'J', 'K', 'L'];
window.addEventListener('DOMContentLoaded', function () {
    adjSpeed.addEventListener('change', speedchange, false);
    FileName.addEventListener('change', selectStatus, false);
    function selectStatus() {
        JSONDraw();
        if (musicInterval != 0) {
            music.pause();
            notesSpeed = 0;
            clearTimeout(musicInterval);
            musicInterval = 0;
            buttonText.value = '再生';
        }
        for (let i = 0; i < FileName.length; i++) {
            if (FileName[i].selected) {
                FileOption = FileName[i].value;
                if (FileOption != 0) {
                    Status.Option = 'selected';
                    filePath = './Music/' + Path[FileOption - 1] + '.mp3';
                    music = new Audio(filePath);
                    music.load();
                } else {
                    Status.Option = 0;
                }
            }
        }
    }
});
const canvas = document.getElementById("myCanvas");
const ctx = document.getElementById("myCanvas").getContext("2d");
ctx.textBaseline = "hanging";
ctx.font = "30px 'MS PGothic', san-serif";
let notesWidth = canvas.width / 6;
let splitWidth = 2;
let notesHeight = canvas.height / 50;
let x_Notes = canvas.width - notesWidth;
let SubnotesSpeed = canvas.height / 400 * adjSpeed.value / 6.0;//100
let notesSpeed = 0;
let musicInterval = 0;
let Status = { Option: 0, Music: 0 }
let stan = 0;
let LinePositionData = 0
let LinePositionNumber = 0
let FullCondition = 0;
let originalData = {
    id: 'score',
    name: "score data",
    Miss: 0,
    Good: 0,
    perfect: 0
};
function readJSON(callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "./sheet/Sheets.json.js";
    document.body.appendChild(script);
    console.log('loaded');
    script.addEventListener('load', callback, false);
}
let one, two, three, four, five, six;
function JSONDraw() {
    console.log(window.sheets)
    if (FileName.value != 0) {
        LinePositionData = { one: [], two: [], three: [], four: [], five: [], six: [] };
        LinePositionNumber = { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0 }
        stan = canvas.height * 0.9;
        stan = stan - SubnotesSpeed * 400;
        ctx.beginPath();
        for (var i = 0; i < window.sheets[FileName.value - 1].notesData.length; i++) {
            if (window.sheets[FileName.value - 1].notesData[i].notesPosition.one == 'touch') {
                ctx.rect(0, stan - SubnotesSpeed * 200 / 8 * i, notesWidth * 0, notesHeight);
                LinePositionData.one[LinePositionNumber.one] = stan - SubnotesSpeed * 200 / 8 * i;
                LinePositionNumber.one++;
                console.log(i, '1')
            } if (window.sheets[FileName.value - 1].notesData[i].notesPosition.two == 'touch') {
                ctx.rect(0, stan - SubnotesSpeed * 200 / 8 * i, notesWidth * 1, notesHeight);
                LinePositionData.two[LinePositionNumber.two] = stan - SubnotesSpeed * 200 / 8 * i;
                LinePositionNumber.two++;
                console.log(i, '2')
            } if (window.sheets[FileName.value - 1].notesData[i].notesPosition.three == 'touch') {
                ctx.rect(0, stan - SubnotesSpeed * 200 / 8 * i, notesWidth * 2, notesHeight);
                LinePositionData.three[LinePositionNumber.three] = stan - SubnotesSpeed * 200 / 8 * i;
                LinePositionNumber.three++;
                console.log(i, '3')
            } if (window.sheets[FileName.value - 1].notesData[i].notesPosition.four == 'touch') {
                ctx.rect(0, stan - SubnotesSpeed * 200 / 8 * i, notesWidth * 3, notesHeight);
                LinePositionData.four[LinePositionNumber.four] = stan - SubnotesSpeed * 200 / 8 * i;
                LinePositionNumber.four++;
                console.log(i, '4')
            } if (window.sheets[FileName.value - 1].notesData[i].notesPosition.five == 'touch') {
                ctx.rect(0, stan - SubnotesSpeed * 200 / 8 * i, notesWidth * 4, notesHeight);
                LinePositionData.five[LinePositionNumber.five] = stan - SubnotesSpeed * 200 / 8 * i;
                LinePositionNumber.five++;
                console.log(i, '5')
            } if (window.sheets[FileName.value - 1].notesData[i].notesPosition.six == 'touch') {
                ctx.rect(0, stan - SubnotesSpeed * 200 / 8 * i, notesWidth * 5, notesHeight);
                LinePositionData.six[LinePositionNumber.six] = stan - SubnotesSpeed * 200 / 8 * i;
                LinePositionNumber.six++;
                console.log(i, '6')
            }
        }
        ctx.fillStyle = 'rgb(255, 165, 0)';
        ctx.fill();
        ctx.closePath();
    }
}
function speedchange() {
    console.log(LinePositionData)
    SubnotesSpeed = canvas.height / 400 * adjSpeed.value / 6.0;
    if (musicInterval != 0) {
        readJSON(JSONDraw)
        console.log(LinePositionData)
        music.pause();
        notesSpeed = 0;
        music.currentTime = 0
        clearTimeout(musicInterval);
        musicInterval = 0;
        buttonText.value = '再生';
    }
}
function outputJSON() {
    var JSONFileName = "result.json";
    var data = JSON.stringify(originalData);
    var link = document.createElement("a");
    link.href = "data:text/plain," + encodeURIComponent(data);
    link.download = JSONFileName;
    link.click();
}
let keyState = { a: false, s: false, d: false, j: false, k: false, l: false };
let keyStateArrangement = [keyState.a, keyState.s, keyState.d, keyState.j, keyState.k, keyState.l];
const keyLine = ["a", "s", "d", "j", "k", "l"];
document.addEventListener("keydown", (event) => {
    for (var i = 0; i < keyLine.length; i++) {
        if (keyStateArrangement[i] != true && event.key == keyLine[i]) {
            keyStateArrangement[i] = true;
            Judge(i + 1);
        }
    }
}, false);
document.addEventListener("keyup", (event) => {
    for (var i = 0; i < keyLine.length; i++) {
        if (event.key == keyLine[i]) {
            keyStateArrangement[i] = false;//Math.round(positionData / 10) * 10
        }
    }
}, false);
function FilldrawJudge() {
    for (var i = 0; i < keyLine.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(11,244,227,0.3)';
        if (keyStateArrangement[i]) {
            ctx.rect(notesWidth * i, 0, notesWidth, canvas.height);
            ctx.fill();
        }
        ctx.closePath();
    }
}
function musicControl() {
    if (Status.Option == 0) {
        alert('曲を選択してください')
    } else if (adjSpeed.value > 12 || adjSpeed.value < 1) {
        alert('ノーツ速度は最大12　最小1です')
    } else if (music != 0 && buttonText.value == '再生') {
        musicInterval = () => {
            music.play();
        }
        musicInterval();
        notesSpeed = SubnotesSpeed;
        buttonText.value = '停止';
    } else if (music != 0 && buttonText.value == '停止') {
        music.pause();
        notesSpeed = 0;
        buttonText.value = '再開'
    } else if (music != 0 && buttonText.value == '再開') {
        music.play();
        notesSpeed = SubnotesSpeed;
        buttonText.value = '停止';
    }
}
/*function FullChange(){
    if(FullCondition==0){
        canvas.requestFullscreen();
    }else{
        canvas.exitFullscreen();
    }
}*/
function drawJudgeline() {
    ctx.beginPath();
    ctx.rect(0, 0+canvas.height * 0.9, canvas.width, notesHeight / 3);
    ctx.fillStyle = 'rgb(15, 89, 255)';
    ctx.fill();
    ctx.closePath();
}
function splitCanvas() {
    ctx.beginPath();
    for (var l = 1; l < 6; l++) {
        ctx.rect(notesWidth * l - splitWidth / 2, 0, splitWidth, canvas.height);
    }
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fill();
    ctx.closePath();
}
let result_Judge = ''
let JudgeDataSet = { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0 }
function Judge(e) {
    result_Judge = '';
    if (e == 1) {
        if (LinePositionData != 0) {
            if ((JudgeDataSet.one <= (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 8) && JudgeDataSet.one > (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 16)) || (JudgeDataSet.one >= (canvas.height * 0.9 - SubnotesSpeed * 200 / 8) && JudgeDataSet.one < (canvas.height * 0.9 - SubnotesSpeed * 200 / 16))) {
                originalData.Good++;
                if (result_Judge == 'PERFECT') { result_Judge = 'GOOD' }
                LinePositionData.one[t.one] = false;
            } if (JudgeDataSet.one <= (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 16) && JudgeDataSet.one >= (canvas.height * 0.9 - SubnotesSpeed * 200 / 16)) {
                originalData.perfect++;
                if (result_Judge != 'GOOD' && result_Judge != 'MISS') { result_Judge = 'PERFECT' }
                LinePositionData.one[t.one] = false;
            }
        }
    } if (e == 2) {
        if (LinePositionData != 0) {
            if ((JudgeDataSet.two <= (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 8) && JudgeDataSet.two > (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 16)) || (JudgeDataSet.two >= (canvas.height * 0.9 - SubnotesSpeed * 200 / 8) && JudgeDataSet.two < (canvas.height * 0.9 - SubnotesSpeed * 200 / 16))) {
                originalData.Good++;
                if (result_Judge == 'PERFECT') { result_Judge = 'GOOD' }
                LinePositionData.two[t.two] = false;
            } if (JudgeDataSet.two <= (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 16) && JudgeDataSet.two >= (canvas.height * 0.9 - SubnotesSpeed * 200 / 16)) {
                originalData.perfect++;
                if (result_Judge != 'GOOD' && result_Judge != 'MISS') { result_Judge = 'PERFECT' }
                LinePositionData.two[t.two] = false;
            }
        }
    } if (e == 3) {
        if (LinePositionData != 0) {
            if ((JudgeDataSet.three <= (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 8) && JudgeDataSet.three > (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 16)) || (JudgeDataSet.three >= (canvas.height * 0.9 - SubnotesSpeed * 200 / 8) && JudgeDataSet.three < (canvas.height * 0.9 - SubnotesSpeed * 200 / 16))) {
                originalData.Good++;
                if (result_Judge == 'PERFECT') { result_Judge = 'GOOD' }
                LinePositionData.three[t.three] = false;
            } if (JudgeDataSet.three <= (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 16) && JudgeDataSet.three >= (canvas.height * 0.9 - SubnotesSpeed * 200 / 16)) {
                originalData.perfect++;
                if (result_Judge != 'GOOD' && result_Judge != 'MISS') { result_Judge = 'PERFECT' }
                LinePositionData.three[t.three] = false;
            }
        }
    } if (e == 4) {
        if (LinePositionData != 0) {
            if ((JudgeDataSet.four <= (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 8) && JudgeDataSet.four > (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 16)) || (JudgeDataSet.four >= (canvas.height * 0.9 - SubnotesSpeed * 200 / 8) && JudgeDataSet.four < (canvas.height * 0.9 - SubnotesSpeed * 200 / 16))) {
                originalData.Good++;
                if (result_Judge == 'PERFECT') { result_Judge = 'GOOD' }
                LinePositionData.four[t.four] = false;
            } if (JudgeDataSet.four <= (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 16) && JudgeDataSet.four >= (canvas.height * 0.9 - SubnotesSpeed * 200 / 16)) {
                originalData.perfect++;
                if (result_Judge != 'GOOD' && result_Judge != 'MISS') { result_Judge = 'PERFECT' }
                LinePositionData.four[t.four] = false;
            }
        }
    } if (e == 5) {
        if (LinePositionData != 0) {
            if ((JudgeDataSet.five <= (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 8) && JudgeDataSet.five > (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 16)) || (JudgeDataSet.five >= (canvas.height * 0.9 - SubnotesSpeed * 200 / 8) && JudgeDataSet.five < (canvas.height * 0.9 - SubnotesSpeed * 200 / 16))) {
                originalData.Good++;
                if (result_Judge == 'PERFECT') { result_Judge = 'GOOD' }
                LinePositionData.five[t.five] = false;
            } if (JudgeDataSet.five <= (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 16) && JudgeDataSet.five >= (canvas.height * 0.9 - SubnotesSpeed * 200 / 16)) {
                originalData.perfect++;
                if (result_Judge != 'GOOD' && result_Judge != 'MISS') { result_Judge = 'PERFECT' }
                LinePositionData.five[t.five] = false;
            }
        }
    } if (e == 6) {
        if (LinePositionData != 0) {
            if ((JudgeDataSet.six <= (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 8) && JudgeDataSet.six > (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 16)) || (JudgeDataSet.six >= (canvas.height * 0.9 - SubnotesSpeed * 200 / 8) && JudgeDataSet.six < (canvas.height * 0.9 - SubnotesSpeed * 200 / 16))) {
                originalData.Good++;
                if (result_Judge == 'PERFECT') { result_Judge = 'GOOD' }
                LinePositionData.six[t.six] = false;
            } if (JudgeDataSet.six <= (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 16) && JudgeDataSet.six >= (canvas.height * 0.9 - SubnotesSpeed * 200 / 16)) {
                originalData.perfect++;
                if (result_Judge != 'GOOD' && result_Judge != 'MISS') { result_Judge = 'PERFECT' }
                LinePositionData.six[t.six] = false;
            }
        }
    }
    Judgement.innerText = result_Judge;
}
let t = { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0 }
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(255, 165, 0)';
    for (var i = 0; i <= 5; i++) {
        ctx.fillText(alphabet[i], notesWidth * i + notesWidth / 2, canvas.height * 0.9 + notesHeight);
    }
    drawJudgeline();
    FilldrawJudge();
    if (FileName.value != 0) {
        ctx.beginPath();
        for (var i = 0; i < LinePositionData.one.length; i++) {
            if (LinePositionData.one[i] != false) {
                ctx.rect(notesWidth * 0, LinePositionData.one[i], notesWidth, notesHeight);
                LinePositionData.one[i] += notesSpeed;
            }
        } for (var i = 0; i < LinePositionData.two.length; i++) {
            if (LinePositionData.two[i] != false) {
                ctx.rect(notesWidth * 1, LinePositionData.two[i], notesWidth, notesHeight);
                LinePositionData.two[i] += notesSpeed;
            }
        } for (var i = 0; i < LinePositionData.three.length; i++) {
            if (LinePositionData.three[i] != false) {
                ctx.rect(notesWidth * 2, LinePositionData.three[i], notesWidth, notesHeight);
                LinePositionData.three[i] += notesSpeed;
            }
        } for (var i = 0; i < LinePositionData.four.length; i++) {
            if (LinePositionData.four[i] != false) {
                ctx.rect(notesWidth * 3, LinePositionData.four[i], notesWidth, notesHeight);
                LinePositionData.four[i] += notesSpeed;
            }
        } for (var i = 0; i < LinePositionData.five.length; i++) {
            if (LinePositionData.five[i] != false) {
                ctx.rect(notesWidth * 4, LinePositionData.five[i], notesWidth, notesHeight);
                LinePositionData.five[i] += notesSpeed;
            }
        } for (var i = 0; i < LinePositionData.six.length; i++) {
            if (LinePositionData.six[i] != false) {
                ctx.rect(notesWidth * 5, LinePositionData.six[i], notesWidth, notesHeight);
                LinePositionData.six[i] += notesSpeed;
            }
        }
        ctx.fillStyle = 'rgb(255, 165, 0)';
        ctx.fill();
        ctx.closePath();
    }
    if (JudgeDataSet.one > (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 8)) { LinePositionData.one[t.one] = false; originalData.Miss++; result_Judge = 'MISS' }
    if (JudgeDataSet.two > (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 8)) { LinePositionData.two[t.two] = false; originalData.Miss++; result_Judge = 'MISS' }
    if (JudgeDataSet.three > (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 8)) { LinePositionData.three[t.three] = false; originalData.Miss++; result_Judge = 'MISS' }
    if (JudgeDataSet.four > (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 8)) { LinePositionData.four[t.four] = false; originalData.Miss++; result_Judge = 'MISS' }
    if (JudgeDataSet.five > (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 8)) { LinePositionData.five[t.five] = false; originalData.Miss++; result_Judge = 'MISS' }
    if (JudgeDataSet.six > (canvas.height * 0.9 + notesHeight / 3 + SubnotesSpeed * 200 / 8)) { LinePositionData.six[t.six] = false; originalData.Miss++; result_Judge = 'MISS' }
    JudgeDataSet.one = 0;
    JudgeDataSet.two = 0;
    JudgeDataSet.three = 0;
    JudgeDataSet.four = 0;
    JudgeDataSet.five = 0;
    JudgeDataSet.six = 0;
    if (LinePositionData != 0) {
        for (t.one = 0; t.one < LinePositionData.one.length; t.one++) {
            if (LinePositionData.one[t.one] != false) {
                JudgeDataSet.one = LinePositionData.one[t.one]
                break;
            }
        } for (t.two = 0; t.two < LinePositionData.two.length; t.two++) {
            if (LinePositionData.two[t.two] != false) {
                JudgeDataSet.two = LinePositionData.two[t.two]
                break;
            }
        } for (t.three = 0; t.three < LinePositionData.three.length; t.three++) {
            if (LinePositionData.three[t.three] != false) {
                JudgeDataSet.three = LinePositionData.three[t.three]
                break;
            }
        } for (t.four = 0; t.four < LinePositionData.four.length; t.four++) {
            if (LinePositionData.four[t.four] != false) {
                JudgeDataSet.four = LinePositionData.four[t.four]
                break;
            }
        } for (t.five = 0; t.five < LinePositionData.five.length; t.five++) {
            if (LinePositionData.five[t.five] != false) {
                JudgeDataSet.five = LinePositionData.five[t.five]
                break;
            }
        } for (t.six = 0; t.six < LinePositionData.six.length; t.six++) {
            if (LinePositionData.six[t.six] != false) {
                JudgeDataSet.six = LinePositionData.six[t.six]
                break;
            }
        }
    }
    splitCanvas();
    Judgement.innerText = result_Judge;
}
readJSON(JSONDraw);
setInterval(draw, 5);