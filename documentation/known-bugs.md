## Known Bugs | Errors | Problems

Due to the nature of this project, there are several bugs, some significant, which haven't been fixed.

- Verification by SMS and voice message not working.
  - **Cause**: Twilio are know to limit users' accounts as they have done to me, preventing SMSs and voice messages from being sent to my account.
  - **Fix**: Convince them I am not fraudulent or more likely change provider
- When following link in verification email which POSTs to the verification route the link is opened in browser.
  - **Cause**: Use of JS and even CSS in email is very limited for security reasons. This prevents us from being able to run JS code to fix bug. 
  - **Fix**: Use a more sophisticated email service.
- Incorrect codes used when creating and updating objects.
  - **Cause**: When writing routes I was unaware of protocol conventions that the result status should be set to 201 when creating a new resource as apposed to the overly general 200. <br> Similarly I always return the 400 status even when a 423 would better fit the protocol.
  -**Fix**: Add status codes or change where necessary