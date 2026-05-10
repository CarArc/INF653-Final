# INF653 Back End Web Development - Final Project Requirements

https://github.com/CarArc/INF653-Final.git

- PROJECT: You will build a Node.js REST API for US States data using both Express and MongoDB.
- DATA Requirement: A statesData.json file will be provided in Blackboard.
  - This file will provide MOST of the states data. There will be no need to store this data in MongoDB. You can access this data directly from the file by storing it in your project.
- DATA Requirement: You will need to create a MongoDB collection.
  - The collection should be represented with a States.js model file in your project.
  - As you learned, the model file should contain a [Mongoose Schema](https://mongoosejs.com/docs/guide.html) for the model.
  - The Schema will have a stateCode property which is:
    - a [string](https://mongoosejs.com/docs/schematypes.html)
    - required
    - Unique
  - The Schema will also a funfacts property which is
    - an [array](https://mongoosejs.com/docs/schematypes.html) that contains string data
  - In the collection, the stateCode property will contain state abbreviation values.
  - In the collection, the funfacts array will contain "fun facts" about the state.
  - You are not expected to provide fun facts for all 50 states. Instead, provide at **minimum of 3** fun facts for each of the following 5 states: (this site might be handy: [50states.com](https://www.50states.com/))
    - Kansas
    - Missouri
    - Oklahoma
    - Nebraska
    - Colorado
  - Look at your state.json file. The fun facts should not repeat what is in the file.
  - Please do not add fun facts to the following 5 states (until grading is complete):
    - New Hampshire
    - Rhode Island
    - Georgia
    - Arizona
    - Montana
- DEPLOYMENT Requirement: You will host your project with a free [glitch.com](https://glitch.com/) account
  - This allows for EASY deployment from Github
  - Glitch supports environment variables.
    - Do NOT include your .env file in your Github repository
    - After deploying to Glitch, you can edit your project at Glitch and add the environment variable(s) needed
- ROOT URLs:
  - Your root project URL should follow this pattern:

_https:/your-project-name.glitch.me/ -_ this will be a public HTML page

- 1. The REST API root URL should start the same, but end in /states/:

_https:/your-project-name.glitch.me/states/_

Additional API endpoints should be added to the /states/ route.

- 1. A catch all should be provided to serve a 404 status if the route does not exist.
     - If the client accepts "text/html", the response should be an HTML page.
     - If the client accepts "application/json", the response { "error": "404 Not Found" }

- Your REST API will provide responses to the following **GET** requests:

# Request: Response

[/states/](https://fantasy-humdrum-restaurant.glitch.me/states/) All state data returned

[/states/?contig=true](https://fantasy-humdrum-restaurant.glitch.me/states/?contig=true) All state data for contiguous states (Not AK or HI)

[/states/?contig=false](https://fantasy-humdrum-restaurant.glitch.me/states/?contig=false) All state data for non-contiguous states (AK, HI)

[/states/:state](https://fantasy-humdrum-restaurant.glitch.me/states/ks) All data for the state URL parameter

[/states/:state/funfact](https://fantasy-humdrum-restaurant.glitch.me/states/ks/funfact) A random fun fact for the state URL parameter

[/states/:state/capital](https://fantasy-humdrum-restaurant.glitch.me/states/ks/capital) { 'state': stateName, 'capital': capitalName }

[/states/:state/nickname](https://fantasy-humdrum-restaurant.glitch.me/states/ks/nickname) { 'state': stateName, 'nickname': nickname }

[/states/:state/population](https://fantasy-humdrum-restaurant.glitch.me/states/ks/population) { 'state': stateName, 'population': population }

[/states/:state/admission](https://fantasy-humdrum-restaurant.glitch.me/states/ks/admission) { 'state': stateName, 'admitted': admissionDate }

# NOTES on GET routes

- If you have a catch all for routes that do not exist in your server, you will not need to check if URL parameters exist. If they are entered wrong, the response will be a 404.
- The :state URL parameter above represents state codes like KS, NE, TX, NY, etc. Entering in full state names should result in a 404.
- Check the example application to verify the exact responses expected.
- Also _check the_ [_example application_](http://fantasy-humdrum-restaurant.glitch.me/) _for expected messages when required parameters are not received or no fun facts are found for a requested state_.
- Notice **contig** above is a query parameter where **:state** is a URL parameter.
- "All state data" means all state data from statesData.json merged with the fun facts stored in MongoDB.
- Your REST API will provide responses to the following **POST** request:

# Request: Response

/states/:state/funfact The result received from MongoDB

# Notes

- 1. The body of this POST request should contain a "**funfacts**" property providing an array providing one or more fun facts about the state. It should be possible to post all of your fun facts about a state with one POST request.
  - If the state already has some fun facts saved, submitting a POST request should add to those fun facts and not delete the pre-existing data.
  - We are not indexing fun facts or trying to determine if they already exist. Duplicate entries in the funfacts array should be avoided but are possible.

- Your REST API will provide responses to the following **PATCH** request:

# Request: Response (fields)

/states/:state/funfact The result received from MongoDB

# Note

- 1. The body of the PATCH submission MUST contain the index of the funfacts array element to replace and the new fun fact. Required request body properties: **index** and **funfact**
  - The index parameter value should not be zero-based. This will allow you to check if the index is sent: if (!index) etc. …afterwards, you should subtract 1 to adjust for the data array which is zero-based.

- Your REST API will provide responses to the following **DELETE** request:

# Request: Response (fields)

/states/:state/funfact The result received from MongoDB

# Note

- 1. The body of the DELETE submission MUST contain the index of the funfacts array element to remove. Required request body property: index
  - The index parameter value should not be zero-based. This will allow you to check if the index is sent: if (!index) etc. …afterwards, you should subtract 1 to adjust for the data array which is zero-based.

- Your project should have a GitHub repository. I recommend the easy deployment of Glitch, but it is manual last I checked. If you prefer a pipeline, you can use another Node.js host of your choice that provides one.

# Submit the following

- A link to your GitHub code repository (no code updates after the due date accepted)
- A link to your deployed project
- A one page PDF document discussing what challenges you faced while building your project.
- Automated testing - remember to not only run the tests but also submit your score.
- As with the midterm, the **automated tests** for this final project are the bulk of your grade. You can test as often as you want before submitting, **BUT** remember to submit your project on the automated testing page. You will need the id you generated when submitting your midterm. Contact me if you have forgotten / lost this necessary id - asap please. (An emergency email on the night this is due will not be read in time.)

✅ Check your requests and responses with Postman: <https://www.postman.com/downloads/>

# 🚀 For students who want an extra challenge (not required)

Much more is possible with this API concept if you want to implement it. The statesData.json file provides population data that could be ranked with responses that ascend or descend. Maybe allow users to request a list of states that were only admitted after or before a specific year. Many other ideas could be generated - go for it and share with the class when you complete your project!



# INF653 – Back-End Web Development I
## Final Project: Node.js REST API – Complete Reference for Cursor

**Instructor:** David Gray  
**Due Date:** May 13, 2026 at 9:59 PM PDT  

---

## Grading Breakdown

| Item | Weight |
|---|---|
| GitHub repo link (required to receive any grade) | Required |
| Deployed project link (required to receive any grade) | Required |
| One-page PDF (challenges faced) | 10% |
| 70 Automated tests | 90% |

---

## Submission Checklist

- [ ] GitHub repo link submitted in Blackboard (no commits after due date)
- [ ] Deployed project link submitted in Blackboard
- [ ] One-page PDF submitted in Blackboard
- [ ] REST API tested AND **score submitted** at automated tester (need midterm ID)
- [ ] Followed the submission graphic shown in Blackboard

**Automated tester:** [https://dazzling-snickerdoodle-777101.netlify.app/](https://dazzling-snickerdoodle-777101.netlify.app/)  
> ⚠️ You need the ID generated during the midterm to submit. Contact David Gray ASAP if lost.

---

## Project Overview

Build a **Node.js REST API** for US States data using **Express** and **MongoDB (Mongoose)**.

---

## Project Structure (Recommended)

```
project-root/
├── config/
│   └── dbConn.js          # MongoDB connection
├── controllers/
│   └── statesController.js
├── middleware/
│   └── verifyStates.js    # State code validation middleware
├── models/
│   ├── States.js          # Mongoose model
│   └── statesData.json    # Static data file (do not modify)
├── routes/
│   └── states.js
├── views/
│   └── 404.html
├── public/
│   └── index.html         # Root HTML page
├── server.js
├── .env                   # DO NOT commit to GitHub
└── .gitignore
```

---

## statesData.json — Field Reference

Each state object in the file contains these fields:

```json
{
  "state": "Alabama",
  "slug": "alabama",
  "code": "AL",
  "nickname": "Yellowhammer State",
  "website": "http://www.alabama.gov",
  "admission_date": "1819-12-14",
  "admission_number": 22,
  "capital_city": "Montgomery",
  "capital_url": "http://www.montgomeryal.gov",
  "population": 4833722,
  "population_rank": 23,
  "constitution_url": "...",
  "state_flag_url": "...",
  "state_seal_url": "...",
  "map_image_url": "...",
  "landscape_background_url": "...",
  "skyline_background_url": "...",
  "twitter_url": "...",
  "facebook_url": "..."
}
```

> Store this file in `models/statesData.json`. Do NOT alter it. Do NOT put it in MongoDB.  
> Note: URLs using `cdn.civil.services` are now 404 — that's expected and fine.

---

## MongoDB — States.js Model (Mongoose Schema)

```js
// models/States.js
const mongoose = require('mongoose');

const statesSchema = new mongoose.Schema({
  stateCode: {
    type: String,
    required: true,
    unique: true
  },
  funfacts: [String]
});

module.exports = mongoose.model('State', statesSchema);
```

### Required Fun Facts (minimum 3 each — seed before submitting):

| State | Code |
|---|---|
| Kansas | KS |
| Missouri | MO |
| Oklahoma | OK |
| Nebraska | NE |
| Colorado | CO |

> Fun facts must NOT repeat what's already in statesData.json.  
> Resource: [50states.com](https://www.50states.com)

### Do NOT add fun facts to these states (until grading is complete):
- New Hampshire (NH)
- Rhode Island (RI)
- Georgia (GA)
- Arizona (AZ)
- Montana (MT)

---

## Environment Variables (.env)

```
DATABASE_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
PORT=3500
```

> ⚠️ Add `.env` to `.gitignore`. Never commit it.  
> After deploying, set these variables in your host's dashboard (Render/Vercel environment settings).

---

## Deployment

> ⚠️ **Glitch.com no longer supports hosting these projects.**  
> Use **[Render.com](https://render.com)** or **[Vercel.com](https://vercel.com)** — or any Node.js-compatible host.

### URL Structure

| URL | Description |
|---|---|
| `https://your-project.onrender.com/` | Public HTML page |
| `https://your-project.onrender.com/states/` | REST API root |

---

## verifyStates Middleware

Create this middleware to validate the `:state` URL parameter on all state routes.

```js
// middleware/verifyStates.js
const statesData = require('../models/statesData.json');

const verifyStates = (req, res, next) => {
  const stateCodes = statesData.map(s => s.code); // ['AL', 'AK', ...]
  const stateCode = req.params.state.toUpperCase(); // handle lowercase/mixed input

  if (!stateCodes.includes(stateCode)) {
    return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
  }

  req.code = stateCode; // attach verified code to request
  next();
};

module.exports = verifyStates;
```

> Apply this middleware to any route using `:state`. Full state names → 404.  
> State codes in statesData.json are uppercase — always call `.toUpperCase()` on input.

---

## Express Parameter Types — Quick Reference

| Type | Example URL | How to Access |
|---|---|---|
| Body (POST/PATCH/DELETE) | — | `req.body.param_name` |
| URL param | `/states/:state` | `req.params.state` |
| Query param | `/states?contig=true` | `req.query.contig` |

Destructuring syntax also works: `const { state } = req.params`

---

## CORS

The automated testing web app will be blocked by CORS. Configure CORS to allow all origins:

```js
const cors = require('cors');
app.use(cors()); // allows all origins
```

> CORS won't block Postman, but it WILL block the automated tester. This is a common failure point.

---

## 404 Catch-All Handler

Must be the last route defined in server.js:

```js
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});
```

---

## API Endpoints

### GET Requests

| Endpoint | Response |
|---|---|
| `GET /states/` | All state data (statesData.json merged with MongoDB funfacts) |
| `GET /states/?contig=true` | All contiguous states (excludes AK and HI) |
| `GET /states/?contig=false` | Non-contiguous states only (AK and HI) |
| `GET /states/:state` | All data for the given state |
| `GET /states/:state/funfact` | One **random** fun fact for the state |
| `GET /states/:state/capital` | `{ "state": "State Name", "capital": "capital_city value" }` |
| `GET /states/:state/nickname` | `{ "state": "State Name", "nickname": "nickname value" }` |
| `GET /states/:state/population` | `{ "state": "State Name", "population": "population value" }` |
| `GET /states/:state/admission` | `{ "state": "State Name", "admitted": "admission_date value" }` |

**Key field mappings from statesData.json:**
- capital → `capital_city`
- admission → `admission_date`
- state name → `state`
- state code → `code`

**"All state data"** = every state from statesData.json, with `funfacts` array merged in from MongoDB where it exists.

---

### POST `/states/:state/funfact`

- **Body:** `{ "funfacts": ["fact one", "fact two"] }` — must be an array
- **Behavior:** Appends to existing funfacts, does not overwrite
- **Response:** The updated MongoDB document

---

### PATCH `/states/:state/funfact`

- **Body:** `{ "index": 1, "funfact": "replacement string" }`
- **Index is 1-based** (not zero-based). Use `if (!index)` to check existence, then subtract 1 for array access.
- **Response:** The updated MongoDB document

---

### DELETE `/states/:state/funfact`

- **Body:** `{ "index": 1 }`
- **Index is 1-based** (not zero-based). Use `if (!index)` to check existence, then subtract 1 for array access.
- **Response:** The updated MongoDB document

---

## Testing Tools

- **Postman:** [postman.com/downloads](https://www.postman.com/downloads/) — industry standard, not blocked by CORS
- **Thunder Client:** VS Code extension, also good
- **Browser:** Works for GET requests. Use Firefox (Developer Edition) for better JSON formatting.
- **Automated tester:** Run often, but only **submit once** when ready. Submitting = your grade.

---

## Notes

- The automated tests are **90% of the grade** — 70 tests total.
- Check the example application linked in Blackboard for exact error message wording.
- You can run the automated tests as many times as you want before submitting.