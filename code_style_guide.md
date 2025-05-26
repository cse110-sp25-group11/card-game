# 11x Developer Code Styling Guide 

## Universal Rules 🌎

#### Variables
- Variable names should be clear, short, and concise. Another team member should be able to understand what a declared variable holds with no description 

#### Spacing
- All tabs across all files should be 4 spaces long, no matter the language. Please ensure that your VS Code has tabs set to 4 spaces. You can check this in Code > Settings > Editor: Tab Size

#### Comments
- Your goal is to have your code be as legible as possible without comments
- Comments are heavily encouraged, but do not clutter your code with comments either 

#### Bracing 
- All uses of braces ("{" and "}") will use the Allman brace style (in other words, each brace will have its own line)

## HTML 🧱

#### Naming Conventions
- Class names and ID names should be written using kebab case, where every letter is in lower case and words are separated with hyphens (ex: "my class" would be written as "my-class")

#### Tags
- Starting ending tags for structural elements (`div`, `form`, `p`, etc) must be on the same indentation
- Text editing tags (`b`, `h1`, etc) must be open and closed on the same line of code (only break this rule if absolutely necessary)
- List elements such as `ol` and `ul` should have all their items written on the same indentation line 
- Tags should all be in lowercase, no uppercase should be used at all (ex: use `<p>` and `</p>`, not `<P>` or `</P>`). This same rule applies to attributes as well (ex: use "href" not "HREF")
- Void elements such as `br` and `img` should be on their own line at the appropriate indentation 
- Do not overuse divs! 

#### Spacing and Indentation
- Keep exactly 1 empty line between structural elements (`div`, `form`, etc)
- There should be no random spacing between elements, everything should be kept together
- Everything *inside* of a structural element should be indented so that it's clear what is inside and outside of it 

#### Comments
- The only comments on files should be the ones at the top of each structural elements describing what it holds, what it will let the user do (if applicable), etc 



#### Example
- Here is an example implementing all of these rules 


```HTML 
<!--This div holds a paragraph for my favorite kind of cookies-->
<div class = "chocolate-chip-cookies">
    <p>
        My favorite cookies are chocolate chip cookies!
    </p>    
    <br>
    <p>
        I also like oatmeal raisin cookies as well! Here are some other desserts I like: 
    </p>
    <ol>
        <li>Chocolate Cake</li>
        <li>Vanilla Ice Cream</li>
    </ol>
</div>

<!--This div holds a paragraph for my most hated desserts!-->
<div class = "chocolate-chip-cookie-hater">
    <p>
        I HATE chocolate chip cookies! 
    </p>    
    <br>
    <p>
        I <b>hate</b> oatmeal raisin cookies as well! Here are some other desserts I <i>HATE</i>: 
    </p>
    <ol>
        <li>NOT Chocolate Cake</li>
        <li>NOT Vanilla Ice Cream</li>
    </ol>
</div>
```

## CSS 🎨
#### Naming Conventions
- All selector name should be exactly the same as how they were written in the HTML file 

#### Selectors
- All selectors must contain a comment at the top using `/* */` describing what it's editing 
- Group the edits inside each selectors by categories such as the following: text, size, color, etc (add a comment for each category describing where one list starts and the other ends, see the example below)
- Group all selectors by which sections of the page they apply to (ex: a button's styler and hover selectors should be grouped together)
- Order these groups **by the order in which they appear on the page**, see below for an example 

#### Colors
- Try to use hex for all color representations. Only use other notations if absolutely necessary 

#### Spacing and Indentation
- Selectors should be separated by exactly 1 empty line 
- Grouped selectors will be separated by exactly 3 empty lines 
- When editing specific elements, there should be exactly 1 space following the ":" character 



#### Example 
- The following selectors edit the HTML shown in the previous section
```CSS 
/*chocolate-chip-cookies class*/
.chocolate-chip-cookies
{
    /*Coloring*/
    color: #ad7139;

    /*Text*/ 
    text-size: 15px; 
    font-family: Arial;
}

/*chocolate-chip-cookies-hater class (NOTE THAT THIS IS SEPERATED BY 1 EMPTY LINE)*/
.chocolate-chip-cookies-hater
{
     /*Coloring*/
    color: #ffffff;

    /*Text*/ 
    text-size: 20px; 
    font-family: Arial;
}



/*Whatever follows chocolate-chip-cookies-hater on the webiste will be written below this comment (NOTE THAT THIS IS SEPERATED BY 3 EMPTY LINES)*/
```

## Javascript ⚙️

#### Naming Conventions
- All declared variables should be written using camel case notation, only the first word starts with a lower case and all following words start with an uppercase (ex: the "add two numbers" function would be written as "addTwoNumbers")
- This applies to both variables and function names 


#### Functions
- Functions should start with a descriptive, in-detail javadoc comment describing what the function takes in, what it returns, what the functions accomplishes, etc
- Functions should be separated by exactly 1 empty line between each other

#### Variables 
- Declare variables before use. This allows other developers to quickly locate what the variable holds and how it is changed in the following lines of code
- Avoid using "var" and use "let" instead

#### Example 
- The following shows an exmaple of all these style guides. Note that the two funtions are separated by 1 empty line: 

```Javascript
/**
 * Takes in two numbers and returns the sum of both numbers
 * @param {int} firstNum The first integer that will be added
 * @param {int} secondNum The second integere that will be added 
 * @return {int} The sum of both numbers 
 */
function addTwoNumbers(firstNum, secondNum)
{
    let sum = 0; 
    sum = firstNum + secondNum; 
    return sum;
}

/**
 * Takes in two numbers and returns the difference of both numbers
 * @param {int} firstNum The initial value of the equation
 * @param {int} secondNum How much we are going to subtract from firstNum 
 * @return {int} The differnece of both numbers 
 */
function subtractTwoNumbers(firstNum, secondNum)
{
    let difference = 0; 
    difference = firstNum - secondNum; 
    return difference;
}
```

