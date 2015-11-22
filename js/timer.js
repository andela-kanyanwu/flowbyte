
var h1 = document.getElementById('timer'),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    calcFlowRate = document.getElementById('calc-flow-rate'),
    result = document.getElementById('result'),
    seconds = 0, minutes = 0, hours = 0,
    t, getTime, timeOfFlight, flowRateResult, volume,
    history = {
    	time: '',
    	flowRate: '',
    	volume: '',
    	dateTime: ''
    },
    historyOutput;

    console.log('fresh hash: ', history);

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

/* Start button */
start.onclick = timer;

/* Stop button */
stop.onclick = function() {
	  var time = h1.textContent.split(':');
	  getTime = ((+time[0]) * 60 * 60) + ((+time[1]) * 60) + (+time[2]);
    clearTimeout(t);
}

/* Clear button */
clear.onclick = function() {
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    document.getElementById('time-of-flight').value = "";
    document.getElementById('serial-number').value = "";
}

calcFlowRate.onclick = function flowRate() {
	timeOfFlight = parseFloat(document.getElementById('time-of-flight').value) * Math.pow(10, -6);
    speedOfSound = Math.pow(1480, 2)
	flowRateResult = (timeOfFlight * speedOfSound)/(2 * (0.0176 + 0.027));
	volume = flowRateResult * getTime * ((Math.PI * Math.pow(0.0176, 2))/4);

    if (!isNaN(volume)){
        result.innerHTML = volume;
        history.time = getTime;
        history.flowRate = flowRateResult;
        history.volume = volume;
        history.dateTime = new Date();
    }
    // console.log('hash: ', history);

    // var h = document.createElement('li')
    // var 
    // document.getElementById('history-list').appendChild(history);
}


