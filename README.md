## 特性

1. 时间旅行

2. 可调式能力

3. 自动等待

4. Spies，Stubs and Clock

5. 网络流量控制

6. 一致结果

7. 屏幕截图和视频

8. 跨浏览器

## 安装：

##### 下载地址(`https://download.cypress.io`)

##### 跳过安装 `CYPRESS_INSTALL_BINARY=0 npm install`

1. `npm i cypress`

2. `CYPRESS_INSTALL_BINARY=/local/path/to/cypress.zip npm install cypress`

3. `CYPRESS_INSTALL_BINARY=https://company.domain.com/cypress.zip npm install cypress`

选择不发送异常 (Mac,Linux) `export CYPRESS_CRASH_REPORTS=0`

## 第一个测试

```js
describe('My first test', ()=>{
  it('it will be error', ()=>{
    expect(false).to.equal(false);
  })
  it('Go to Baidu', ()=>{
    cy.visit('https://www.baidu.com');
  })
})
```

#### Testing strategies

```js
describe('Hooks', () => {
  before(() => {
    // runs once before all tests in the block
  })

  after(() => {
    // runs once after all tests in the block
  })

  beforeEach(() => {
    // runs before each test in the block
  })

  afterEach(() => {
    // runs after each test in the block
  })
})
```

### The order of hook and test execution is as follows:

- All `before()` hooks run (once)
- Any `beforeEach()` hooks run
- Tests run
- Any `afterEach()` hooks run
- All `after()` hooks run (once)

##### Seeding data : 

`cy.exec()`

##### Stubbing the server : 

1. Generate the fixture stubs ahead of time
2. Write a single e2e test without stubs, and then stub the rest

##### Logging in

1. Fully test the login flow – but only once!
2. Bypassing your UI



___

## Core Concepts

### Introduction

```js
describe('Post Resource', function() {
  it('Creating a New Post', function() {
    cy.visit('/posts/new')     // 1.

    cy.get('input.post-title') // 2.
      .type('My First Post')   // 3.

    cy.get('input.post-body')  // 4.
      .type('Hello, world!')   // 5.

    cy.contains('Submit')      // 6.
      .click()                 // 7.

    cy.url()                   // 8.
      .should('include', '/posts/my-first-post')

    cy.get('h1')               // 9.
      .should('contain', 'My First Post')
  })
})
```



### Querying Elements

1. [Cypress is Like jQuery](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-is-Like-jQuery)

2. [Cypress is Not Like jQuery](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-is-Not-Like-jQuery)

   

   jQuery:

   ```js
   // $() returns immediately with an empty collection.
   const $myElement = $('.element').first()
   
   // Leads to ugly conditional checks
   // and worse - flaky tests!
   if ($myElement.length) {
     doSomething($myElement)
   }
   ```

   Cypress:

   ```js
   cy
     // cy.get() looks for '#element', repeating the query until...
     .get('#element')
   
     // ...it finds the element!
     // You can now work with it by using .then
     .then(($myElement) => {
       doSomething($myElement)
     })
   ```

   

   - The DOM has not loaded yet.
   - Your framework hasn’t finished bootstrapping.
   - An XHR request hasn’t responded.
   - An animation hasn’t completed.
   - and on and on…

   

   ```js
   // This is fine, jQuery returns the element synchronously.
   const $jqElement = $('.element')
   
   // This will not work! Cypress does not return the element synchronously.
   const $cyElement = cy.get('.element')
   ```

   

3. [Querying by Text Content](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Querying-by-Text-Content)

4. [When Elements Are Missing](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#When-Elements-Are-Missing)

   ```js
   // Give this element 10 seconds to appear
   cy.get('.my-slow-selector', { timeout: 10000 })
   ```

   

1. Chains of Commands

   1. [Interacting With Elements](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Interacting-With-Elements)

      - [`.blur()`](https://docs.cypress.io/api/commands/blur.html) - Make a focused DOM element blur.
      - [`.focus()`](https://docs.cypress.io/api/commands/focus.html) - Focus on a DOM element.
      - [`.clear()`](https://docs.cypress.io/api/commands/clear.html) - Clear the value of an input or textarea.
      - [`.check()`](https://docs.cypress.io/api/commands/check.html) - Check checkbox(es) or radio(s).
      - [`.uncheck()`](https://docs.cypress.io/api/commands/uncheck.html) - Uncheck checkbox(es).
      - [`.select()`](https://docs.cypress.io/api/commands/select.html) - Select an `` within a ``.
      - [`.dblclick()`](https://docs.cypress.io/api/commands/dblclick.html) - Double-click a DOM element.
      - [`.rightclick()`](https://docs.cypress.io/api/commands/rightclick.html) - Right-click a DOM element.

      These commands ensure [some guarantees](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html) about what the state of the elements should be prior to performing their actions. For example, when writing a [`.click()`](https://docs.cypress.io/api/commands/click.html) command, Cypress ensures that the element is able to be interacted with (like a real user would). It will automatically wait until the element reaches an “actionable” state by:

      - Not being hidden
      - Not being covered
      - Not being disabled
      - Not animating

   2. [Asserting About Elements](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Asserting-About-Elements)

   3. [Subject Management](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Subject-Management)

   4. [Commands Are Asynchronous](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Asynchronous)

   5. [Commands Run Serially](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Run-Serially)

   6. [Commands Are Promises and Are not Promise](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Promises)

      

2. Assertions

   1. [Asserting in English](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Asserting-in-English)

   2. [When To Assert?](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#When-To-Assert)

   3. [Default Assertions](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Default-Assertions)

   4. [List of Assertions](https://docs.cypress.io/guides/references/assertions.html)

   5. [Writing Assertions](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Writing-Assertions)

      `should` ,`and`;

      `expect`

   6. [Implicit Subjects](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Implicit-Subjects)

   7. [Explicit Subjects](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Explicit-Subjects)

3. Timeouts

   1. [Applying Timeouts](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Applying-Timeouts)

      `cy.get('.mobile-nav', { timeout: 10000 })`

   2. [Default Values](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Default-Values)

### Writing and Organizing

1. Folder Structure

   1. [Configuring Folder Structure](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Configuring-Folder-Structure)

      ```
      /cypress
        /fixtures
          - example.json
      
        /integration
          /examples
            - actions.spec.js
            ...
            - window.spec.js
      
        /plugins
          - index.js
      
        /support
          - commands.js
          - index.js
      ```

      

   2. [Fixture Files](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Fixture-Files)

   3. [Test files](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Test-files)

   4. [Plugin files](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Plugin-files)

   5. [Support file](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Support-file)

2. Writing tests

   1. [Test Structure](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Test-Structure)
   2. [Hooks](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Hooks)
   3. [Excluding and Including Tests](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Excluding-and-Including-Tests)
   4. [Dynamically Generate Tests](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Dynamically-Generate-Tests)
   5. [Assertion Styles](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Assertion-Styles)

   `BDD (`expect`/`should`) and TDD (`assert`)`

   ```js
   it('can add numbers', function() {
     expect(add(1, 2)).to.eq(3)
   })
   
   it('can subtract numbers', function() {
     assert.equal(subtract(5, 12), -7, 'these numbers are equal')
   })
   ```

   

3. Watching tests

   1. [What is watched?](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#What-is-watched)
   2. [What isn’t watched?](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#What-isn’t-watched)
   3. [Configuration](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Configuration)

### Retry-ability

### Interacting with Elements

1. Actionability

   1. [Visibility](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Visibility)
   2. [Disability](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Disability)
   3. [Readonly](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Readonly)
   4. [Animations](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Animations)
   5. [Covering](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Covering)
   6. [Scrolling](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Scrolling)
   7. [Coordinates](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Coordinates)

2. [Debugging](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Debugging)

   `cy.get('button').debug().click()`

3. [Forcing](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Forcing)

### Variables and Aliases

1. Return Values
   1. [Closures](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Closures)
   2. [Debugging](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Debugging)
   3. [Variables](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Variables)
2. Aliases
   1. [Sharing Context](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Sharing-Context)
   2. [Elements](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Elements)
   3. [Routes](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Routes)
   4. [Requests](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Requests)

### Conditional Testing



_____

- Guides

  - [Command Line](https://docs.cypress.io/guides/guides/command-line.html)
  - [Module API](https://docs.cypress.io/guides/guides/module-api.html)
  - [Debugging](https://docs.cypress.io/guides/guides/debugging.html)
  - [Network Requests](https://docs.cypress.io/guides/guides/network-requests.html)
  - [Continuous Integration](https://docs.cypress.io/guides/guides/continuous-integration.html)
  - [Parallelization](https://docs.cypress.io/guides/guides/parallelization.html)
  - [Environment Variables](https://docs.cypress.io/guides/guides/environment-variables.html)
  - [Stubs, Spies, and Clocks](https://docs.cypress.io/guides/guides/stubs-spies-and-clocks.html)
  - [Screenshots and Videos](https://docs.cypress.io/guides/guides/screenshots-and-videos.html)
  - [Launching Browsers](https://docs.cypress.io/guides/guides/launching-browsers.html)
  - [Cross Browser Testing](https://docs.cypress.io/guides/guides/cross-browser-testing.html)
  - [Web Security](https://docs.cypress.io/guides/guides/web-security.html)

  

