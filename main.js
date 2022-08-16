let date = new Date();
let bgtable = document.getElementById('bgTable');
let desk = document.getElementById('desk');
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let statuses = ['Water intake', 'Boiling water', 'Shake with coffe', 'Pouring coffee' , 'Add a sugar']
let userInterfacesHtml = {
    main: `<div class="user__time">
            <div class="user__row">
            <span class="user__hours">${date.getHours()}</span>:<span class="user__minutes">${date.getMinutes()}</span>
            </div>
            <div class="user__day">Tuesday</div>
            </div>
            <div class="user__btn-place">
            <button class="user__btn" id="addWaterBtn">Add Water</button>
            <button class="user__btn" id="startBtn">Start</button>
            </div>`,
    alert: `<div class="user__alert" id="user-alert"></div>`, 
    coffeCount: `<div class="user__headline">How much coffe you want?</div>
                <div class="user__counter">
                <button class="user__counterBtn user__decrement">-</button>
                <div class="user__counterWindow" id="coffeCounter">50 ml</div>
                <button class="user__counterBtn user__increment">+</button>
                </div>
                <button class="user__nextBtn" id="coffeNext">Next</button>`,
    sugarCount: `<div class="user__headline">How much sugar you want?</div>
                <div class="user__counter">
                <button class="user__counterBtn user__decrement">-</button>
                <div class="user__counterWindow" id="sugarCounter">0</div>
                <button class="user__counterBtn user__increment">+</button>
                </div>
                <button class="user__nextBtn" id="sugarNext">Run</button>`,
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

    let getBoilTime = function (water) {
        let t = water * WATER_HEAT_CAPACITY * 80 / power;
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

    this.start = function () {
        $('#interface').html(userInterfacesHtml.coffeCount);
        let coffeCount = 50;
        $('.user__increment').click(function(){
            if (coffeCount < 200) {
                coffeCount+=50
                $('.user__counterWindow').text(coffeCount + ' ml')
            }
        })
        $('.user__decrement').click(function(){
            if (coffeCount > 50) {
                coffeCount-=50
                $('.user__counterWindow').text(coffeCount + ' ml')
            }
        })

        $('#coffeNext').click(function(){
            $('#interface').html(userInterfacesHtml.sugarCount);
            let sugarCount = 0;
            $('.user__increment').click(function(){
                sugarCount+=1
                $('.user__counterWindow').text(sugarCount)
            })
            $('.user__decrement').click(function(){
                if (sugarCount > 0) {
                    sugarCount-=1
                    $('.user__counterWindow').text(sugarCount)
                }
            })

            $('#sugarNext').click(function(){
                let waterPerc = coffeCount / 2;
                console.log(waterPerc)
                console.log(this.waterAmount)
                if (this.waterAmount < waterPerc) {
                    $('#interface').html(userInterfacesHtml.alert);
                    $('.user__alert').html('No enought water!');
                    let thisAlert = document.getElementById('user-alert');
                    thisAlert.addEventListener('animationend', function() {
                        $('#interface').html(userInterfacesHtml.main)
                        $('#addWaterBtn').click(function(){
                            this.addWater();
                        }.bind(this))
                        $('#startBtn').click(function(){
                            coffeMachine.start();
                        })
                    }.bind(this))
                } else {
                    this.waterAmount -= waterPerc;
                    $('#waterValue').css('height', this.waterAmount + '%');
                    $('#interface').html(userInterfacesHtml.waiting);
                    let timeToEnd = getBoilTime(coffeCount) + sugarCount * 300 + 6000
                    timeout = setTimeout(onReady, timeToEnd);
                    let secondsToEnd = Math.round(timeToEnd / 1000);
                    let minutesToEnd = 0;
                    if (secondsToEnd >= 60) {
                        while (secondsToEnd >= 60) {
                            secondsToEnd -= 60
                            minutesToEnd++
                        }
                    }
                    minutesToEnd <= 9 ? $('.user__waitMinutes').text('0'+minutesToEnd) : $('.user__waitMinutes').text(minutesToEnd);
                    secondsToEnd <= 9 ? $('.user__waitSeconds').text('0'+secondsToEnd) : $('.user__waitSeconds').text(secondsToEnd);
                    let x = setInterval(function(){
                        secondsToEnd--;
                        if(secondsToEnd < 0) {
                            minutesToEnd--;
                            secondsToEnd+=60
                        }
                        (secondsToEnd <= 0 && minutesToEnd <= 0) ? clearInterval(x) : false;
                        minutesToEnd <= 9 ? $('.user__waitMinutes').text('0'+minutesToEnd) : $('.user__waitMinutes').text(minutesToEnd);
                        secondsToEnd <= 9 ? $('.user__waitSeconds').text('0'+secondsToEnd) : $('.user__waitSeconds').text(secondsToEnd);
                    },1000)
                    let i = 0;
                    $('.user__statusValue').text(statuses[i]);
                    setTimeout(function(){
                        i++;
                        $('.user__statusValue').text(statuses[i]);
                        setTimeout(function(){
                            i++;
                            $('.user__statusValue').text(statuses[i]);
                            setTimeout(function(){
                                i++;
                                $('.user__statusValue').text(statuses[i]);
                                setTimeout(function(){
                                    i++;
                                    $('.user__statusValue').text(statuses[i]);
                                }, 2000)
                            }, 2000)
                        }, getBoilTime(coffeCount))
                    }, 2000)
                }
            }.bind(this))
        }.bind(this))
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

let coffeMachine = new CoffeMachine(500);
function setDate() {
    date.getHours() <= 9 ? $('.user__hours').text('0' + date.getHours()) : $('.user__hours').text(date.getHours())
    date.getMinutes() <= 9 ? $('.user__minutes').text("0" + date.getMinutes()) : $('.user__minutes').text(date.getMinutes());
    $('.user__day').text(days[date.getDay()])
}
setDate()
setInterval(() => {
    date = new Date();
    setDate();
}, 1000);

$('#desk').css('top', bgtable.offsetTop - desk.offsetTop + 5 + 'px');
$('#addWaterBtn').click(function(){
    coffeMachine.addWater();
})

$('#startBtn').click(function(){
    coffeMachine.start();
})