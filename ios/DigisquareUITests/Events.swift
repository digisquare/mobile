//
//  Events.swift
//  digisquare
//
//  Created by Damien Varron on 01/07/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

class Events: XCTestCase {
  
  override func setUp() {
    super.setUp()
    continueAfterFailure = false
    let app = XCUIApplication()
    if NSUserDefaults.standardUserDefaults().boolForKey("FASTLANE_SNAPSHOT") {
      setupSnapshot(app)
    }
    app.launch()
    if NSUserDefaults.standardUserDefaults().boolForKey("FASTLANE_SNAPSHOT") {
      snapshot("0Launch")
    }
  }
  
  override func tearDown() {
    super.tearDown()
  }
  
  func testClickEvent() {
    XCUIApplication().otherElements["EventsListView"].buttons["EventsRow-0-0"].tap()
    if NSUserDefaults.standardUserDefaults().boolForKey("FASTLANE_SNAPSHOT") {
      snapshot("1Event")
    }
  }
  
}
