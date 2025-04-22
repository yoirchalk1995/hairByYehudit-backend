## API endpoints
Ordered alphabetically

### /appointments - used to book and manage appointments

#### POST 
- **Description** - used to book an appointment whilst checking for service provider availability and previously booked appointments.
- **Request body**:

|Field       |Type    |Required|Description             | Validation & Constraints                   |
|------------|--------|--------|------------------------|--------------------------------------------|
| userId     | int    | yes    | id of booking customer | Must be +ve integer. <br> Must exist in DB |
| serviceId  | int    | yes    | id of service being booked|  As above|
| date| string | yes| date of booking| Must be in format "yyyy-mm-dd" <br> Must be valid future date
|startTime| string| yes| start time of booking| Must be in format "hh:mm" <br> Appointment must not end on different day|


**Example request body**
  ```json
  userId: 123
  serviceId: 21
  date: "2025-09-24"
  startTime: "20:25"
  ```

- **Response Codes**
  - `200` - OK. Appointment object will be returned in response body.
  - `400` - Invalid body. Validation failed or otherwise invalid. 
  - `404` - Not found. User or service wih given ID not found
  - `409` - Contradiction. Service provider unavailable or appointment previously booked

#### GET
- **Description** - get all appointments
- **Future enhancements** - Include support for query params for pagination etc.

#### PATCH - `/:id` 
- **Description** - used to cancel appointment by programmatically setting appointment_status to canceled. <br>To alter an appointment, the client must first use this method to cancel previous appointment and use POST method to request new appointment.
- **Request body**: **NONE**
- **Result codes**
  - `200` OK. Appointment canceled. Altered object will be returned in result body.
  - `409` Contradiction. Appointment already met or canceled.
  - `404` Not found. Appointment with given ID not found in DB


### /availability - used by service provider to mark slots as unavailable

#### POST 
- **Description** - used by service provider to mark times at which they are not available.
- **Request body**:

|Field       |Type    |Required|Description             | Validation & Constraints                   |
|------------|--------|--------|------------------------|--------------------------------------------|
| Date | String| yes| date of slot to be <br> marked as unavailable| Must be in format "yyyy-mm-dd" <br> Must be valid future date|
| startTime| String| yes| start time of slot to be <br> marked as unavailable| Must be in format "hh:mm"|
| endTime | String | yes| end time thereof | As above
| isAvailable | Bool | yes| time slots availability | True \| False |

**Example request body**
  ```json
  date: "2025-09-24"
  startTime: "20:25"
  endTime: "21:00"
  isAvailable: true
  ```
- **Authentication** - client must provide valid JWT with isAdmin field set to true
  - Token must be provided in custom `x-auth-token` header
  - Example JWT
  ``` json
  {
    "isAdmin": true,
    ...
  }
  ```
- **Result codes**
  -`200` - OK. Session marked as unavailable.
  -`401` - Unauthorized. Token is lacking or could not be validated.
  -`403` - Forbidden. Valid token provided but isAdmin not true.

- **Future Feature** - **Must** add patch route to allow service provider mark session originally marked unavailable as available.

### Also created routes for user verification, for service providers to list services they provide, and for users to sign themselves up as customers.

