let intervalCount = 1;
let workTime = { min: 0, sec: 30 };
let restTime = { min: 0, sec: 30 };
let totalWithRest = 0;
let totalWithoutRest = 0;
let timerInterval;

function initInputsData() {
  updateTotalTime();
}

function onIntervalsBtnClick(value) {
  intervalCount = Math.max(1, intervalCount + value);
  $("#txtintervals").val(intervalCount);
  updateTotalTime();
}

function onSelectingTime(input) {
  let value = Math.max(0, parseInt(input.value) || 0);
  input.value = value < 10 ? `0${value}` : value;
  updateWorkRestTime();
}

function onSelectingTimeFocus(e) {
  e.target.select();
}

function updateWorkRestTime() {
  workTime.min = parseInt($("#txtwork_min").val());
  workTime.sec = parseInt($("#txtwork_sec").val());
  restTime.min = parseInt($("#txtrest_min").val());
  restTime.sec = parseInt($("#txtrest_sec").val());
  updateTotalTime();
}

function updateTotalTime() {
  let totalWork = workTime.min * 60 + workTime.sec;
  let totalRest = restTime.min * 60 + restTime.sec;

  totalWithRest = (totalWork + totalRest) * intervalCount;
  totalWithoutRest = totalWork * intervalCount;

  $("#total_with_rest").text(formatTime(totalWithRest));
  $("#total_without_rest").text(formatTime(totalWithoutRest));
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  return `${min < 10 ? "0" + min : min} : ${sec < 10 ? "0" + sec : sec}`;
}

function startTimer() {
  let totalWork = workTime.min * 60 + workTime.sec;
  let totalRest = restTime.min * 60 + restTime.sec;
  let currentInterval = 1;
  let status = "Work";
  let timeLeft = totalWork;

  $("#status").text(`${status} Interval ${currentInterval}/${intervalCount}`);
  updateCanvas(0);

  timerInterval = setInterval(() => {
    timeLeft--;

    $("#tmr").text(formatTime(timeLeft));

    if (timeLeft === 0) {
      if (status === "Work") {
        if (currentInterval === intervalCount) {
          clearInterval(timerInterval);
          alert("Workout Complete!");
          return;
        }
        status = "Rest";
        timeLeft = totalRest;
      } else {
        status = "Work";
        timeLeft = totalWork;
        currentInterval++;
      }
      $("#status").text(`${status} Interval ${currentInterval}/${intervalCount}`);
    }
    updateCanvas((totalWork + totalRest - timeLeft) / (totalWork + totalRest) * 100);
  }, 1000);
}

function updateCanvas(percentage) {
  let canvas = $("#canvas")[0];
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.beginPath();
  ctx.arc(50, 50, 45, -0.5 * Math.PI, (percentage / 100) * 2 * Math.PI - 0.5 * Math.PI);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#00FF00";
  ctx.stroke();
}

$("#buttonStart").on("click", function () {
  if (timerInterval) clearInterval(timerInterval); // Stop previous timer if running
  startTimer();
});
