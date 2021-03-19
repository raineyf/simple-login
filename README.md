# simple-login

## Description

This is a simple login and signup form built with Express.js.

This is meant solely to serve as an example of an accessible login form with 2 simple POST methods for logging in and signing up. It should not be viewed as a model for secure logins. The server does no password hashing, minimal validation and stores users directly in the JavaScript. For those reasons, it is not currently published anywhere.

## Getting Started

Simply download the ZIP, unzip it and navigate to the unzipped repository in your terminal. Run `npm start` (requires Node.js version 8+). Navigate to `localhost:3000` in your browser.

On the login page, you can submit the username "level" and password "Access123" to login.

On the signup page, you can submit a new username (minimum length of 5 characters) and password (minimum of 1 uppercase letter, 1 lowercase letter and 1 number) to create a new user. Upon successful signup, you can use this login on the login page.

You will be directed to the success page upon successful login.

## Accessibility

Tested with axe and WAVE: 0 issues, 0 errors, 0 warnings.

Tested with VoiceOver on MacOS in Firefox, Safari and Chrome. No significant issues found, save for some browser inconsistencies.

Skip Link visible when focused using keyboard navigation.

Input error messaging displayed when form submit issues. Error messaging is referenced in the respective `<input>`s `aria-describedby` attribute.

Upon submit error, focus is placed on first field with an error.

Upon successful submit, the user is taken to the success page (for logins) or alerted of account creation (for signups).

## Security

As the intent of this project is to showcase accessibility, security is not as robust as it would be if deployed (note: security and accessibility are not mutually exclusive, but security was not prioritized here).

On the signup form, client-side validations are used to make sure that the username is at least 5 characters long and the password has at least 1 uppercase letter, lowercase letter and number. Server-side validations are used to check if the username already exists.

On the login form, server-side validations are used to check for the existence of a username and its matching password.

For accessibility purposes, I chose not to mask the password fields as the user typed, but in a deployed implementation, I would mask this and add a button to expose the password as the user needs.
