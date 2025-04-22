## Known Bugs | Errors | Problems

Due to the nature of this project, and it only being a MVP, there are several bugs, some significant, which haven't been fixed.

- Verification by SMS and voice message not working.
  - **Cause**: Twilio are know to limit users' accounts as they have done to me, preventing SMSs and voice messages from being sent to my account.
  - **Fix**: Convince them I am not fraudulent or more likely change provider
- When following link in verification email which POSTs to the verification route the link is opened in browser.
  - **Cause**: Use of JS and even CSS in email is very limited for security reasons. This prevents us from being able to run JS code to fix bug. 
  - **Fix**: Use a more sophisticated email service.
- Incorrect codes used when creating and updating objects.
  - **Cause**: When writing routes I was unaware of protocol conventions that the result status should be set to 201 when creating a new resource as apposed to the overly general 200. <br> Similarly I always return the 400 status even when a 423 would better fit the protocol.
  -**Fix**: Add status codes or change where necessary.
- Unprotected routes
  - **Cause**: All routes other than `/users/` and `/verifications/` are only supposed to be accessible to signed in and verified users. Although JWTs are only issued to a client on successful verification there is currently no middleware in place to check for token. <br> I would want this middleware to be applied globally other than to users and verifications routes. 
  - **Fix**: Create middleware to check for token. In setting up routes, apply middleware with filter that will exclude requests  users and verifications endpoints.
- Refactoring
  - **Cause**: Parts of the project, such as the index file are messy and hard to maintain, violating separations of concerns rule. Some pieces of code, such as DB queries are repeated unnecessarily.
  - **Fix**: Create startup functions to organize routes. Create reusable parametrized functions for DB queries. 