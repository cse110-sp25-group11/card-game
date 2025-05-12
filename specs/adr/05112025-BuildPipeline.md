# Build Pipeline Decisions as of May 11 2025

## Context and Problem Statement

- We have to create our own Build pipeline, which includes needing different tools for tasks such as linting, tests and generating documentation.

## Considered Options

- Using Jest for our tests
- Using JSDocs to automatically generate documentation
- Using Qlty for linting our code
- Having 2 reviewers for each pull request
- Manually writing the documentation ourselves with a designated person

## Decision Outcome

All of the considered options were chosen expect for manually writing documentation. In that case, we decided to go with JSDocs since it would speed up the process. 

#### Positives of choice
- Qlty makes it really easy to lint our code locally and also helps to refactor them. This will save us a lot fo time.
- Jest is what we are most familiar with and given our timeline, we didn't want to explore more options and learn them.
- 2 reviewers makes sure that all code pushed to the main branch is checked very thoroughly. We also have templates for the code reviews. 

#### Negatives of choice
- Qlty only works on Linux or Mac so Windows users have to use Ubuntu
- JSDocs might struggle with creating documentation so we will have to double check it 
