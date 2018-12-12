# stylelint-junit-formatter

[![Build Status](https://travis-ci.org/eddies/stylelint-junit-formatter.svg?branch=master)](https://travis-ci.org/eddies/stylelint-junit-formatter)

Output JUnit XML reports of stylelint results (that can be parsed by CircleCI or Bamboo).

## Usage

### With the Stylelint Node API:

```javascript
const fs = require('fs');
const stylelint = require('stylelint');
const junitFormatter = require('stylelint-junit-formatter');

const stylelintOptions = {
  files: '**/*.css',
  formatter: junitFormatter,
};

stylelint.lint(stylelintOptions)
  .then((resultObject) => {
    // Do something with the result, e.g. write a report.xml to disk:
    // fs.writeFile('report.xml', resultObject.output, (error) => {…});
  });

```

…or read the [stylelint](https://github.com/stylelint/stylelint) documentation about using formatters and follow those instructions.

The formatter will generate a `.xml`-report with the following look:
```xml
<?xml version="1.0" encoding="utf-8"?>
<testsuites package="stylelint.rules">
  <testsuite name="path/to/css/file1.css" failures="0" errors="0" tests="1">
    <testcase name="stylelint.passed"/>
  </testsuite>
  <testsuite name="path/to/css/file2.css" failures="0" errors="0" tests="1">
    <testcase name="stylelint.passed"/>
  </testsuite>
  <testsuite name="path/to/css/file3.css" failures="0" errors="0" tests="1">
    <testcase name="stylelint.passed"/>
  </testsuite>
  <testsuite name="path/to/css/file4.css" failures="0" errors="0" tests="1">
    <testcase name="stylelint.passed"/>
  </testsuite>
</testsuites>
```

In the event of errors, those are presented in a way that Bamboo can interpret:
```xml
<?xml version="1.0" encoding="utf-8"?>
<testsuites package="stylelint.rules">
  <testsuite name="path/to/css/file.css" failures="0" errors="0" tests="1">
    <testcase name="stylelint.passed"/>
  </testsuite>
  <testsuite name="/path/to/css/file.css" failures="2" errors="2" tests="2">
    <testcase name="declaration-block-properties-order">
      <failure type="error"
               message="Expected &quot;color&quot; to come before &quot;font-weight&quot; (declaration-block-properties-order)">
       On line 7, column 3 in /path/to/css/file.css
      </failure>
    </testcase>
    <testcase name="shorthand-property-no-redundant-values">
      <failure type="error"
               message="Unexpected longhand value &#39;0 2rem 1.5rem 2rem&#39; instead of &#39;0 2rem 1.5rem&#39; (shorthand-property-no-redundant-values)">
       On line 8, column 3 in /path/to/css/file.css
      </failure>
    </testcase>
  </testsuite>
  <testsuite name="path/to/css/file.css" failures="0" errors="0" tests="1">
    <testcase name="stylelint.passed"/>
  </testsuite>
</testsuites>
```
