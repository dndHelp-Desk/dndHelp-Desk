# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.7.7](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.7.6...v0.7.7) (2022-06-09)


### Features

* **filters:** now you can filter by time of the day ([8ad2caa](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/8ad2caacf6311aaede029775a739b1755cd00f1a))


### Bug Fixes

* **new ticket:** changed the new ticket styles to prevent hiding "to" field ([535895a](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/535895acee762401f875f20d661ff60155285f9d))

### [0.7.6](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.7.5...v0.7.6) (2022-06-07)

### [0.7.5](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.7.4...v0.7.5) (2022-06-03)


### Features

* **auth:** when logging and adding new user or  in you can now reveal password ([8529f7d](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/8529f7dcef8c683862867fed21c8ecfb699cb9d1))
* **tickets:** now agents are able to delete messages sent by them excluding the ticket ([89b12be](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/89b12be3ba86a20f3b9001b3796bfdfc2215bf05))

### [0.7.4](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.7.3...v0.7.4) (2022-05-31)


### Features

* **settings:** now admins are able to add different categories and the due date picker is now more ([af8a473](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/af8a4739bb8a99ab406941ceb505682f6506bb63))

### [0.7.3](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.7.2...v0.7.3) (2022-05-30)


### Features

* **tickets:** macros are now available for individual agents plus click image zoom ([2287fec](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/2287fecff9640d3009e5cda59bf1f925ac39ae67))

### [0.7.2](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.7.1...v0.7.2) (2022-05-28)


### Bug Fixes

* **new ticket:** ticket IDs are now generated using date and intials ([c881d29](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/c881d291235c6fd1f6ff11016eaca574ffaece62))

### [0.7.1](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.7.0...v0.7.1) (2022-05-27)


### Bug Fixes

* **tickets:** A new algorithm or generating tickets id's to avoid duplicates with up to 259 947 different
possibilities ([b28c243](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/b28c24326307732dd24ceac4923b1e5bf8a36662)), closes [#25](https://github.com/dndHelp-Desk/dndHelp-Desk/issues/25)

## [0.7.0](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.16...v0.7.0) (2022-05-26)


### ⚠ BREAKING CHANGES

* **data fetching:** added firestore compound queries and reports data filtering for better perf which
might affect user with older version by being restricted

* **data fetching:** added firestore compound queries and reports data filtering for better perf ([9297118](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/92971185d3e6c2b167d56793f41bbfd5ad2d4278))

### [0.6.16](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.15...v0.6.16) (2022-05-22)


### Bug Fixes

* **alerts:** updated the alert component with unique id and ui ([a0b64ee](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/a0b64eeca88ae639cf5487fff6fd6614db2753b0))
* **reports/table:** fixed the reports table indexing when using pagination and filters update ([24f1b41](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/24f1b41feef37a3a4ef86f1028e3f39f8d0f92cd))

### [0.6.15](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.14...v0.6.15) (2022-05-18)


### Features

* **maincomponent:** added A preloader for the main component on initial load ([53318f3](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/53318f3ef6ec26a8905a58a85b47f88ce85865ab))


### Bug Fixes

* **tickets:** when adding image there now minimized allowing you to type and review ([011d0f6](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/011d0f6d34535130180ceff382e169907e35f21a))

### [0.6.14](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.13...v0.6.14) (2022-05-13)

### [0.6.13](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.12...v0.6.13) (2022-05-13)


### Features

* **settings:** admin Can now edit user info like name, access, department and companies ([20c6e38](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/20c6e38c296d1a6675850ef62a51a6743bf5e2c7))


### Bug Fixes

* **foilters:** initial date doesn't render any tickes on Mac ([a4dffef](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/a4dffef3ecf25de2b5e090566622305882fe6c7e))

### [0.6.12](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.11...v0.6.12) (2022-05-11)


### Bug Fixes

* add customers details when sending an email ([77f9997](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/77f99978ecceb55c2b5f3ce436bb29b89ff563c5))
* **date picker and datafetching:** changed toLocaleDateString on date filters to normal ([0d5a56e](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/0d5a56edd58bf17ba9e08fd90bf9deb0c271f07e)), closes [#23](https://github.com/dndHelp-Desk/dndHelp-Desk/issues/23)

### [0.6.11](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.10...v0.6.11) (2022-05-11)


### Bug Fixes

* **filters:** tickets and repors can  now be filtered using onhold status ([07a39cc](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/07a39cc03aafc66acd226b07f7d4112ba2e2bd52))

### [0.6.10](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.9...v0.6.10) (2022-05-09)


### Bug Fixes

* **datafetching:** fixed the filtering of data on conersations and reports aggregate ([db576a3](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/db576a39e6a81000b35c608a34ee7b8b6b2692a8))

### [0.6.9](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.8...v0.6.9) (2022-05-06)


### Features

* **messagethread:** added canned response when replying to message thread or ticket thread ([7758e13](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/7758e13b34af84a7daf3779466c5a9028194a8aa))


### Bug Fixes

* **workspacesetup:** detect if workspace/email created already exists and notify user ([ad8b1a7](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/ad8b1a7464ce79169ff3d805eedda828283c10da)), closes [#20](https://github.com/dndHelp-Desk/dndHelp-Desk/issues/20)

### [0.6.8](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.7...v0.6.8) (2022-05-04)


### Bug Fixes

* **userslice:** Added a redirect page when signing in in order to determine if workspace exists and enabled dark mode by default if system is on dark mode and remember their preferfence ([dabf81a](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/dabf81aa9bbea1ed4448a16da8b57af1a6fafdef))

### [0.6.7](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.6...v0.6.7) (2022-05-03)


### Features

* **component:** added a redirect page when signing in in order to dertemine if workspace exist ([77f7f16](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/77f7f16d4d02e560568d16a4f940963b638d5940)), closes [#19](https://github.com/dndHelp-Desk/dndHelp-Desk/issues/19) [#18](https://github.com/dndHelp-Desk/dndHelp-Desk/issues/18)

### [0.6.6](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.5...v0.6.6) (2022-05-01)

### [0.6.5](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.4...v0.6.5) (2022-04-30)


### Bug Fixes

* **messagethread:** fixed the height of the text editor and added position sticky to the toolbar ([a7f9781](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/a7f97814e499fbe63799b9d0d8b7c6b8984aa60a)), closes [#16](https://github.com/dndHelp-Desk/dndHelp-Desk/issues/16)

### [0.6.4](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.3...v0.6.4) (2022-04-30)


### Features

* **components:** uI update and Minor bug fix ([21a01d0](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/21a01d04d4b6b12ffca3dfa1700337e420a92abe))

### [0.6.3](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.2...v0.6.3) (2022-04-26)


### Features

* **home.tsx:** added connect UI  feature for prefered channel and, calling btn & Billing Btn ([f9a281e](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/f9a281e60e32e1a60d62e49633bd6f43b14e9417))

### [0.6.2](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.1...v0.6.2) (2022-04-26)


### Bug Fixes

* **tickets list:** update ticket list when a new ticket is added or when an old ticket is updated ([7e8686b](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/7e8686b8084b58c18ca1383cd2f07075c4daedf0)), closes [#14](https://github.com/dndHelp-Desk/dndHelp-Desk/issues/14)

### [0.6.1](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v0.6.0...v0.6.1) (2022-04-26)


### Bug Fixes

* **minor fix:** changes Filters and Minor fix ([7e1412f](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/7e1412fa8425c55fb683025a834e1b7dbbc654f2))
* **newticket.tsx:** removed the Client Email Required attribute which was firebase to throw errors ([7ae1624](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/7ae16245e8e90e808d41920865eee5d0b1d973a4)), closes [#12](https://github.com/dndHelp-Desk/dndHelp-Desk/issues/12)
* **newticket:** new Ticket Show undefined when client email isnot filled ([f1afef1](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/f1afef16d3b27d68de6cfdf0760c18392752c388))

## [0.6.0](https://github.com/dndHelp-Desk/dndHelp-Desk/compare/v1.5.2...v0.6.0) (2022-04-20)


### ⚠ BREAKING CHANGES

* **Texteditor:** Removed an image array on tickets document, the message is now being stored as pure HTML

### Features

* **Texteditor:** migrated from react.js to react.ts (typescript),Added Rich Text Editor ([c2a74da](https://github.com/dndHelp-Desk/dndHelp-Desk/commit/c2a74dac7991272330127ce6ac4cb3cf84918cd9))

- Adding Change log
- Minor Fix
- Create SECURITY.md
- Updates
- Notification Update and Minor bug fix
- PWA Fix
- Minor Update
- Merge branch 'main' of https://github.com/dndHelp-Desk/dndHelp-Desk
- google-site-verification
- Update issue templates
- Adding Code Scanning
- Delete .github/workflows directory
- Create codeql-analysis.yml
- Default Title Update
- .gitignore is now working
- Changing Echarts to Apex Charts and Adjusted Ticekts Chat length
- Minor Update
- Update README.md
- Update README.md
- Error Clearing
- Enabled Image Attachments and image zoom in a thread
- Enabled Image Upload and recordigns upload bug fix, changed dashboard UI and removed moment library
- Added Keywords meta data
- Ui Update , SignOut Option Changed , Account Settings Update, Preloader UI Update
- Login data fetch fix and minor changes
- Fixed Date filtering on main component problem
- Build Update
- Minor fix, Added App Version under Settigns Tooltip
- Added support email
- SEO by adding robots.txt file, correcet meta tags, improved site structure and more
- Default Logo Update in the app and minor fix
- Updated Company Name validation in sign-in and when saving to localeStorage
- Added Rating instead of a heat map
- Enabled creation of new organisation or workspace, change light the the UI to light slate-50 and white.Redisigned report page and tickets
- Merge pull request #6 from Sands-45/dependabot/npm_and_yarn/follow-redirects-1.14.9
- Bump follow-redirects from 1.14.7 to 1.14.9
- Merge pull request #5 from Sands-45/dependabot/npm_and_yarn/node-forge-1.3.1
- Bump node-forge from 1.2.1 to 1.3.1
- Merge pull request #4 from Sands-45/dependabot/npm_and_yarn/minimist-1.2.6
- Bump minimist from 1.2.5 to 1.2.6
- UI Logo Update and Text Editor
- Ability to create a new workspace , initial commit
- Status Bug fix
- Update
- Reply send option icon
- Changing ticket status UI Update, moved the option to send reply
- Dashboard View Update
- Clearing Errors
- Minor Updates
- Landing Page Reports Img Update
- Minor Update
- Error Clearing
- landing page update
- Improved Report Performance and fixed filtering bugs and more
- Minor Update
- UI Update and enebled SMS
- Minor Fix
- UI Changes
- UI Update
- Top Nav Update
- Changed the settings menu to be a tooltip
- Light theme Update and User Tracking using Log Rocket to improve performance
- Track issues by users and user_emails
- Added LogRocket to moniotr and track issues
- enabled caching
- Added Lazy Loading For Reorts Page
- Labels Mark Icons Update, changed default profile to webpa
- Update
- Minor fix
- Updating email templates
- Minor Fix:Hidding users list from client and email verification
- Minor  fix
- Update
- Added Lazy Loading
- FM Owners Access
- MInor Fix
- Contact edit Update
- disabling auto scroll to last message and added condition to only delete recordings if the ticket has recording
- Update bookmarks icons
- Minor UI Fix
- Update
- Minor Update
- Recordings Update
- Error Clearing
- Added report hourly average and daily average
- Update Meta data by adding author and description
- Update the reports Aggregate calculation
- Error clearing
- Moved Solution To The conversation thread and added total calls aggregation
- Default Profile On Main Dashboard if profile is empty
- Sending from Name Update
- Clean Up
- Chaneged URL end point
- Dynamic sending email, update setting email account initial commit
- Support Operations Tabs UPdate
- Update
- Updated Date filter
- Tickets list date filter
- Minor Update
- Added link to tickets from tickets page
- Clean Up
- Dashboard new update
- Removed required on recordings
- tickets component Update
- Date Picker Update
- Pagination stick at the bottom and changed date picker date format
- Added Pagination On Tickets List
- date compare update
- Update
- Date Picker date toLocaleString()
- Changed date filters from getTime To toISOString
- Date Picker Update
- Testing Other Filters
- Testing Date Filter
- Adding filters for mac and mobile devices
- Update
- Update
- Update
- Delete Warning Update , Initial commit
- Minor Update, disabled customers or clients response
- Testing Tickets List for mobile device
- Error Clearing
- Play audio upadate and first call resolutions upload update
- Allow Clients Log In And Update tickets, reading new messages and notifying about new assigned tickets
- Error Clearing
- Added few properties on reply and new icket regarding assignees
- Date Update from ISO to get Time to clear mobile and IOS errors
- Upload,delete recording and play if solved. Validated submited audio type and Dont Allow resolution without recording
- Initialized RecordingsnProcess, first commit -m
- New Send /Open Ticket Interface, Clean chat and more
- Reports Table Table Update And Update the ticket closing time
- Error Clearing
- Filter Updated , added dropdowns, average query age and more
- Default tickects sorting and added Average age of query metric on reports
- Ticket Open Date Update and Scroll bars for tables
- Minor Bug fix
- Table Sort Update on reports and some minor fix
- Update contacts
- Added A Delete User Functionality For Admin User
- Create New User Using firebase Admin SDK
- Minor Update
- Update
- New Ticket Update
- Minor Update
- Settings Acces Update|
- Profile Update
- Mass Contact Addition
- Contacts Update
- Light color Update
- Report Page Update: Specifically the top 5 category and tables
- Errors clearing
- fix: Samll Menu Icon and minor updates
- Theme Update and new logo design
- Clearing Errors
- First Contact Resolution A Minor Update
- Ticket Status Update
- fix:Dasboard Update
- Online Staus update and more
- Home route update to dashboard and added few changes
- Error Clearing
- Update New Ticket ID Listing and Update Assigning Agent Filed
- Filter tickets based on access/role and added chat on landing page
- Error Clearing
- Minor Updates
- Animated Tooltip for List
- Showcase Image Update
- Error clearing
- Tickets Tooltip and Minor Update
- Landing Page Responsiveness
- Landing Page UPdate
- Landing Page Update
- Landing Page Update
- Home page first commit
- Minor Update
- Top Nav position fix
- Testing nodemailer deployed on heroku
- Added nodemailer functionality testing with local host
- Update
- Minor Update
- New Table Update
- Updated client and agent chat interface, added little chat for live support
- Update Client SSide Peloader
- Firebase Auth
- Hide delete options if user is not admin
- Login Update and changed auth errors to alerts
- Changed default theme to light
- New Template for new tickets and replies
- Chat Update on small screen
- Notification Update Mark As Delivered if message is sent
- Overdue tickect update
- Indicate if user is online or offline
- Update
- Update account setting page and moved signout bn to settings
- Minor Update
- Error Clearing
- Knowledge base Update and improved ticket sorting by due date
- Minor Update
- Error fixing, responsive client and agent chat. Edited Tickets list
- Minor Update
- Home components and calendar update
- Fixed Responsiveness error
- Todo Update
- No Task Placeholder and minor update
- Client Reply Chat Update -- removed delete btn
- Settings Page Update , Change Password and reset Password
- Setting Update
- Main Component/home Update -- added Calender and few changes
- Contacts Update and tickets filter based on access
- active chat highlight and change of new ticket btn bg-color
- New Ticket Component Update and Update Overdue tickects Profiles
- Theme Update Remove annoying user profile, mobile responsiveness added a class contain to all pages and the menu
- Clearing Errors
- Clearing Error and Unsused code
- No chat image place holder
- Chat interface update
- Thread Routes Updates
- UI update and main container change
- Routes Abpdate and nav abbreviation names
- Reports Data Update
- massage timestamp update
- Updater Tickects List Filters , filters color, messsages in thread, added time stamps in chats
- Smaller breakpoints menu fix
- Minor Update
- home page buttons radius update
- Report Responsivenesss Update
- Added Additional report contents and progress bars, satisfction e.t.c
- Top cards update and addedecharts
- Report Filters and Designed skeleton
- to do task abbreviation update
- To do list date picker update
- Error Clearing
- To do list Update and client form update
- Minor color Update and delete thread messages plus login svg
- Email Template Update
- Update of email template with better UI
- New Ticket ID format and API url change
- Send Email Notifications to User and add Data to spreadsheet
- Reply text feld update
- Chat interface Update and minor homw page updates
- Minor Update
- Main component Update and added to do component
- hometab update with added task manager and more --- initial commit
- Error clearing
- Update ticket status,priority, delete and assign agents , create new ticket
- New tickect Form
- Tickets No Data Message
- Tickets Initial Commit
- Added All components and proper routing
- Minor Update
- Tickeckts and user data prep
- error fixing
- gmailpAPI Test
- fixing errors
- Fixing errors
- Persistant Route after reload
- Updated logging useEffect depedency array
- Cleared error of updating state on an unmounted component Loggin and Remove a none strelizable value when dispatching the user objects
- Profile instant Update , Alert if updated and transparent main route component
- Minor Update
- Alert Update, Logo Change to svg, navlinks update
- Profile Upload function Update
- Routes Update and Profile Update
- minor update
- minor update
- link norefference
- fixing mini-css-extract-plugin error in build
- Mobile responsive menu on sign in page
- Sign In Page initial commit
- Initialize project using Create React App
