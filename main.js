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
    alert: `<div class="user__alert" id="user-alert"></div>`, 
    coffeCount: `<div class="user__headline">How much coffe you want?</div>
                <div class="user__counter">
                <button class="user__counterBtn user__decrement">-</button>
                <div class="user__counterWindow" id="coffeCounter">00</div>
                <button class="user__counterBtn user__increment">+</button>
                </div>
                <button class="user__nextBtn" id="coffeNext">Next</button>`,
    sugarCount: `<div class="user__headline">How much sugar you want?</div>
                <div class="user__counter">
                <button class="user__counterBtn user__decrement">-</button>
                <div class="user__counterWindow" id="sugarCounter">0</div>
                <button class="user__counterBtn user__increment">+</button>
                </div>
                <button class="user__nextBtn" id="sugarNext">Next</button>`,
    waiting: `<div class="user__headline">Wait for:</div>
              <div class="user__row user__timer">
              <span class="user__waitMinutes">00</span>:<span class="user__waitSeconds">00</span>
              </div>
              <div class="user__headline">Status:</div>
              <div class="user__status"><div class="user__loader"><div class="user__loaderSymb"></div></div><span class="user__statusValue">Boiling water</span></div>`
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