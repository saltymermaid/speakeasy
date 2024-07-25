SpeakEasy is a simple React app to help my nephew with his reading drills. The structure of the `words.json` file is key to the organization of the app - words and sections can be added for additional drills. For example, if you wanted to drill the difference between "a" and "ai", you would structure them both under the same top-level category and mid-level category:

```
{ 
  "Long and Short Vowels": {
    "a": {
      "a": ["ad", "an"],
      "ai": ["aid", "ail"]
    },
    "e": {
      "e": ["bed", "den"],
      "ee": ["bee", "deep"]
    }
  }
}
```

### Running locally

`npm start` runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Deployment

If you're using gh pages to host the app (like I am), use `npm run deploy` to update the ghpages branch.
