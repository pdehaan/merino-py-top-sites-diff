# MERINO-PY-TOP-SITES-DIFF

Attempts to diff changes to top_picks.json.

## USAGE
```sh
npm start
```

### SAMPLE OUTPUT
```sh
Comparing https://raw.githubusercontent.com/mozilla-services/merino-py/main/dev/top_picks.json...https://raw.githubusercontent.com/mozilla-services/merino-py/chore-update-top-picks-03-10-2023/dev/top_picks.json
  top_picks:added ["16personalities","abcya","arizona","asu","atptour","bedbathandbeyond","blooket","brainpop","careersafeonline","carters","cengage","code","collegeboard","commonlit","converse","deltamath","desmos","ebird","essentiallysports","fantasypros","fubo","gapfactory","geoguessr","getepic","giantfreakinrobot","gimkit","goal","hudl","i-ready","icevonline","illuminateed","imaginelearning","instructure","investopedia","iscorp","jang","k12","kahoot","khanacademy","kidsa-z","kleinisd","kooora","lanebryant","lego","linternaute","mathplayground","mheducation","mobymax","myon","naver","nespresso","nflshop","nitrotype","noredink","parentsquare","pathofexile","pgatour","pro-football-reference","prodigygame","quill","quizizz","readingplus","readtheory","savvasrealize","scitechdaily","screencastify","skysports","smore","space","spirithalloween","sportingnews","teacherease","theathletic","thespec","typing","uniqlo","usg","vhlcentral","whiskeyriff","wordreference","zearn"] +0ms
  top_picks:deleted ["aljazeera","americansongwriter","as","ashleystewart","asos","athenahealth","bcit","biblehub","carleton","chicos","clutchpoints","consumerreports","creativefabrica","eatthis","enterprise","eventticketscenter","ew","finishline","formula1","gettyimages","getyourguide","grubhub","hindustantimes","huntington","icy-veins","inc","inkbunny","landsend","linktr","livescience","marca","meijer","mlive","mun","myheritage","napaonline","nba","neimanmarcus","newsbreak","newspapers","nj","outkick","pagesix","polygon","programme-tv","psychologytoday","quillbot","sageone","sciencedirect","slate","stockcharts","thedailymeal","thespruce","travelocity","uoguelph","vanguard","viator","wealthsimple","whatismyip","wlu","yesbackpage","yourbump"] +0ms
 {
-  title: "Efficient computer vision | MIT - Massachusetts Institute of Technology"
+  title: "AI in the eye of the beholder | MIT - Massachusetts Institute of Technology"
 }
```

## DEBUGGING
```sh
npm run debug
```

### SAMPLE OUTPUT
```sh
Comparing https://raw.githubusercontent.com/mozilla-services/merino-py/main/dev/top_picks.json...https://raw.githubusercontent.com/mozilla-services/merino-py/chore-update-top-picks-03-10-2023/dev/top_picks.json

  top_picks:added ["16personalities","abcya","arizona","asu","atptour","bedbathandbeyond","blooket","brainpop","careersafeonline","carters","cengage","code","collegeboard","commonlit","converse","deltamath","desmos","ebird","essentiallysports","fantasypros","fubo","gapfactory","geoguessr","getepic","giantfreakinrobot","gimkit","goal","hudl","i-ready","icevonline","illuminateed","imaginelearning","instructure","investopedia","iscorp","jang","k12","kahoot","khanacademy","kidsa-z","kleinisd","kooora","lanebryant","lego","linternaute","mathplayground","mheducation","mobymax","myon","naver","nespresso","nflshop","nitrotype","noredink","parentsquare","pathofexile","pgatour","pro-football-reference","prodigygame","quill","quizizz","readingplus","readtheory","savvasrealize","scitechdaily","screencastify","skysports","smore","space","spirithalloween","sportingnews","teacherease","theathletic","thespec","typing","uniqlo","usg","vhlcentral","whiskeyriff","wordreference","zearn"] +0ms

  top_picks:deleted ["aljazeera","americansongwriter","as","ashleystewart","asos","athenahealth","bcit","biblehub","carleton","chicos","clutchpoints","consumerreports","creativefabrica","eatthis","enterprise","eventticketscenter","ew","finishline","formula1","gettyimages","getyourguide","grubhub","hindustantimes","huntington","icy-veins","inc","inkbunny","landsend","linktr","livescience","marca","meijer","mlive","mun","myheritage","napaonline","nba","neimanmarcus","newsbreak","newspapers","nj","outkick","pagesix","polygon","programme-tv","psychologytoday","quillbot","sageone","sciencedirect","slate","stockcharts","thedailymeal","thespruce","travelocity","uoguelph","vanguard","viator","wealthsimple","whatismyip","wlu","yesbackpage","yourbump"] +0ms
 
 {
-  title: "Efficient computer vision | MIT - Massachusetts Institute of Technology"
+  title: "AI in the eye of the beholder | MIT - Massachusetts Institute of Technology"
 }

 {
-  title: "All Your Back to School Needs In One Place"
+  title: "Walmart.com | Save Money. Live Better"
 }
```

## UNIQUE CATEGORIES
```sh
npm run categories
```

### SAMPLE OUTPUT
```js
[
  "Advertisements",
  "Alcohol",
  "Arts & Crafts",
  ...
  "Weather"
]
```
