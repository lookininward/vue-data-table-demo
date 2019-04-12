## data-table component
### VueJS, GraphQL, DynamoDB
[![CircleCI](https://circleci.com/gh/lookininward/data-table.svg?style=svg)](https://circleci.com/gh/lookininward/data-table)

### 1.0 Approach and Deployment Method

##### 1.1 Development Steps:
- Breakdown requirements into checklist of deliverables

##### Workflow Pattern
- Breakdown deliverable into checklist of expectations to test
- Write tests and prototype on a test branch
- Once I understand how to implement it, build it on a feature branch
- Refactor as the implementation evolves and I become familiar with Jest + Vue test utilities
- Refactor as I become familiar with new features like CSS Grid templates, etc.
- Squash and merge into main branch
- Repeat

##### 1.2 Deployment Steps:
- Build DB table in DynamoDB
- Configure app with Amplify and GraphQL settings
- Configure repo, environment and build settings for Amplify
- Deploys the app to Amplify when connected branch is updated

### 2.0 Work Timeline Overview
##### 2.1 How long did you spend on the test?
I took 'as much or as little time' to mean two weeks (03/27 - 04/10; hours logged: 45 hrs). There was a lot of new documentation to read up on. Things are happening at work, so got the work in on the evenings and over the weekend. Enjoyed the chance to try out new tech: Vue, GraphQL, Amplify, and DynamoDB. Jest and the Vue test utils are great. Vuex is also very promising.

##### 2.2 Would you do anything differently if you had more time?

With more time i'd like to try:

- Infinite scroll + pagination: The software I'm currently working on has an implementation of the [ember vertical collection](https://github.com/html-next/vertical-collection) library that does infinite scroll and occlusion. It would be an interesting exercise to take apart how that library works and build my own. Real-time querying with something like Elasticsearch and pagination on the server side would be great to learn.

- Keyboard shortcuts: Working with lots of data typically means jumping in and out of records. A well designed set of keyboard shortcuts helps with the user experience, helping to develop fast, more efficient workflows.

- Accessibility: I don't really like the base styles for inputs, e.g. blue outline. Spending some time to make design input styles that don't look jarring and support accessibility would be nice.

- Multi-locale support: I like learning different languages and exploring cultures, so implementing multi-locale support is great excuse to keep a language in practice. I've done work in English, French, and Mandarin to date. With the right project I would be interested in picking up Spanish or Mandarin.

- E2E snapshot testing: At work we write a lot of acceptance tests. The team generally considers them the best bang for the buck in terms of development time. I’m curious to try out e2e snapshot testing to see how well it works. New and more efficient testing methods are always welcome.

- Dynamically resize/reorder columns by dragging: Letting users decide what kind of information is most important in terms of visibility makes sense. Especially if this component were to be refactored to work with a wider range of data sets.

- Confirmation modals for actions: Making changes to sensitive data should probably prompt the user for confirmation - unless they explicitly turn off prompts.

- Breakout table components as reusable ui components: the buttons, inputs, popovers could all be their own components.

Many of these suggestions are also working towards adapting the component to work for more possible scenarios.

### 3.0 Adapting to Different Scenarios
This table could be adapted so that users can import their own JSON data to display and work with. That would require file upload functionality, and validation and normalization of the data to ensure integrity.

Could also detect data fields like dates so that they can be better formatted for readability, and the implementation of a date picker to update this field type.

### 4.0 New CSS feature
CSS Grid is an A+ feature. Love how flexible it is and how few lines of code it requires. Alignments and everything just seem to fall more easily in place. I also like the new units e.g. fr, vw, vh. They make designing for multiple devices much more intuitive.

### 5.0 Favourite modern JS features and why
My favourite modern JS feature is the arrow function. Everything becomes readable. Also the methods filter(), reduce(), and map() solve reduce unnecessary loops and extra steps. A pleasure when chained together.

### 6.0 Favourite 3rd party Vue.js library and why
The Vue ecosystem is new to me. I used [VueTippy](https://kabbouchi.github.io/vue-tippy/) (wrapper around [Tippy.js](https://atomiks.github.io/tippyjs/)) to implement the popovers and found that worked well for the scope of this project. If Vuex counts, it seems like a solid way to handle state management. Looking forward to diving more in-depth.

### 7.0 code solution
[GitHub repo](https://github.com/lookininward/data-table)

[Deployed App - Data Table Component](https://github.com/lookininward/data-table)
