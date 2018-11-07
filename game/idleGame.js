// Based on the following tutorial https://www.youtube.com/watch?v=vG0o6OFJDtU

/* The function of the .js file is to contain all elements needed for running an idle clicker game.
*  The flow is as follows.
*  The timer functions are started handle most of the core gameplay
*  From there the construction functions are located which are used to place text on-screen to actually let users know what they are doing.
*  Then there is an update function which is called when the user clicks on a resource in-order to update the information they display to ensure that it is up to date with any changes made.
*  Finally the bottom section covers the data storage to ensure that users can continue play when using the same device from where they left off.
*/


// The variable used to store the time for performing idle functions in milliseconds.
var idleTimer = 1000;

// The variable used to store the time for autosaving in milliseconds.
var autosaveTimer = 60000;

// The data which is used to keep track of time.
var gameTimeData = 
{
    hour: 1,
    day: 1,
    month: 1,
    year: 1
}

// Function to start the idle timer which allows for the date to be increased once every second.
var tickTimer = setInterval(function()
{
    addHour();
}, idleTimer)

// Function called once a minute to save the users data.
var autosave = setInterval(function()
{
    performAutoSave();
}, autosaveTimer)

// Information about the player like their current credit balance and hourly income.
var userData = 
{
    credits: 0,
    hourlyIncome: 0
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

// Function which is called to add income for the player based on the number of upgrades they have.
function addhourlyIncome()
{
    userData.credits += userData.hourlyIncome;
    constructIncome();
}

//Timer functions
/* Function which is called every tickTimer pass. 
*  It checks if the there are enough hours for it to be a new day and then adds a new day if applicable.
*  It also refreshes the timer on screen to reflect the new information, while also adding player hourlyIncome to their credit balance.
*/
function addHour()
{
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


/* Function increments the day every 24 hours.
*  If it is the end of the month it resets the day back to the first.
*/
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

/* Function increments the month based on a calendar.
*  If it is the end of the year it resets the month back to the first.
*/
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

/* This is a helper function which stores the infromation about each month of the year
*  When called it will check if the number of days has been reached to consider it the end of the month.
*  If the conditions are met then it becomes a new month.
*/
function isEndofMonth()
{
    var endofMonth = false;

    switch (true)
    {
        case(gameTimeData.month === 1 && gameTimeData.day === 31): //January
            endofMonth = true;
            break;    
        case(gameTimeData.month === 2 && gameTimeData.day === 28): //February
            endofMonth = true;
            break;
        case(gameTimeData.month === 3 && gameTimeData.day === 31): // March
            endofMonth = true;
            break;
        case(gameTimeData.month === 4 && gameTimeData.day === 30): // April
            endofMonth = true;
            break;
        case(gameTimeData.month === 5 && gameTimeData.day === 31): // May
            endofMonth = true;
            break;
        case(gameTimeData.month === 6 && gameTimeData.day === 30): // June
            endofMonth = true;
            break;
        case(gameTimeData.month === 7 && gameTimeData.day === 31): // July
            endofMonth = true;
            break;
        case(gameTimeData.month === 8 && gameTimeData.day === 31): // August
            endofMonth = true;
            break;
        case(gameTimeData.month === 9 && gameTimeData.day === 30): // September
            endofMonth = true;
            break;
        case(gameTimeData.month === 10 && gameTimeData.day === 31): // October
            endofMonth = true;
            break;
        case(gameTimeData.month === 11 && gameTimeData.day === 30): // November
            endofMonth = true;
            break;        
        case(gameTimeData.month === 12 && gameTimeData.day === 31): // December
            endofMonth = true;
            break;
        default:
            endofMonth = false;    
    }   

    return endofMonth;
};

/* This function is called by all the date change functions
*  This is used to update the time section with any changes to ensure it displays the correct time.
*/
function constructTimeSection()
{
    var timesection = document.getElementById('Game-Time');
    
    var timeMessage = "Hour: " + gameTimeData.hour + " Day: " + gameTimeData.day + " Month: " + gameTimeData.month + " Year: " + gameTimeData.year;
    
    timesection.innerText = timeMessage;

};

/* This function is called every tick to show to reflect any changes to the users funds.
*  This shows information like the hourlyIncome the user has and how many credits they currently own.
*/
function constructIncome()
{
    var incomesection = document.getElementById('User-Income');

    var incomeMessage = "Credits: " + userData.credits + " Current Income: " + userData.hourlyIncome;

    incomesection.innerText = incomeMessage;
};

/* This function passes all the resources and creates effectively a button.
*  When clicked they then perform the function of increasing the users hourlyIncome.
*  This goes through each of the resources iteratively assigning their default values.
*/
function constructResources()
{
    var itemList = document.getElementById("resources")

    for (var i = 0, length = resources.length; i < length; i++)
    {
        var newItem = document.createElement('h4');
        newItem.data = resources[i];
    
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

/* This function is called whenever resources need to be updated.
*  This is for when users buy new resources to make sure the price and number owned are updated.
*  It iterates through the entire resource list to update each one accordingly. 
*/
function updateResources()
{
    var itemList = document.getElementById("resources");
    for (var i = 0, length = itemList.children.length; i < length; i++)
    {
        itemList.children[i].innerText = resources[i].title + ": $" + resources[i].cost + " Number Owned: " + resources[i].NumberOwned + " Production Value: " + resources[i].increase;
    }

}

/* This is called when the user first connects to the game, it allocates data to each of the needed values or if they already exist then it opens them for use by the user.
*  If the user has already player before the resources they owned are also automatically stored for them.
*/
function InitalDataLoad()
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

/* The game attempts to autosave every 60 seconds if the user hasn't bought anything
*  The game will also save if the user buys any new resources.
*/
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

// These are called at the start of the project to make sure that the game values appear on launch rather then after the first tick has passed.
constructTimeSection();
constructIncome();
constructResources();
InitalDataLoad();