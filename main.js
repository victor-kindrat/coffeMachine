let date = new Date();
let bgtable = document.getElementById('bgTable');
let desk = document.getElementById('desk');
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let userInterfacesHtml = {
    main: `<div class="user__time">
            <div class="user__row">
            <span class="user__hours">${date.getHours()}</span>:<span class="user__minutes">${date.getMinutes()}</span>
            </div>
            <div class="user__day">Tuesday</div>
            </div>
            <div class="user__btn-place">
            <button class="user__btn" id="addWaterBtn">Add Water</button>
            <button class="user__btn">Start</button>
            </div>`,
    alert: `<div class="user__alert" id="user-alert"></div>`
}
function CoffeMachine (power) {
    this.waterAmount = 0;

    const WATER_HEAT_CAPACITY = 4200

    let getBoilTime = function () {
        let t = this.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
        console.log(t);
      return t
    }.bind(this);

    let onReady = function () {
      alert('Coffe complete')
      this.waterAmount-=25;
      console.log(this.waterAmount)
    }.bind(this)

    let timeout;

    this.run = function () {
        timeout = setTimeout(onReady, getBoilTime())
    }

    this.stop = function () {
        clearTimeout(timeout)
    }

    this.addWater = function() {
        if (this.waterAmount < 100) {
            this.waterAmount += 25;
            $('#waterValue').css('height', this.waterAmount + '%');
            console.log(this.waterAmount)
        } else {
            $('#interface').html(userInterfacesHtml.alert);
            $('.user__alert').html('Water tank is full');
            let thisAlert = document.getElementById('user-alert');
            thisAlert.addEventListener('animationend', function() {
                $('#interface').html(userInterfacesHtml.main)
                $('#addWaterBtn').click(function(){
                    coffeMachine.addWater();
                })
            })
        }
    }
}

let coffeMachine = new CoffeMachine(200);
function setDate() {
    $('.user__hours').text(date.getHours())
    $('.user__minutes').text(date.getMinutes());
    $('.user__day').text(days[date.getDay()])
}
setInterval(() => {
    date = new Date();
    setDate();
}, 1000);

$('#desk').css('top', bgtable.offsetTop - desk.offsetTop + 5 + 'px');
$('#addWaterBtn').click(function(){
    coffeMachine.addWater();
})