### Installation

To install the app run the following command
npm install --legacy-peer-deps

This will download the app and all its dependencies

### How to Use

1. To start the app run the command npm start in both the mern_backend & mern_frontend directories

2. The will then load once the server and client are running the react app will display

3. The user will be meet with the home page where message will tell them to book a appointment with the medical center

4. once thats done the user can click the view appointments button and then they will navigate to the list of appointments
   on the user page.

5. For the Admin the if they wish to access the admin dashboard then the will click the admin login button which will take them to the login page.

6.Once there they will are on the login page they will enter there details and into the input boxes and a default admin account will be
created.

7. Once the default account is created they will navigate to the admin dashboard.

8.Should they wish to create another account they can proceed to the register page by clicking the create a new admin button

9. The admin will then be taken to the register page and they can fill in there details in the input box and click the register
   button to create a new admin they then will be taken to the admin dashboard.

10. They then can input the appointment info in the appointment booking table once done they click submit and then the appointment
    will be displayed in there dashboard.

11. Should they wish to edit or delete a appointment they just need to click the edit or delete buttons.If they click the
    edit button an edit box will display and they user can then edit the appointment should they wish to cancel the editing process then they need to click the cancel button.

# Modification

Should the user wish to modify the uri to like the app to another database they simply need to go into the server.js file and add there
date base connection string into the uri variable.

# Security

By using JWT I have made use of the encrypted token that provides the admin with exclusive access to the user data in the
admin dashboard.Should the anyone hack into the admin page without the jwt token they would be removed instantly.

# Deployment

I have decided to deploy the front and backend together as it makes maintenance and operating easier.

Everything will be loaded to github as heroku no longer offers a free
