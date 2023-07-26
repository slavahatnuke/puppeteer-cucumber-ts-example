@wip
Feature: Google Search
  As a user
  I want to perform a Google search
  So that I can find relevant results

  Scenario: Perform a search
    Given I am on the Google search page
    When I enter "Puppeteer with Cucumber in TypeScript" into the search box
    And I click the Google Search button
    Then I should see search results