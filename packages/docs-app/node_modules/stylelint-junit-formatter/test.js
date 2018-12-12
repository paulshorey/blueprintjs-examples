const tape = require('tape');
const xml2js = require('xml2js');
const stylelinitJunitFormatter = require('./index');

const mockPassingTest = [
  {
    source: 'path/to/fileA.css',
    errored: false,
    warnings: [],
    deprecations: [],
    invalidOptionWarnings: [],
    ignored: false
  },
  {
    source: 'path/to/fileB.css',
    errored: false,
    warnings: [],
    deprecations: [],
    invalidOptionWarnings: [],
    ignored: false
  },
  {
    source: 'path/to/fileC.css',
    errored: false,
    warnings: [],
    deprecations: [],
    invalidOptionWarnings: [],
    ignored: false
  }
];

const expectedPassingXml = `<?xml version="1.0" encoding="utf-8"?>
<testsuites package="stylelint.rules">
  <testsuite name="path/to/fileA.css" failures="0" errors="0" tests="1">
    <testcase name="stylelint.passed"/>
  </testsuite>
  <testsuite name="path/to/fileB.css" failures="0" errors="0" tests="1">
    <testcase name="stylelint.passed"/>
  </testsuite>
  <testsuite name="path/to/fileC.css" failures="0" errors="0" tests="1">
    <testcase name="stylelint.passed"/>
  </testsuite>
</testsuites>`;

const mockFailingTest = [
  {
    source: 'path/to/fileA.css',
    errored: false,
    warnings: [],
    deprecations: [],
    invalidOptionWarnings: [],
    ignored: false
  },
  {
    source: 'path/to/fileB.css',
    errored: true,
    warnings: [
      {
        line: 7,
        column: 3,
        rule: 'declaration-block-properties-order',
        severity: 'error',
        text: 'Expected quot;colorquot; to come before quot;font-weightquot; (declaration-block-properties-order)'
      },
      {
        line: 8,
        column: 3,
        rule: 'shorthand-property-no-redundant-values',
        severity: 'error',
        text: 'Unexpected longhand value #39;0 2rem 1.5rem 2rem#39; instead of #39;0 2rem 1.5rem#39; (shorthand-property-no-redundant-values)'
      },
    ],
    deprecations: [],
    invalidOptionWarnings: [],
    ignored: false
  },
  {
    source: 'path/to/fileC.css',
    errored: false,
    warnings: [],
    deprecations: [],
    invalidOptionWarnings: [],
    ignored: false
  }
];

const expectedFailingXml = `<?xml version="1.0" encoding="utf-8"?>
<testsuites package="stylelint.rules">
  <testsuite name="path/to/fileA.css" failures="0" errors="0" tests="1">
    <testcase name="stylelint.passed"/>
  </testsuite>
  <testsuite name="path/to/fileB.css" failures="2" errors="2" tests="2">
    <testcase name="declaration-block-properties-order">
      <failure type="error" message="Expected quot;colorquot; to come before quot;font-weightquot; (declaration-block-properties-order)">On line 7, column 3 in path/to/fileB.css</failure>
    </testcase>
    <testcase name="shorthand-property-no-redundant-values">
      <failure type="error" message="Unexpected longhand value #39;0 2rem 1.5rem 2rem#39; instead of #39;0 2rem 1.5rem#39; (shorthand-property-no-redundant-values)">On line 8, column 3 in path/to/fileB.css</failure>
    </testcase>
  </testsuite>
  <testsuite name="path/to/fileC.css" failures="0" errors="0" tests="1">
    <testcase name="stylelint.passed"/>
  </testsuite>
</testsuites>`;

const mockEmptyTests = [];

const expectedEmptyXml = `<?xml version="1.0" encoding="utf-8"?>
<testsuites package="stylelint.rules"/>`;

tape('It outputs a correct .xml for passing testsuites', (test) => {
  const output = stylelinitJunitFormatter(mockPassingTest);
  test.equal(output, expectedPassingXml, 'It matches expectation');
  test.doesNotThrow(() => {
    xml2js.parseString(output, (error) => {
      if (error) throw error;
    });
  }, 'It outputs valid xml');
  test.end();
});

tape('It outputs a correct .xml for failing testsuites', (test) => {
  const output = stylelinitJunitFormatter(mockFailingTest);
  test.equal(output, expectedFailingXml, 'It matches expectation');
  test.doesNotThrow(() => {
    xml2js.parseString(output, (error) => {
      if (error) throw error;
    });
  }, 'It outputs valid xml');
  test.end();
});

tape('It outputs a correct .xml for empty testsuites', (test) => {
  const output = stylelinitJunitFormatter(mockEmptyTests);
  test.equal(output, expectedEmptyXml, 'It matches expectation');
  test.doesNotThrow(() => {
    xml2js.parseString(output, (error) => {
      if (error) throw error;
    });
  }, 'It outputs valid xml');
  test.end();
});
