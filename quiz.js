const start_btn = document.querySelector(".start_btn");
const info_box = document.querySelector(".info_box");
const quit = info_box.querySelector(".buttons .quit");
const restart = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const next_btn = quiz_box.querySelector("footer .next_btn");
const timeText = document.querySelector(".timer .timer_left_text");
const timeCount = document.querySelector(".timer .timer_sec");
const bottom_ques_counter = document.querySelector("footer .total_que");
const repeat = document.querySelector(".repeat");
const close = document.querySelector(".close");
const time_line = document.querySelector("header .time_line");

start_btn.onclick = function () {
  info_box.classList.add("active");
};
quit.onclick = function () {
  info_box.classList.remove("active");
};
restart.onclick = function () {
  info_box.classList.remove("active");
  

  quiz_box.classList.add("active");
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
};
let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

function showQuestions(index) {
  let que_text = document.querySelector(".que_text");

  let que_tag =
    "<span>" +
    Questions[index].numb +
    "." +
    Questions[index].Question +
    "</span>";
  que_text.innerHTML = que_tag;

  let option_text =
    '<div class="option">' +
    Questions[index].Option[0] +
    "</div>" +
    '<div class="option">' +
    Questions[index].Option[1] +
    "</div>" +
    '<div class="option">' +
    Questions[index].Option[2] +
    "</div>" +
    '<div class="option">' +
    Questions[index].Option[3] +
    "</div>";

  option_list.innerHTML = option_text;

  const option = option_list.querySelectorAll(".option");

  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionselected(this)");
  }
}


let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionselected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);

  let userAns = answer.textContent;
  let correcAns = Questions[que_count].answer;
  console.log(userAns);
  console.log(correcAns);
  const allOption = option_list.children.length;

 

                    
  if (correcAns == userAns) {
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
    console.log("Correct Answer");
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);
    console.log("Wrong Answer");

    for (i = 0; i < allOption; i++) {
      if (option_list.children[i].textContent == correcAns) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Auto select correct ans");
      }
    }
  }
  for (i = 0; i < allOption; i++) {
    option_list.children[i].classList.add("disabled");
  }
}
//next_btn
next_btn.onclick =()=> {
  if(que_count < Questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time left";
    next_btn.classList.remove("show");

  }else{
    clearInterval(counterLine);
    clearInterval(counter);
    showResult();
  }
};

function showResult() {
  info_box.classList.remove("active");
  quiz_box.classList.remove("active");
  result_box.classList.add("active");
  const score = document.querySelector(".score");
  if (userScore > 3) {
    let scoreTag =
      "<span>and congrats! 🎉, You got <p>" +
      userScore +
      "</p> out of <p>" +
      Questions.length +
      "</p></span>";
    score.innerHTML = scoreTag;
  } else if (userScore > 1) {
    
    let scoreTag =
      "<span>and nice 😎, You got <p>" +
      userScore +
      "</p> out of <p>" +
      Questions.length +
      "</p></span>";
    score.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>and sorry 😐, You got only <p>" +
      userScore +
      "</p> out of <p>" +
      Questions.length +
      "</p></span>";
    score.innerHTML = scoreTag;
  }
}

close.onclick = () => {
  window.location.reload();
};

repeat.onclick = () => {
  quiz_box.classList.add("active");
  result_box.classList.remove("active");
  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuestions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeText.textContent = "Time Left";
  next_btn.classList.remove("show");
};

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--; 
    if(time < 9){
      
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      
      clearInterval(counter);
      timeText.textContent = "Time Off";
      const allOptions = option_list.children.length;
      let correcAns = Questions[que_count].answer;
      for (i = 0; i < allOptions; i++) {
        if(option_list.children[i].textContent == correcAns){
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.classList.add("show");
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time + 1;
    time_line.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}

function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "<p>of</p>" +
    Questions.length +
    "</p> questions</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag;
}
