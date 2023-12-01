# Hidle

This is a wordle variation that allows you to hide a message and share it with people. The name Hidle is a word play of "Hide" with the customary suffix "-dle".

Made using React, Typescript, and Tailwind.

[**Try it out!**](https://hidle.vercel.app/)

## Development

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$> cd hidle
$> npm install
$> npm run start
```

### How to add new random words?

- Update the `VALID_GUESSES` array in [src/constants/validGuesses.ts](src/constants/validGuesses.ts) to include the new words.

### How can I add usage tracking?

This repository includes support for Google Analytics or [Plausible Analytics](https://plausible.io), but, by default, this is disabled.

To enable Google Analytics:

- Create a Google Analytics 4 property and obtain the measurement ID (of the format `G-XXXXXXXXXX`)
- In [.env](.env), add `REACT_APP_GOOGLE_MEASUREMENT_ID=G-XXXXXXXXXX`

Keep in mind that your region might have legislation about obtaining a user's consent before enabling trackers. This is up to downstream repos to implement.

To enable Plausible Analytics:

- Create a new website with Plausible Analytics with a given domain, e.g. `example.app`
- In [.env](.env), add `REACT_APP_PLAUSIBLE_DOMAIN=example.app`
