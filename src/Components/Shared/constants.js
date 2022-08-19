export const errorConstants = {
   CLASS_NAME : "Name of the class is required",
   START_TIME : "Start Time is required",
   END_TIME: "End Time is required",
   TYPE_OF_CLASS : "Please select the type of class",
   DESCRIPTION : "Description is required",
   SORT_CODE : "Sort code is required",
   ACCOUNT_NO : "Account number is required",
   PER_CLASS : "Per Class is required",
   MONTHLY_SUBSCRIPTION : "Monthly Subscription is required",
   ADDRESS : "Address is required",
   COUNTRY : "Country is required",
   TIMEZONE : "Time zone is required",
   LEVEL : "Level of Instructor is required",
   PHONE_NUMBER:"Phone number is required",
}

export const passwordErrors = {
   PASSWORD : "Please enter your Password",
   CONFIRM_PASSWORD : 'Please Confirm your Password',
   PASSWORD_INVALID : "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
   PASSWORDS_UNMATCHED : "Password and Confirm Password doesn't match",
   OLD_NEW_SAME : "Old Password and New Password must not be same",
}

export const emailErrors = {
   EMAIL : "Email is required",
   INVALID_EMAIL : "Email is invalid",
}

export const nameErrors = {
   FIRST_NAME : "First Name is required",
   LAST_NAME : "Last Name is required",
   USERNAME : "User Name is required",
}

export const typeOptions = [
   {value:'body', text:'Body Weights'},
   {value:'core', text:'Core'},
   {value:'high', text:'High Intensity'},
   {value:'interval', text:'Interval'},
   {value:'pilates', text:'Pilates'},
   {value:'strength', text:'Strength'},
   {value:'sweat', text:'Sweat'},
   {value:'spin', text:'Spin'},
   {value:'sculpt', text:'Sculpt'},
   {value:'yoga', text:'Yoga'}
 ]
 
 export const levels = [
   {value:'1', text:'Beginner'},
   {value:'2', text:'Intermediate'},
   {value:'3', text:'Expert'}
 ]

 export const roles = {
    TRAINER_ROLE_ID: 2,
    USER_ROLE_ID: 3
 }