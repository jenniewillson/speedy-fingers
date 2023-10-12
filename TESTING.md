# Speedy Fingers testing record

## Table of contents

- [Validation Testing](#validation-testing)
  * [Javascript Validation](#javascript-validation)
  * [CSS Validation](#css-validation)
  * [HTML Validation](#html-validation)
    + [index.html](#indexhtml)
    + [contact.html](#contacthtml)
    + [404.html](#404html)
- [Compatibility and Responsive Testing](#compatibility-and-responsive-testing)
- [Manual Testing](#manual-testing)
  * [Mobile](#mobile)
  * [Tablet](#tablet)
  * [Desktop](#desktop)
  * [Simulation of other devices](#simulation-of-other-devices)
    + [iPhone 12 Pro](#iphone-12-pro)
    + [iPad mini (portrait)](#ipad-mini--portrait-)
    + [iPad mini (landscape)](#ipad-mini--landscape-)
    + [iPad air](#ipad-air)
  * [User stories](#user-stories)
- [Defect Tracking](#defect-tracking)
- [Defects of Note](#defects-of-note)
    + [Of note due to length of time taken to resolve](#of-note-due-to-length-of-time-taken-to-resolve)
    + [Of note due to key learning points](#of-note-due-to-key-learning-points)
- [Outstanding Defects](#outstanding-defects)
- [Accessibility Testing](#accessibility-testing)
  * [Accessibility Audits](#accessibility-audits)
    + [Contrast checker](#contrast-checker)
    + [Lighthouse](#lighthouse)
      - [index.html](#indexhtml-1)
        * [Mobile](#mobile-1)
      - [Desktop](#desktop-1)
    + [contact.html](#contacthtml-1)
        * [Mobile](#mobile-2)
      - [Desktop](#desktop-2)
    + [axe DevTools](#axe-devtools)
      - [index.html](#indexhtml-2)
      - [contact.html](#contacthtml-2)
  * [Keyboard Navigation](#keyboard-navigation)
  * [Screen reader](#screen-reader)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


## Validation Testing

### Javascript Validation

I used JSFiddle for this and include screenshots. Any issues would show as red dots in the left margin but there are none shown.

![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/0f6edd99-b0c8-4b5a-ae94-a4ec81ab37b4)
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/0ebb7ee6-5ef8-41d2-a09f-c6f7d1a75d59)
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/23c2e073-1675-4e5e-9143-525c8c7c33d4)
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/9ad47263-d6cd-4082-afc5-562ed6b11c2b)
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/63878a85-b93c-4567-843d-872fa8e11aa2)
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/629ed3ff-504a-437b-b218-91330800d524)
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/a4a284da-54aa-4e2b-8230-48be462831f5)

### CSS Validation

![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/b0d3d58c-21ab-4241-9df9-eeb739159ce8)

### HTML Validation

#### index.html
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/f7b77b58-70d6-4a07-a9d0-54d393b4e03b)

#### contact.html
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/d3acdd98-c3b5-4696-a418-4987fef79177)

#### 404.html
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/b76c9a9a-a8c2-4a14-968a-1c8a35763e24)

## Compatibility and Responsive Testing

## Manual Testing

### Mobile

Tested on iPhone 13

|Requirement - *Home page*|Result|Comments|
|-------|-------|-------|
|Website loads|Pass|No delay|
|Mobile message is shown to inform user this cannot be used on a mobile|Pass|N/A|
|Send us a message link takes user to Contact page|Pass|N/A|
|Facebook link takes user to Facebook app|Pass|N/A|
|Instagram link takes user to Instagram app|Pass|N/A|

|Requirement - *Contact page*|Result|Comments|
|-------|-------|-------|
|Layout appearance is correct (check for visibility of text, layout, no overlaps)|Pass|N/A|
|Input fields work correctly, validate and accept data|Pass|N/A|
|Send email button works|Pass|Triggers modal|
|Message sent confirmation modal appears and is displayed correctly|Pass|N/A|
|Message sent modal close button returns user to Home Page|Pass|N/A|
|Message sent is received by email set up|Pass|N/A|

|Requirement - *404 page*|Result|Comments|
|-------|-------|-------|
|Layout appearance is correct (check for visibility of text, layout, no overlaps)|Pass|N/A|
|Link in 404 message returns user to Home Page|Pass|N/A|
|Logo links back to Home Page|Pass|N/A|

### Tablet

Tested on iPad

|Requirement - *Home page*|Result|Comments|
|-------|-------|-------|
|Website loads|Pass|No delay|
|Basic instructions can be read - font size and layout|Pass|Tested portrait and landscape|
|Detailed instructions button works|Pass|Tested portrait and landscape|
|Detailed instructions show, font size and layout fit|Pass|Tested portrait and landscape|
|High scores button works|Pass|Tested portrait and landscape|
|High scores show, font size and layout fit|Pass|Tested portrait and landscape|
|Letter select buttons start game|Pass|Tested portrait and landscape|
|Letter select buttons trigger correct number of letters in word given|Pass|Tested portrait and landscape. Noted portrait that longer words do not fit in box available. See bugs section.|
|Letter select buttons start timer|Pass|Tested portrait and landscape|
|Letter select buttons show current score|Pass|Tested portrait and landscape|
|User is able to type words|Fail|ipad defaults to capital letter which is not matched|
|User is able to type words (retest)|Pass|Case is now ignored|
|Letter check works correctly|Pass|Tested portrait and landscape|
|New word is generated when last one complete|Pass|Tested portrait and landscape|
|Score increases with each correct word|Pass|Tested portrait and landscape|
|Timer starts at 60 and counts down correctly|Pass|Tested portrait and landscape|
|Game is ended when incorrect letter is typed|Pass|Tested portrait and landscape|
|Score is given correctly|Pass|Tested portrait and landscape|
|Game over modal appears|Pass|Tested portrait and landscape|
|Game over modal can only be closed using button and resets game|Pass|Tested portrait and landscape|
|Game is ended when 60 seconds has elapsed|Pass|Tested portrait and landscape|
|Game complete modal appears|Pass|Tested portrait and landscape|
|Score is given correctly|Pass|Tested portrait and landscape|
|Game complete modal can only be closed using button and resets game|Pass|Tested portrait and landscape|
|High scores are updated correctly for all levels|Pass|Tested portrait and landscape|
|High scores are saved locally and can be seen when re-visiting the page|Pass|Tested portrait and landscape|
|Send us a message link takes user to Contact page|Pass|N/A|
|Facebook link takes user to Facebook app|Pass|N/A|
|Instagram link takes user to Instagram app|Pass|N/A|


|Requirement - *Contact page*|Result|Comments|
|-------|-------|-------|
|Layout appearance is correct (check for visibility of text, layout, no overlaps)|Pass|N/A|
|Input fields work correctly, validate and accept data|Pass|N/A|
|Send email button works|Pass|Triggers modal|
|Message sent confirmation modal appears and is displayed correctly|Pass|N/A|
|Message sent modal close button returns user to Home Page|Pass|N/A|
|Message sent is received by email set up|Pass|N/A|


|Requirement - *404 page*|Result|Comments|
|-------|-------|-------|
|Layout appearance is correct (check for visibility of text, layout, no overlaps)|Pass|N/A|
|Link in 404 message returns user to Home Page|Pass|N/A|
|Logo links back to Home Page|Pass|N/A|


### Desktop
|Requirement - *Home page*|Result|Comments|
|-------|-------|-------|
|Website loads|Pass|No delay|
|Basic instructions can be read - font size and layout|Pass|N/A|
|Detailed instructions button works|Pass|N/A|
|Detailed instructions show, font size and layout fit|Pass|N/A|
|High scores button works|Pass|N/A|
|High scores show, font size and layout fit|Pass|N/A|
|Letter select buttons start game|Pass|N/A|
|Letter select buttons trigger correct number of letters in word given|Pass|N/A|
|Letter select buttons start timer|Pass|N/A|
|Letter select buttons show current score|Pass|N/A|
|User is able to type words (retest)|Pass|N/A|
|Letter check works correctly|Pass|N/A|
|New word is generated when last one complete|Pass|N/A|
|Score increases with each correct word|Pass|N/A|
|Timer starts at 60 and counts down correctly|Pass|N/A|
|Game is ended when incorrect letter is typed|Pass|N/A|
|Score is given correctly|Pass|N/A|
|Game over modal appears|Pass|N/A|
|Game over modal can only be closed using button and resets game|Pass|N/A|
|Game is ended when 60 seconds has elapsed|Pass|N/A|
|Game complete modal appears|Pass|N/A|
|Score is given correctly|Pass|N/A|
|Game complete modal can only be closed using button and resets game|Pass|N/A|
|High scores are updated correctly for all levels|Pass|N/A|
|High scores are saved locally and can be seen when re-visiting the page|Pass|N/A|
|Send us a message link takes user to Contact page|Pass|N/A|
|Facebook link takes user to Facebook app|Pass|N/A|
|Instagram link takes user to Instagram app|Pass|N/A|

|Requirement - *Contact page*|Result|Comments|
|-------|-------|-------|
|Layout appearance is correct (check for visibility of text, layout, no overlaps)|Pass|N/A|
|Input fields work correctly, validate and accept data|Pass|N/A|
|Send email button works|Pass|Triggers modal|
|Message sent confirmation modal appears and is displayed correctly|Pass|N/A|
|Message sent modal close button returns user to Home Page|Pass|N/A|
|Message sent is received by email set up|Pass|N/A|

|Requirement - *404 page*|Result|Comments|
|-------|-------|-------|
|Layout appearance is correct (check for visibility of text, layout, no overlaps)|Pass|N/A|
|Link in 404 message returns user to Home Page|Pass|N/A|
|Logo links back to Home Page|Pass|N/A|


### Simulation of other devices

#### iPhone 12 Pro
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/2173f5c4-31cf-4068-a2ac-6a44ebed7fba)

#### iPad mini (portrait)
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/755fc49d-40ef-4de9-8100-54e93c42d78b)

#### iPad mini (landscape)

![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/aca02119-4f8b-4b75-8e49-358f7e1fb34d)

#### iPad air

![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/876f6aee-debd-40e1-b0c3-b70e1c50fdbd)

The most [commonly used Browsers in the UK](https://www.statista.com/statistics/421625/web-browser-market-share-in-the-united-kingdom-uk/#:~:text=The%20Chrome%20web%20browser%20from%20Google%20is%20the,the%208.53%20percent%20held%20by%20third%20place%20Edge.) are Chrome and Safari (on Apple devices), with Edge also having a significant market share. The Safari OS was used for the Tablet and Mobile testing above, and Chrome for the Desktop testing. Edge was also used during development and all functionality was confirmed to be working there also.

### User stories
|Story ID|Result|Comments|
|-------|-------|-------|
|US1|Pass|Achieves this function, users are able to practice typing and it encourages improvement|
|US2|Pass|Achieves this function, encouraging user to keep improving. Is clearly aimed at full keyboard use |
|US3|Pass|Accessible to many people and will help users to see how many words they can type per minute|
|US4|Pass|Fun practice that can be done in or out of work environment and improves user's typing by encouraging them to beat their high score|
|US5|Pass|Ability to retain high score locally is important for this|
|US6|Pass|Fun and easy to learn and access for students|
|US7|Pass?|The game has remained simple but it remains to be seen how popular it will be. It has had very positive feedback from testers, who report wanting to play it over and over|
|US8|TBC|For future measures, may require some future development to be completed to achieve this, such as posting to social media|
|US9|Pass|This was the best way to learn for me, the lessons gave me the structure but I really learnt by doing the project. I feel much more confident in the use of Javascript now and excited about what I could achieve with it!|
|US10|Pass|I was keen to use an API in this project and this has really helped me to understand some basics about how they work and give me a good grounding in future use of more complex APIs|

## Defect Tracking

- [countPress not resetting to 0](https://github.com/jenniewillson/speedy-fingers/issues/2)
- [Score not resetting](https://github.com/jenniewillson/speedy-fingers/issues/5)
- [Timer functionality not working](https://github.com/jenniewillson/speedy-fingers/issues/6)
- [Getting the last letter wrong acts as if it was correct](https://github.com/jenniewillson/speedy-fingers/issues/7)
- [Game continues to reset if you keep typing after game over](https://github.com/jenniewillson/speedy-fingers/issues/8)
- [Email sent modal triggered when mandatory fields not completed](https://github.com/jenniewillson/speedy-fingers/issues/10)

## Defects of Note

#### Of note due to length of time taken to resolve
- [Timer does not stop after a game](https://github.com/jenniewillson/speedy-fingers/issues/4)

This took a significant time to work through and various trial and error. Then was partially fixed and not fully and took a long time to work out why that was happening.

#### Of note due to key learning points
- [Duplicated ids](https://github.com/jenniewillson/speedy-fingers/issues/1)

This is an easy mistake to make but one I need to avoid in the future. It is also something I will need to check for going forward.

- [Fast typing triggers as incorrect spelling](https://github.com/jenniewillson/speedy-fingers/issues/3)

This was a good learning point about onKeyUp against onKeyDown and I would have a much better idea of what to use when in future development.

- [Modal can be closed by clicking background](https://github.com/jenniewillson/speedy-fingers/issues/9)

This was picked up by my mentor, I hadn't realised this would happen. It made a big difference to whether the functionality of the website worked. I will both be aware in future of the ability to close these modals in alternate ways but also important considerations around where exactly a function, such as reset game in this case, is triggered from. This also applied to the bug with sending messsage.

## Outstanding Defects
- [Given words box not large enough on portrait on tablet](https://github.com/jenniewillson/speedy-fingers/issues/11)

## Accessibility Testing

### Accessibility Audits

#### Contrast checker
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/03c00567-2b28-44fc-bdaa-ebfac3cf2e2b)

![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/5fdd29b0-b8e1-47f1-8b96-68735f71e1b6)


#### Lighthouse

##### index.html
###### Mobile
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/feddc1f9-22cc-4e27-ab57-047b49aaff38)
##### Desktop
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/adf1fc61-a6b3-417c-968d-b76136278080)

#### contact.html
###### Mobile
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/8e2b9769-c284-42fd-8a19-b41ad6e3df65)
##### Desktop
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/a37f4e9d-3210-4842-9348-7a677983e7a7)

#### axe DevTools

##### index.html
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/023d1e18-7082-4bec-b3a1-34907397d34f)

##### contact.html
![image](https://github.com/jenniewillson/speedy-fingers/assets/127458925/41939cce-ac3d-40b1-9cd8-7ce24941e544)


### Keyboard Navigation

[Keyboard navigation video](https://github.com/jenniewillson/speedy-fingers/assets/127458925/c2b74efb-deb5-464f-a3f3-907a86d6e2a9)

### Screen reader

[Screen reader video](https://github.com/jenniewillson/speedy-fingers/assets/127458925/6fb45622-d3a9-424a-b2b2-bbc102befa01)


