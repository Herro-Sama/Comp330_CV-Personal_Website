// Based on the following tutorial https://www.youtube.com/watch?v=vG0o6OFJDtU

var idleTimer = 1000;

var gameTimeData = 
{
    hour: 1,
    day: 1,
    month: 1,
    year: 1
}

var tickTimer = setInterval(function()
{
    addHour();
}, idleTimer)

var userData = 
{
    credits: 0,
    hourlyIncome: 1,
    inventory: {}
}

var resources = 
[
    {
        title: "Unskilled Labour Force",
        cost: 10,
        increase: 1,
    },
    
    {
        title: "Security Guard Team",
        cost: 100,
        increase: 10,
    },

    {
        title: "Private Militia",
        cost: 500,
        increase: 50,
    },

    {
        title: "Large Scale Factory",
        cost: 2500,
        increase: 150,
    }
];

//User data functions
function addhourlyIncome()
{
    userData.credits += userData.hourlyIncome;
    constructIncome();
}

//Timer functions
function addHour(){
    if (gameTimeData.hour !== 24)
    {
        gameTimeData.hour++;
    }
    else
    {
        gameTimeData.hour = 1;
        addDay();
    }
    constructTimeSection()
    addhourlyIncome();
};

function addDay()
{

    if(isEndofMonth() === false)
    {
        gameTimeData.day++;
    }

    else
    {
        gameTimeData.day = 1;
        addMonth();
    }
    constructTimeSection()
};

function addMonth()
{
    if(gameTimeData.month !== 12)
    {
        gameTimeData.month++;
    }
    else
    {
        gameTimeData.month = 1;
        gameTimeData.year++;
    }
    constructTimeSection()
};

function constructTimeSection()
{
    var timesection = document.getElementById('Game-Time');
    
    var timeMessage = "Hour: " + gameTimeData.hour + " Day: " + gameTimeData.day + " Month: " + gameTimeData.month + " Year: " + gameTimeData.year;
    
    timesection.innerText = timeMessage;

};

function constructIncome()
{
    var incomesection = document.getElementById('User-Income');

    var incomeMessage = "Credits: " + userData.credits + " Current Income: " + userData.hourlyIncome;

    incomesection.innerText = incomeMessage;
};

function constructResources()
{
    var itemList = document.getElementById("resources")
    for (var i = 0, len = resources.length; i < len; i++)
    {
        var newItem = document.createElement('li');
        var newElementID = itemList.length + 1;
        newItem.setAttribute("id", "element"+newElementID);
        var index = i;
        newItem.innerText = resources[index].title + ": $" + resources[index].cost;
        newItem.data = resources[i];


        newItem.onclick = function()
        {
            if(userData.credits >= this.data.cost)
            {
                userData.credits -= this.data.cost;
                userData.hourlyIncome += this.data.increase;
                constructIncome();
            }
        }
        itemList.appendChild(newItem);
        
    }
};

function isEndofMonth()
{
    var endofMonth = false;

    switch (true)
    {
        case(gameTimeData.month === 1 && gameTimeData.day === 31):
            endofMonth = true;
            break;    
        case(gameTimeData.month === 2 && gameTimeData.day === 28):
            endofMonth = true;
            break;
        case(gameTimeData.month === 3 && gameTimeData.day === 31):
            endofMonth = true;
            break;
        case(gameTimeData.month === 4 && gameTimeData.day === 30):
            endofMonth = true;
            break;
        case(gameTimeData.month === 5 && gameTimeData.day === 31):
            endofMonth = true;
            break;
        case(gameTimeData.month === 6 && gameTimeData.day === 30):
            endofMonth = true;
            break;
        case(gameTimeData.month === 7 && gameTimeData.day === 31):
            endofMonth = true;
            break;
        case(gameTimeData.month === 8 && gameTimeData.day === 31):
            endofMonth = true;
            break;
        case(gameTimeData.month === 9 && gameTimeData.day === 30):
            endofMonth = true;
            break;
        case(gameTimeData.month === 10 && gameTimeData.day === 31):
            endofMonth = true;
            break;
        case(gameTimeData.month === 11 && gameTimeData.day === 30):
            endofMonth = true;
            break;        
        case(gameTimeData.month === 12 && gameTimeData.day === 31):
            endofMonth = true;
            break;
        default:
            endofMonth = false;    
    }   

    return endofMonth;
};

constructResources();