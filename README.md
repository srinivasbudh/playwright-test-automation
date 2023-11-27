# Solution

### Environment
<details>
  <summary>Environment setup</summary>

##### Needed softwares should be installed
* [Git][1]
* [Node.js][2]

To check all these items installed properly, run one by one in your terminal:
```shell
node -v;
git --version;
java --version;
```

You should see versions for all these items, without any errors.
</details>

***

### Installation
<details>
  <summary>How to install dependencies</summary>

1. Navigate to the folder in which framework will be stored, and run in your terminal copied link (with HTTPS path):
```shell
git clone https://github.com/srinivasbudh/playwright-test-automation.git
```
2. Navigate into the downloaded "cypress-e2e-automation" repository folder
```shell
cd playwright-test-automation/
```
3. Install all required dependencies:
```shell
npm ci
```
</details>

***

### Test run
<details>
  <summary>How to run tests</summary>

#### Before tests run
Before running the e2e cypress tests you need to **start the application** <br>
Please run in your terminal:
```shell
npm run start
```

#### Cypress run
To run the cypress tests you can use the command:
```shell
npm run test
```

</details>

### Report
<details>
  <summary>How to view test reports</summary>

  Playwright captures videos and also screenshots for failed scenarios and store it under playwright-report folder.

</details>

### Bugs
* Found 3 Bugs and listed them under [Issues][3] in the git repository
* Also have 1 remark which might be a bug also listed it under [Issues][3]
* ` I have implemented a failing tests for one of the bugs and skipped it using test.skip. So test execution has 1 skipped testcase `

# Major Decisions a

* Mocks are only implemented for people search and they work as backup when API doesn't work, didnt do it for planets as its just same task repeating
* Github actions have failures and needs some extra attention as tests are failing due to CI setup not merging the branch
* Just added playwright report with screenshots, videos and traces.



[1]: https://git-scm.com/downloads
[2]: https://nodejs.org/en/
[3]: https://github.com/srinivasbudh/cypress-e2e-automation/issues