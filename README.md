# Campus Swipe Tool

#### Introduction 👋
This repository holds the 11x developers' campus swipe tool website. Everything regarding code, documentation, and other porject information can be found here. Navigate through the information below on how to get started. 

Our campus tool website is an online platform where UCSD students are able to see events that will take place across the university. This can range anywhere from club events to presentations. Anything taking place on campus is fair game! Users will get to explore each event in detail and be able to determine which events they like and don't like through our home page. They will also be able to add events onto the website themselves to help promote their own event! 

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

#### Build Pipeline 👷‍♂️

We are currently using Qlty to lint our code for every pull request. This is automatically run in every pull request and will give you feedback if anything is wrong with your code. We are also 

1. Create your own branch and write your code 
2. Run local Qlty tests on your local machine 
3. Open a pull request on Github and attach any issues related to your code. This will automatically run Jest tests that will test your code and ensure everything is working correctly. 
4. Two other team members (not yourself) will come and review your code. If they choose to approve it, your branch will be merged to main!
5. Close the appropriate issues if they are not closed already  


#### Current Progress 🔄
As of May 24, 2025, we are past the point of degsigning the UI and are currently working on coding the website and bringing it to life! Our top priorities are the following: 
- Javascript unit testing is urgent since we want to start testing certain features as soon as possible
- Making minor edits to the website UI is also urgent, since we were advised that the coloring looked too much like UCLA's colors rather than UCSD's 


#### Repository Tree 🌳
Use the following tree to navigate around our repository! 

```bash
.
├── github
│   ├── ISSUE_TEMPLATE
│   │   └── team-11-issue-template.md
│   └── workflows
│       ├── format.yml
│       └── main.yml
├── qlty
│   ├── configs
│   │   └── .yamllint.yaml
│   ├── .gitignore
│   └── qlty.toml
├── __tests__
│   ├── pseudo.tests.js
│   └── sum_function.js
├── specs
│   ├── adr
│   │   ├── 05112025-BuildPipeline.md
│   │   ├── 05112025-Wireframe.md
│   │   └── 05142025-Storage.md
│   ├── assets
│   │   ├── browseEventPageLoFi.png
│   │   ├── calendarPageLoFi.png
│   │   ├── homepageLoFi.png
│   │   ├── postEventPageLoFi.png
│   │   └── singleEventPageLoFi.png
│   └── interface/lowfidelity
│       └── wireframe-lowfi.md
├── templates
│   ├── ADR-template.md
│   ├── code_review_template.md
│   └── pull_request_template.md
├── website
│   ├── css
│   │   ├── event.css
│   │   └── style.css
│   ├── js
│   │   ├── EventCard.js
│   │   ├── app.js
│   │   ├── custom_form.js
│   │   ├── storage.js
│   │   └── swipe.js
│   └── html
│       ├── browse.html
│       ├── event.html
│       ├── index.html
│       ├── liked.html
│       └── post.html
├── .gitignore
├── jsdoc.json
├── package-lock.json
└── package.json
```

