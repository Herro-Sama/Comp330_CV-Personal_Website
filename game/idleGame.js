// Based on the following tutorial https://www.youtube.com/watch?v=vG0o6OFJDtU

var idleTimer = 1000;

var autosaveTimer = 60000;

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

var autosave = setInterval(function()
{
    console.log("About to attempt an autosave");
    performAutoSave();
}, autosaveTimer)

// Information that the player has available for themselves.
var userData = 
{
    credits: 0,
    hourlyIncome: 0,
    inventory: {}
}

// The various upgrades available for the player to purchase in-game.
var resources = 
[
    {
        title: "Franchise",
        cost: 15,
        baseCost: 15,
        increase: 1,
        NumberOwned: 0,

    },
    
    {
        title: "Harvesters",
        cost: 100,
        baseCost: 100,
        increase: 4,
        NumberOwned: 0,
    },

    {
        title: "Local Investment",
        cost: 1100,
        baseCost: 1100,
        increase: 8,
        NumberOwned: 0,
    },

    {
        title: "Freighter Contract",
        cost: 12000,
        baseCost: 12000,
        increase: 47,
        NumberOwned: 0,
    },

    {
        title: "Lawyers",
        cost: 130000,
        baseCost: 130000,
        increase: 260,
        NumberOwned: 0,
    },

    {
        title: "Union Toughs",
        cost: 1400000,
        baseCost: 1400000,
        increase: 1400,
        NumberOwned: 0,
    },

    {
        title: "Surveyors",
        cost: 20000000,
        baseCost: 20000000,
        increase: 7800,
        NumberOwned: 0,
    },

    {
        title: "Postech Industry",
        cost: 330000000,
        baseCost: 330000000,
        increase: 44000,
        NumberOwned: 0,
    },

    {
        title: "Laboratory",
        cost: 5100000000,
        baseCost: 5100000000,
        increase: 260000,
        NumberOwned: 0,
    },

    {
        title: "Shipping Combine",
        cost: 75000000000,
        baseCost: 75000000000,
        increase: 1600000,
        NumberOwned: 0,
    },

    {
        title: "Monopoly",
        cost: 1000000000000,
        baseCost: 1000000000000,
        increase: 10000000,
        NumberOwned: 0,
    },
    
    {
        title: "Medical Centre",
        cost: 14000000000000,
        baseCost: 14000000000000,
        increase: 65000000,
        NumberOwned: 0,
    },
    
    {
        title: "Bank",
        cost: 170000000000000,
        baseCost: 170000000000000,
        increase: 4300000000,
        NumberOwned: 0,
    },
    
    {
        title: "Marketers",
        cost: 2100000000000000,
        baseCost: 2100000000000000,
        increase: 2900000000,
        NumberOwned: 0,
    },
    
    {
        title: "Pretech Researchers",
        cost: 26000000000000000,
        baseCost: 26000000000000000,
        increase: 21000000000,
        NumberOwned: 0,
    },
    
    {
        title: "Blockade Runners",
        cost: 310000000000000000,
        baseCost: 310000000000000000,
        increase: 150000000000,
        NumberOwned: 0,
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

    for (var i = 0, length = resources.length; i < length; i++)
    {
        var newItem = document.createElement('h4');
        var index = i;
        newItem.data = resources[i];
        newItem.innerText = newItem.data.title + ": $" + newItem.data.cost + " Number Owned: " + newItem.data.NumberOwned + " Production Value: " + newItem.data.increase;

        newItem.onclick = function()
        {
            if(userData.credits >= this.data.cost)
            {
                userData.credits -= this.data.cost;
                userData.hourlyIncome += this.data.increase;
                this.data.NumberOwned++;
                this.data.cost = this.data.baseCost * (this.data.NumberOwned * 1.15);
                this.data.cost = Math.ceil(this.data.cost);
                updateResources();
                constructIncome();
                performAutoSave();
            }
        }
    

        itemList.appendChild(newItem);
        
    }

    var moneyMaking = document.getElementById("Manual-Click");
    moneyMaking.innerText = "Manually Make Money"
    moneyMaking.onclick = function()
    {
        userData.credits++;
        constructIncome();
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

function updateResources()
{
    var itemList = document.getElementById("resources");
    for (var i = 0, length = itemList.children.length; i < length; i++)
    {
        itemList.children[i].innerText = resources[i].title + ": $" + resources[i].cost + " Number Owned: " + resources[i].NumberOwned + " Production Value: " + resources[i].increase;
    }

}

function attemptAutoSave()
{
    if (typeof(Storage) !== "undefined")
    {
        var itemList = document.getElementById("resources");
        if (localStorage.getItem("Credits") == undefined)
        {
            localStorage.setItem("Credits", "0");
            localStorage.setItem("hourlyIncome", "0");
            localStorage.setItem("hour", "1");
            localStorage.setItem("day", "1");
            localStorage.setItem("month", "1");
            localStorage.setItem("year", "1");
            for (var i = 0, length = itemList.children.length; i < length; i++)
            {
                localStorage.setItem("resourceCost"+i, resources[i].cost);
                localStorage.setItem("resourceOwned"+i, resources[i].NumberOwned);
            }
        }
        else
        {
            userData.credits = Number(localStorage.getItem("Credits"));
            userData.hourlyIncome = Number(localStorage.getItem("hourlyIncome"));
            gameTimeData.hour = Number(localStorage.getItem("hour"));
            gameTimeData.day = Number(localStorage.getItem("day"));
            gameTimeData.month = Number(localStorage.getItem("month"));
            gameTimeData.year = Number(localStorage.getItem("year"));
            for (var i = 0, length = itemList.children.length; i < length; i++)
            {
                itemList.children[i].innerText = resources[i].title + ": $" + localStorage.getItem("resourceCost"+i) + " Number Owned: " + localStorage.getItem("resourceOwned"+i) + " Production Value: " + resources[i].increase;
                itemList.children[i].data.cost = Number(localStorage.getItem("resourceCost"+i));
                itemList.children[i].data.NumberOwned = Number(localStorage.getItem("resourceOwned"+i));
            }

        }
    } 
}

function performAutoSave()
{
    if (typeof(Storage) !== "undefined")
    {
        var itemList = document.getElementById("resources");
        localStorage.setItem("Credits", userData.credits);
        localStorage.setItem("hourlyIncome", userData.hourlyIncome);
        localStorage.setItem("hour", gameTimeData.hour);
        localStorage.setItem("day", gameTimeData.day);
        localStorage.setItem("month", gameTimeData.month);
        localStorage.setItem("year", gameTimeData.year);
        for (var i = 0, length = itemList.children.length; i < length; i++)
        {
            localStorage.setItem("resourceCost"+i, itemList.children[i].data.cost);
            localStorage.setItem("resourceOwned"+i, itemList.children[i].data.NumberOwned);
        }
    } 
}

constructResources();
attemptAutoSave();