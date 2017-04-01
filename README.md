# LiteIT-Ang-Node-Mong-Passport

Used:
1. AngularJS (Front-end)
2. NodeJS (server-side)
3. MongoDB (database)
4. Passport (OAuth2 token authorize user)

RESTful app:
- watch the list of products
- leave a comments (only for authorized users)
- rate the product (only for authorized users)
- authorization -> receive a token
- all rates and comments with token

Usage:
1. Front-end
   Just copy to your  Apach server

2. Back-end
  - install MongoDB
  - run> mongod.exe --dbpath [YOUR_DRIVE]:\mongo\db -v
  - run> node createDb.js   - this will add products info in the DB
  - copy Back-end files in the Server folder
  - run> npm i
  - run> node server.js 
  
