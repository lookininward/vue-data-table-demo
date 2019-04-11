## data-table component
### VueJS, GraphQL, DynamoDB
[![CircleCI](https://circleci.com/gh/lookininward/data-table.svg?style=svg)](https://circleci.com/gh/lookininward/data-table)

### 1.0 Approach and Deployment Method
I thought I'd have some 'fun' and try out a bunch of new tools for this project. It was the first time using Vue.js, GraphQL, DynamoDB, Amplify, and everything that comes along with these technologies.

##### 1.1 Development Steps:
- break out requirements into checklist of functionality to implement

Implementation Loop

- breakdown functionality into a list of things to test
- write unit tests and build a basic version on a test branch
- once I understand how to implement it, build it on a feature branch
- refactor tests as I become more familiar with Jest, Vue test utilities
- refactor as I become familiar with features like CSS Grid
- merge into main branch
- repeat

##### 1.2 Deployment Steps:
- build DB table in DynamoDB
- configure app with Amplify and GraphQL settings
- use Amplify console to add repo/app and configure env and build settings
- use Amplify console to deploy the app when commit pushed to connected branch


### 2.0 Work Timeline Overview
##### 2.1 How long did you spend on the test?
I took 'as much or as little time' to mean two weeks (03/27 - 04/10; hours logged: 45 hrs). Things are happening at work, so got the work in on the evenings and over the weekend. enjoyed the chance to try out new tech vue, graphQL, amplify, and dynamoDB. Great to use jest and the vue test utils. Vuex was fine, will have to dive deeper.

##### 2.2 Would you do anything differently if you had more time?

With more time i'd like to try:

- infinite scroll pagination: the software i'm currently working on has an implementation of the [ember vertical collection](https://github.com/html-next/vertical-collection) library that does infinite scroll and occlusion. It would be an interesting exercise to take apart how that library works and build my own.

- keyboard shortcuts: working with lots of data typically meaning jumping in and out of records a well designed set of keyboard shortcuts helps with the user experience, helping to develop fast, more efficient work flows.

- real-time querying with something like Elasticsearch:
- real-time query and pagination on the server:
- support detecting dates and formatting them for like format date, with MomentJS

- accessibility: i don't really like the base styles for inputs, e.g. blue outline. Spending some time to make design input styles that don't look jarring and support accessibility would be great

- multilingual support i18n: i like learning different languages and find implementing multi-locale support great excuse keep a language in practice. I've done work in english, french, and mandarin. With the right project it'll be a great excuse to pickup Spanish or Mandarin.

- e2e snapshot testing: at work we write a lot of acceptance tests. The team generally considers them the best bang for the buck in terms of development time.

- dynamically resize columns in css grid layout by dragging
- confirmation modals for actions: making changes to sensitive data should probably prompt the user for confirmation - unless they explicitly turn of prompts.

- upload json file for display: support the uploading of a different set of json data. could be validated and normalized for display.

- breakout table components as reusable ui components: the buttons, inputs, popovers could all be their own components.

### 3.0 adapting to different scenarios
##### 3.1 in what ways could it be adapted?
##### 3.2 what kind of scenarios require data tables?


### 4.0 New CSS features
I've been itching to try out grid. They really hit it out of the park with this one. Love how flexible it is and how few lines of code it requires. Alignments and everything just seem to fall more easily in place.
At work we have to support clients on ie11, and flipping everything over to grid is pretty low in terms of priorities. I also like the new viewport units e.g. vw, vh.


### 5.0 Favourite modern JS features and why
My favourite modern JS feature(s) are arrow functions which just make everything much more readable. Also methods for filter(), reduce(), and map() solve many steps, especially when chained together.


### 6.0 Favourite 3rd party Vue.js library and why
As mentioned, it's my first time diving into Vue.js, so I'm not entirely familiar with the ecosystem. I used [VueTippy](https://kabbouchi.github.io/vue-tippy/) (wrapper around [Tippy.js](https://atomiks.github.io/tippyjs/)) to implement the popovers and found that worked well for the scope of this project. If Vuex counts, it seems like a solid way to handle state management. Looking forward to diving more in-depth to learn more.


### 7.0 code solution
[GitHub repo](https://github.com/lookininward/data-table)

[Deployed App - Data Table Component](https://github.com/lookininward/data-table)
