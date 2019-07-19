# Koji React OAuth Scaffold
Welcome to your new Koji React OAuth Project! 🎉
<br />
Use this scaffold <b>if you want to build a small app in less time</b> that needs user to sign in with the help of Google and Facebook.

> **NOTE:** This scaffold needs a lot of API KEYS to start and get things working properly. So, please read the documentation carefully.

## Where to go
1. Your Frontend code is located at `/frontend/pages` and there is an example page at [HomePage](#~/frontend/pages/HomePage/index.js)
2. Your Backend API code is located at `/backend/src/routes` and the entrypoint for the backend is `/backend/src/index.js`.
3. 3 Visual Customization Controls (VCCs) have been added to the template. These can be quickly modified to your applicaiton.
    - [Colors](#~/.koji/customization/colors.json!visual) - Change the text color, background color, & link text color.
    - [Images](#~/.koji/customization/images.json!visual) - Change the spinning icon.
    - [Strings](#~/.koji/customization/strings.json!visual) - Change the page content text & link text.
4. `.sample.env` file is provided. Rename it to `.env` and fill the credentials asked.

## Steps to make this scaffold work

1. Sign up on [Stein](https://steinhq.com).
2. Clone [this Google Spreadsheet](https://docs.google.com/spreadsheets/d/1J8dszZEeAuY0eL8XBRrKJ4Z-vPnv4JVerRcsTIbdIq0/edit?usp=sharing) on your account. [Let the sheet name be `User`]
3. Go to Stein dashboard, paste your Google Spreadsheet link.
4. Copy the API Link that Stein provides. Add authentication credentials for a secure database.
5. `.sample.env` file is provided. Rename it to `.env`.
6. Make `STEIN_STORE` env variable equal to the API Link provided by Stein.
7. If you added Stein Authentication, make sure you fill in the `STEIN_STORE_USERNAME` and `STEIN_STORE_PASSWORD`.

**So now, you have successfully connected to the database!** Now it is the time to set up Facebook and Google Developer App.

8. Visit [https://developers.facebook.com](https://developers.facebook.com) and create a new App. Name it anything.
9. Copy the FB App Id and FB App Secret. [Learn more](https://developers.facebook.com/docs)
10. Change the `fbAppId` string in the Koji VCC to the FB App Id. Also keep the FB App Id equal to the `FB_APP_ID` env variable.
11. Keep the FB App Secret equal to the `FB_APP_SECRET` env variable.

Now that you have setup Facebook OAuth, time to setup the Google OAuth!

12. Go to [https://console.developers.google.com](https://console.developers.google.com) and create a new app, name it anything.
13. Click Credentials tab from the Sidebar. > Click `Create Credentials` > `OAuth client ID`. Also fill in the consent screen information.
14. Copy the Google Client Id and Google Client Secret.
15. Change the `googleClientId` string in the Koji VCC to the Google Client Id. Also keep the Google Client Id equal to the `GOOGLE_CLIENT_ID` env variable.
16. Keep the Google Client Secret equal to the `GOOGLE_ACCESS_KEY` env variable.

I understand that was quite a lengthy process. But, now it's all set up!

## Any Questions?

Join our [Koji Discord Server](https://discord.gg/eQuMJF6) for any software questions or bugs regarding this template.   
Any ideas/issues can be DM'ed to [the template creator](https://twitter.com/kumar_abhirup).
