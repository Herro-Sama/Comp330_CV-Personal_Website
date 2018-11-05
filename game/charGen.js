/*
    CharGen - main app class for the CharGen app
 */
class charGen
{
    constructor()
    {
        //GenericButtons - these are the buttons for each note that scales can be created from
        this.TextBox = [];

        this.StatBlock = [];

        this.operationButtons = [];
        
        //modebuttons - each mode is a different musical mode (major, minor, pentatonic etc)
        this.modeButtons = [];
        
        //image to store guitar gfx
        this.image = new Image();

    }
    
    oneTimeInit()
    {
        GAZCanvas.referenceScreenSize = new Size(1600,900);
   
        //add a set of TextBox - these are the buttons for each note that scales can be created from
        this.TextBox.push( new TextBox("Strength", new Rect(100,70,150,50)));
        this.TextBox.push( new TextBox("Dexterity", new Rect(100,120,150,50)));
        this.TextBox.push( new TextBox("Constitution", new Rect(100,170,150,50)));
        this.TextBox.push( new TextBox("Intelligence", new Rect(100,220,150,50)));
        this.TextBox.push( new TextBox("Wisdom", new Rect(100,270,150,50)));
        this.TextBox.push( new TextBox("Charisma", new Rect(100,320,150,50)));

        this.StatBlock.push( new TextBox("9", new Rect(260,70,100,50)));
        this.StatBlock.push( new TextBox("9", new Rect(260,120,100,50)));
        this.StatBlock.push( new TextBox("9", new Rect(260,170,100,50)));
        this.StatBlock.push( new TextBox("9", new Rect(260,220,100,50)));
        this.StatBlock.push( new TextBox("9", new Rect(260,270,100,50)));
        this.StatBlock.push( new TextBox("9", new Rect(260,320,100,50)));
        
        this.operationButtons.push( new GenericButton("Generate", new Rect(100,380,150,50)));
    
        //add all the modebuttons - each mode is a different musical mode (major, minor, pentatonic etc)
        this.modeButtons.push( new GenericButton("Expert", new Rect(1470,10,120,50) ) );
        this.modeButtons.push( new GenericButton("Warrior", new Rect(1470,70,120,50) ) );
        this.modeButtons.push( new GenericButton("Psychic", new Rect(1470,130,120,50) ) );
        
        //initialise the mode to match whatever mode button is selected
        let newItemID = 0;
        this.modeButtons[newItemID].selected = true;
        this.mode =this.modeButtons[newItemID].mode;
    
        //set up the currenttonic to match whatever key button is selected
        newItemID = 0;
        this.TextBox[newItemID].selected = true;

        this.StatBlock[0].labelText = this.RandomNumberInRange(6);
    
    
        {
            //set up the display buttons - these define how the notes on the CharGen will be displayed (notes, octaves and/or steps in a scale)
            this.displayButtons = [];
            this.displayButtons.push(new GenericButton("Normal", new Rect(100, 500, 200, 50)));
            this.displayButtons.push(new GenericButton("Normal", new Rect(100, 550, 200, 50)));
        
            this.displayID = 0;
            this.displayButtons[this.displayID].selected = true;
        }
    }
    
    update()
    {
        //update displayButtons (normal-scale etc)
        {
            let newItemID = -1;
            for(let i=0;i< this.displayButtons.length;i++)
            {
                if(this.displayButtons[i].active === true)
                {
                    this.displayButtons[i].update();
                
                    if (Input.currentMouseState === INPUT_PRESSED)
                    {
                        if (this.displayButtons[i].isInRect(Input.mouseLogicalPos) === true)
                        {
                            newItemID = i;
                        }
                    }
                }
            }
        
            if(newItemID !== -1)
            {
                this.displayID = newItemID;
            
                for(let i=0;i< this.displayButtons.length;i++)
                {
                    this.displayButtons[i].selected = false;
                }
            
                this.displayButtons[newItemID].selected = true;
            }
        }
    
        //update TextBox 
        {
            let newItemID = -1;
            for (let i = 0; i < this.TextBox.length; i++)
            {
            
                if (this.TextBox[i].active === true)
                {
                    this.TextBox[i].update();
                
                    if (Input.currentMouseState === INPUT_PRESSED)
                    {
                        if (this.TextBox[i].isInRect(Input.mouseLogicalPos) === true)
                        {
                            newItemID = i;
                        }
                    }
                }
            }
        
            if (newItemID !== -1)
            {
                for (let i = 0; i < this.TextBox.length; i++)
                {
                    this.TextBox[i].selected = false;
                }
            
                this.TextBox[newItemID].selected = true;
            }
        }

                //update TextBox 
                {
                    let newItemID = -1;
                    for (let i = 0; i < this.operationButtons.length; i++)
                    {
                    
                        if (this.operationButtons[i].active === true)
                        {
                            this.operationButtons[i].update();
                        
                            if (Input.currentMouseState === INPUT_PRESSED)
                            {
                                if (this.operationButtons[i].isInRect(Input.mouseLogicalPos) === true)
                                {
                                    newItemID = i;
                                }
                            }
                        }
                    }
                
                    if (newItemID !== -1)
                    {
                        for (let i = 0; i < this.operationButtons.length; i++)
                        {
                            this.operationButtons[i].selected = false;
                        }
                    
                        this.operationButtons[newItemID].selected = true;
                        
                        for(let i=0; i< this.StatBlock.length; i++)
                        {
                            this.StatBlock[i].labelText = this.GenerateStats();
                        }

                        this.operationButtons[newItemID].resetSelection();

                    }
                }
    
        //update the mode buttons
        {
            let newItemID = -1;
            for (let i = 0; i < this.modeButtons.length; i++)
            {
                this.modeButtons[i].update();
            
                if (Input.currentMouseState === INPUT_PRESSED)
                {
                    if (this.modeButtons[i].isInRect(Input.mouseLogicalPos) === true)
                    {
                        this.mode = this.modeButtons[i].mode;
                    
                        newItemID = i;
                    }
                }
            }
        
            if (newItemID !== -1)
            {
                for (let i = 0; i < this.modeButtons.length; i++)
                {
                    this.modeButtons[i].selected = false;
                }
            
                this.modeButtons[newItemID].selected = true;
                this.mode = this.modeButtons[newItemID].mode;
            
                //does the new mode support the active key?
            }
        }
    
    }
    
    draw()
    {
        GAZCanvas.Rect( new Rect(0,0,1600,900), 'rgb(12,12,64)');
    
        let fretlength = 14;
        let yspace = 66;
        let fontSize = 36;
        let yStart = 520;
        let xStart = 0;
        
        /*
            I got the guitar gfx from the interweb and needed to work out all the offsets for the white boxes so I
            could draw the note text in the correct locations. As it's based on a real guitar, the size of each fret
            isn't constant :(.
         */
        
        GAZCanvas.Sprite(this.image,new Rect(0,500, 1600,400));
        
        /*
            go through each string and draw in the valid notes
            As luck would have it, I set the strings up to go from fattest (E2) to thinnest (E4). The CharGen diagram
            draws them the other way round (E4 to E2), so I reverse the order of the strings with the 5-i lookup
         */
            let pos = new Vector2();
            
        
        
        //draw all the buttons
        for(let i=0;i< this.displayButtons.length;i++)
        {
            this.displayButtons[i].draw();
        }
    
    
        for(let i=0; i< this.operationButtons.length; i++)
        {
            this.operationButtons[i].draw();
        }

        for(let i=0; i< this.StatBlock.length; i++)
        {
            this.StatBlock[i].draw();
        }

        for(let i=0; i< this.TextBox.length; i++)
        {
            this.TextBox[i].draw();
        }
    
        for(let i=0;i< this.modeButtons.length;i++)
        {
            this.modeButtons[i].draw();
        }
    
        //draw the mouse pointer so I can see what's going on, if the mouse is in the GAZCanvas space
        //the mouse pos will be undefined if it's out of the GAZCanvas
        if(Input.mouseLogicalPos !== undefined)
        {
            let modelRect = new Rect();
            modelRect.set(Input.mouseLogicalPos.x,Input.mouseLogicalPos.y,10,10);
    
            GAZCanvas.Rect(modelRect,'rgb(124,0,124');
        }
    }
    
    // Return a random number in range from 0 to the input value.
    RandomNumberInRange(value)
    {
        let temp = Math.floor(Math.random() * Math.floor(value));
        if (temp == 0)
        {
            temp = 1;
            return temp;
        }
        else
        {
            return temp;
        }
    }

    GenerateStats()
    {
        let temp = this.RandomNumberInRange(15);
        temp += 3;


        return temp;
    }




    //Launch point for application
    Run()
    {
        
        characterCreator.oneTimeInit();
        setInterval(function()
        {
            GAZCanvas.update();
            
            Input.update();
            
            let letterboxColour = 'rgb(32,32,32)';
            Canvas.Rect(new Rect(0, 0, window.innerWidth, window.innerHeight),letterboxColour);
    
            characterCreator.update();
            characterCreator.draw();
            
            GAZCanvas.drawLetterbox(letterboxColour);
        },17);
    }

}

characterCreator = new charGen();