
showAlarms();
function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}
let addAlarm = document.getElementById('addAlarm');
addAlarm.addEventListener('click', () => {
    let setTime = document.getElementById('setTime');
    let ringtone = document.getElementById('ringtone');
    let alarmName = document.getElementById('alarmName');
    console.log(setTime.value);
    console.log(ringtone.value);
    // console.log(musicSrc);

    let alarms = localStorage.getItem('alarms');
    if (alarms == null) {
        alarmsObj = [];
    }
    else {
        alarmsObj = JSON.parse(alarms);
    }
    let myAlarms = {
        time: setTime.value,
        Ringtone: ringtone.value,
        AlarmName: alarmName.value,
        active:true
    }
    if(alarmName.value.length>0 && setTime.value.length==8){
        alarmsObj.push(myAlarms);
    }
    else if(alarmName.value.length<=0 || setTime.value.length!=8){
        alert('Must fill Set Time and Alarm name');
    }
    localStorage.setItem("alarms", JSON.stringify(alarmsObj));
    setTime.value = "";
    ringtone.value = "";
    alarmName.value = "";
    showAlarms();
});

function showAlarms() {
    let alarms = localStorage.getItem('alarms');
    if (alarms == null) {
        alarmsObj = [];
    }
    else {
        alarmsObj = JSON.parse(alarms);
    }
    let html = "";
    alarmsObj.forEach(function (element, index) {
        html += `
        <div class="box" id="box${index}">
                <div class="AlarmName">
                    ${element.AlarmName}
                </div>
                <div class="savedTime">
                    ${element.time}
                </div>
                <div class="savedRingtone">
                    ${element.Ringtone}
                </div>
                <div id="images">
                    <img class="plusBtn" id="plus${index}" onclick="AddAlarm(this.id)" src="plus sign.jpg" />
                    <img class="closeBtn" id="${index}" onclick="deleteAlarm(this.id)"
                        src="cross img1.jpg" />
                </div>
        </div>
         `;
    });
    if (alarmsObj.length != 0)
        // document.getElementsByClassName('container3').innerHTML = html;
        document.getElementById('container3').innerHTML = html;
    else {
        document.getElementById('container3').innerHTML = "<h2><center>No Upcoming Alarm</center></h2>";

    }
}

function deleteAlarm(index) {
    let alarms = localStorage.getItem('alarms');
    if (alarms == null) {
        alarmsObj = [];
    }
    else {
        alarmsObj = JSON.parse(alarms);
    }
    alarmsObj.splice(index, 1);
    localStorage.setItem("alarms", JSON.stringify(alarmsObj));
    showAlarms();
}
function AddAlarm(index){
    let alarms = localStorage.getItem('alarms');
    if (alarms == null) {
        alarmsObj = [];
    }
    else {
        alarmsObj = JSON.parse(alarms);
    }
    let ans=index.slice(4);
    alarmsObj[ans].active = true;
    document.getElementById(`box${index}`).style.backgroundColor="black";
    document.getElementById(`plus${index}`).style.visibility="hidden";
    localStorage.setItem("alarms", JSON.stringify(alarmsObj));
    showAlarms();
}

function textspeak(text) {
    responsiveVoice.speak(text);
}
function display_c() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('display_ct()', refresh)
}

function display_ct() {
    let theDate = new Date();
    let date = theDate.toLocaleTimeString();
    document.getElementById('currTime').innerHTML = date;
    alarmsObj.forEach(function (element,index) {
        if(tConvert(element.time)== date && element.active==true){
            textspeak(element.AlarmName);
            let musicSrc=element.Ringtone;  
            let music= new Audio(musicSrc+'.mp3');
            music.play();
            element.active = false;
        }
        if(element.active==false){
            document.getElementById(`box${index}`).style.backgroundColor="rgb(80 20 20)";
            document.getElementById(`plus${index}`).style.visibility="visible";
            localStorage.setItem("alarms", JSON.stringify(alarmsObj));
            // showAlarms();
        }
        else if(element.active==true){
            document.getElementById(`box${index}`).style.backgroundColor="black";
            document.getElementById(`plus${index}`).style.visibility="hidden";
            localStorage.setItem("alarms", JSON.stringify(alarmsObj));
            // showAlarms();
        }
    });
    display_c();
}
