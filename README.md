## [Private Video](https://youtu.be/xZ7YhHDmkWQ)
## [Public Video](https://youtu.be/KutburtU4R8)
## [What's Next for Campus Swipe](templates/whats-next.md)
## [Team Repo](https://github.com/cse110-sp25-group11/card-game)
## [GitHub Pages](https://cse110-sp25-group11.github.io/card-game/)
# Campus Swipe Tool

#### Introduction 👋
This repository holds the 11x developers' campus swipe tool website. Everything regarding code, documentation, and other project information can be found here. Navigate through the information below on how to get started.

Meet the brains behind the website [here!](https://github.com/cse110-sp25-group11/cse110-sp25-group11)

#### What's a Campus Swipe Tool Anyways? 🤔
Our campus tool website is an online platform where UCSD students are able to see events that will take place across the university. This can range anywhere from club events to presentations. Anything taking place on campus is fair game! Users will get to explore each event in detail and determine which events they like and don't like through our home page. Imagine something similar to TikTok but with UCSD events! They will also be able to add activities onto the website themselves to help promote their own events! 

#### How to Download and Get Started 💻
Accessing the repository remotely is easy! Follow the steps shown below: 

Open the terminal on your computer and enter the following command in whichever folder you choose:  
```bash
    git clone https://github.com/cse110-sp25-group11/card-game.git
```
After that, simply open the repository on Microsoft Visual Studio Code. We recommend pulling from main just for good measure: 

```bash 
    git pull origin main
```

#### Languages and Tools Used ⚙️
Please note that we are not using anything outside of basic HTML, CSS, and Javascript. We ask that you do not use any special tools outside of these languages, so libraries such as React are off limits! 

As far as accessing the website goes, we are currently using a mix of live share and Github pages. 

The only IDE you are allowed to use is Visual Studio Code. This ensures that we are all on the same page for what tools we have access too and allows for easier communication in case if something goes wrong.



#### Build Pipeline 👷‍♂️
1. Create your own branch and write your code 
2. Open a pull request on Github and attach any issues related to your code. This will automatically run Jest tests, code qaulity, end to end testing, and coding linting that will test your code and format it to ensure everything is working correctly and it is ready to be integrated into the exisiting code base. 
3. Two other team members (not yourself) will come and review your code. If they choose to approve it, your branch will be merged to main!
4. Close the appropriate issues if they are not closed already  


#### Website Breakdown 🔄
- <u>Browse Page</u>: Displays one event at a time and lets the user decide if they either like or dislike the event. Any liked events will be added to the liked events page (see below)
- <u>Browse Page</u>: Allows the user to see various on campus events separated by different categories. This can include categories such as "currently happening" and "upcoming events" 
- <u>Add Page</u>: A page on the website that allows the user to add an event to the website that they would like to promote. This would include prompting the user for the club name, what the event is called, etc. 
- <u>Liked Events Page</u>: Shows the user all the events they have liked before in the past. This is meant for easier organization of events that the user has expressed into. 




#### Repository Tree 🌳
Use the following tree to navigate around our repository! 

```
.
├── 📁 github 
│   ├── 📁 ISSUE_TEMPLATE 
│   │   └── 📄 Contains a yml file with a template for all of our issues
│   └── 📁 workflows
│       └── Files containing the set up for unit tests and Qlty on this repository
├── 📁 qlty
│   ├── 📁 configs
│   │   └── 📄 Single file meant to set up Github linter
│   └── 📄 Other files specifically meant to support the linter (ex: a .gitignore file)
├── 📁 __tests__
│   └── 📄 Contains Javascript Tests
├── 📁 specs
│   ├── 📁 adr
│   │   └── 📄 Contains all ADRs made for the project
│   ├── 📁 assets
│   │   └── 📄 Contains screenshots of the Figma for UI
│   └── 📁 interface
│       └── 📁 lowfidelity
│           └── 📄 Contains the low fidelity wireframe for the website 
├── 📁 templates
│   └── 📄 Contains templates for ADRs, pull requests, and other forms of documentation
├── 📁 website
│   ├── 📁 css
│   │   └── 📄 Contains all needed CSS files for the website
│   ├── 📁 js
│   │   └── 📄 Contains all needed JS for the website
│   └── 📄 All other files are HTML files for the website
└── 📄 Miscellaneous Files that do not apply to other 
```

#### Remember, We Are A Team! 👫
**Never** be afraid to reach out if you have any questions or concerns about the project. We are a team and things will go better if we all work together! Our main communication will be done through the official 11x Developers Slack channel, so ping any of us if you have any questions! 
