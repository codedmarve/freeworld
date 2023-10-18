### Description

Imagine a Single Page Web Application which is able to record spoken text as audio (mobile and desktop) and replay the recorded audio. The once recorded audio should be sent together with the email address of the user to a REST-API backend.
The backend API receives the audio and asynchronously processes it by an algorithm which corrects potential (grammatical) errors and produces a corrected audio. Once the audio is corrected, the backend API sends it back to the frontend, where it is displayed and can be played back by the user.

## List of tech that could be used

React: Single Page Web aplication
axios: To fetch and send the audio to the database
firebase: To store our audio

### npm install

Run `npm install` to install dependencies

### `npm start`

Runs the app in the development mode.

### Tech Stack

React

### Step 1:

I would create a custom hook to record the audio in blobs

I’ll add a button to start recording and stop recording the speech.
I'll also create a submit button to make a POST request of audio to the data to the database (firebase).
I would also use the BEM naming convention and also try not to use inline css for performance and caching reasons

### Step 2:

I would create an input field to collect the email address and validate with Formik and Yup

### Step 3:

I would use axios to communicate with the backend and send the audio for sanitization, asynchronously. And display a loader/spinner to the user while sanitizing. And send the audio back to the frontend for users to access it, using use effect.
