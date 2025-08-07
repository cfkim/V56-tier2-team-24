# Beacon ☀️
Supporting your loved ones in every step of the surgery process, made easier.
## 💬 Purpose
This app displays the status of ongoing surgeries from check-in to recovery so that patient family/friends can be in the loop at every step, from anywhere --- not just the waiting room.

## ⚙️ Major Functions
- Surgical Team Members can update the status of ongoing surgeries (i.e. Checked-in, In-progress, etc.)
- Guests can view a status board of all ongoing operations without needing to create an account
- Patient information is protected, to ensure anonymity and HIPAA compliance (guests for the patient will know their patient #, which is displayed on the board)

## 📦 Dependencies

This project follows a typical MERN stack setup:

- **MongoDB** – Database
	*The database for the live website is hosted on MongoDB Atlas*
- **Express** – Back-end framework
- **React (with Vite)** – Front-end library + build tool
- **Node.js** – runs the Express server

### Dependencies

    @tailwindcss/vite@4.1.11
    @tanstack/react-query-devtools@5.83.0
    @tanstack/react-query@5.83.0
    axios@1.11.0
    bcrypt@6.0.0
    cors@2.8.5
    express@5.1.0
    mongoose@8.16.5
    react-dom@19.1.0
    react-router-dom@7.7.1
    react@19.1.0
    tailwindcss@4.1.11

## 🛠️ How to Run the Project
View the live site [here]
1. Prerequisites
Node.js version **18.17.0** or higher

2. Installation -- within each folder (server and client)
```bash
npm install
# or
yarn install
```

3. Set up your Environment Variables

- `server/.env` > `MONGO_URI=`  
  You can set up a Mongo database **locally** or through the cloud with **MongoDB Atlas**. Change the `MONGO_URI` variable in the `server/.env` file accordingly.

- `server/.env` > `APP_ORIGIN=`  
  Ensure that the `APP_ORIGIN` variable is set to the URL of your running client (i.e. `APP_ORIGIN=http://localhost:5173`).

- `client/.env` > `VITE_API_URL=`  
  Ensure that the `VITE_API_URL` variable is set to the URL where you are running the server (i.e. `VITE_API_URL=http://localhost:4004`).


4. Start/Run the project locally  
In separate terminals, to run back-end and front-end simultaneously:

`client` folder
```bash
npm run dev
```
`server` folder
```bash
npm run devStart
```
View the now locally hosted website at your client url (i.e. https://localhost:5173)

5. Deployment
Rails or Render are popular deployment options since it has the ability to host all three main parts of an application (front-end, back-end, and database)

## 🧑‍💻 Our Team
-   Mikala Franks (Scrum Master):  [GitHub](https://github.com/mikalafranks)  /  [LinkedIn](https://www.linkedin.com/in/mikala-franks-8b21b52a3/)
    
-   Viral Barot (Product Owner):  [LinkedIn](https://www.linkedin.com/in/viral-barot-mba/)
    
-   Khushali Parekh (UX/UI Designer):  [GitHub](https://github.com/Khush413)  /  [LinkedIn](https://www.linkedin.com/in/khushali-parekh/)
    
-   Vartika Patel (UX/UI Designer):  [GitHub](https://github.com/vartika99)  /  [LinkedIn](https://www.linkedin.com/in/vartikapatel/)
    
-   Rel Guzman (Web Developer)  [Github](https://github.com/rgap)  /  [LinkedIn](https://www.linkedin.com/in/relguzman/)
    
-   Christine Kim (Web Developer)  [Github](https://github.com/cfkim)  /  [LinkedIn](https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav)
    
-   Wanying Liu (Web Developer)  [GitHub](https://github.com/TheClaireLiu)  /  [LinkedIn](https://www.linkedin.com/in/wanying--liu/)
    
-   Hyun Woo Kim (Web Developer)  [GitHub](https://github.com/hynwkm)  /  [LinkedIn](https://www.linkedin.com/in/hyunwoo-kim/)
## 🔗 Links/References
-   [Team Project Ideas](https://github.com/chingu-voyages/V56-tier2-team-24/blob/develop/docs/team_project_ideas.md)
-   [Team Decision Log](https://github.com/chingu-voyages/V56-tier2-team-24/blob/develop/docs/team_decision_log.md)
- [Keys to a well written README](https://tinyurl.com/yk3wubft)
