## Instructions for Use

### Perquisites
- [Node.js version 14 or higher](https://nodejs.org/en/download)
- [Mysql version 5.7 or higher](https://www.mysql.com/downloads/)
- [Git](https://git-scm.com/downloads)

### Installation process - for windows

1. **Clone the repository**:
``` sh
git clone https://github.com/yoirchalk1995/hair-by-yehudit-backend.git
``` 

2. **Navigate to directory**
``` sh
cd hair-by-yehudit-backend
```

3. **Install dependencies**
``` sh
npm i
```

4. **Create config folder in root of app**
``` sh
mkdir config
```

5. **Create .env file and set following variables:**
``` ini
JWT_SECRET=your_secret_key
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=hair_salon_db
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_SID=your_twilio_sid
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

6. **Run CREATE scripts included in hair-by-yehudit.sql in MySQL**

### Running Program

1. Make sure an instance of MySqlDB is running
2. Run app
``` sh
node index
```
3. Test API endpoints using API mocker such as postman.
