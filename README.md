# APIFranchiseExample

# **Quick Tutorial: How to Run the Node.js App with MongoDB**

This tutorial will guide you step-by-step to run the Node.js application with MongoDB Atlas (cloud-hosted).

---

## **Prerequisites**

1. **Node.js**: Make sure **Node.js** is installed on your machine.
   - [Download Node.js](https://nodejs.org)

2. **MongoDB Atlas**:
   - Obtain your **MongoDB connection URI**. Add it to the `.env` file.

3. **Postman** (optional): To test HTTP requests.
   - [Download Postman](https://www.postman.com/)

---

## **Instructions to Run the App**

1. **Clone the Project**
```bash
git clone https://github.com/Kalugy/APIFranchiseExample.git
cd franchise-api

npm install
```

2. **Configure Environment Variables**
Add MongoDB credentials and other environment variables to your `.env` file.

3. **Run the Server**
```bash
npm run dev
```

4. **Test Endpoints in Postman**
Use Postman to test the API.
[Link to Postman](https://www.postman.com/technical-observer-90393005/testing-app-franchise)


5. **Optioonal run with docker**
```bash
docker-compose up --build

docker-compose down && docker-compose up --build

```


## Note
- **Task.md**: Show an overview of task with acceptation criteria.


