//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다
//랜덤번호가 <유저번호 이면 Down!
//랜덤번호가 > 유저번호 이면 UP!
//Reset 버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다(버튼 Disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. and 기회 깎지 않음
//유저가 이미 입력한 숫자를 또 입력하면 알려줌. and 기회 깎지 않음

let computerNum = 0;
let chances = 5;
let gameOver = false;
let history=[];

let playButton = document.getElementById("play_button");
let userInput = document.getElementById("user_input");
let resultArea = document.getElementById("result_area");
let resetButton = document.getElementById("reset_button");
let chanceArea = document.getElementById("chance_area");
let numberHistory = document.getElementById("number_history");


playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus",function(){userInput.value=""});

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100)+1;
    // console.log("정답",computerNum);
}

function play(){
    let userValue = userInput.value;

    if (userValue === "") {
        return alert("숫자를 입력해주세요");
    }

    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력해 주세요"
        return;
    }
    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요";
        return;
    }
    userInput.value = "";
    chances --;
    chanceArea.textContent=`남은기회${chances}번`;
    // console.log("chance",chances);

    if(userValue < computerNum){
        resultArea.textContent = "UP"; //html resultArea부분에 텍스트로 표시됨
    } else if(userValue > computerNum){
        resultArea.textContent = "DOWN";
    } else{
        resultArea.textContent = "정답";
        gameOver=true;
    }

    history.push(userValue)
    numberHistory.textContent=`기록: ${history}`;
    // console.log(history);

    if (chances == 0){
        gameOver=true;
        resultArea.textContent=`정답은 ${computerNum}이였습니다.`;
    }

    if(gameOver == true){
        playButton.disabled = true;
    }
    
}

function reset(){
    //user input창,기록창 깨끗하게 정리
    userInput.value = "";
    numberHistory.textContent ="";
    //초기화
    chances = 5;
    gameOver = false;
    playButton.disabled = false; // 플레이 버튼 다시 활성화
    chanceArea.textContent = `남은기회${chances}번`; // 남은 기회 업데이트
    history = []; // 기록 초기화

    //새로운 번호 부여
    pickRandomNum();
    resultArea.textContent="리셋완료";
}
pickRandomNum();