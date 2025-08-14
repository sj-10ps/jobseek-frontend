import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { configureStore } from '@reduxjs/toolkit';
import companySlice from './redux/companySlice';
import { Provider } from 'react-redux';
import userSlice from './redux/userSlice';
import loginslice from './redux/loginSclice';
import forgotslice from './redux/forgotSlice'
import passresetSlice from './redux/PassresetSlice';
import themeSlice from './redux/themeSlice'
import profileSlice from './redux/Profilefetch'
import  postfetchSlice  from './redux/Postslice';
import uploadpostSlice from './redux/PostingSlice'
import locationSlice from './redux/LocationSlice'
import uploadcommentreducer from './redux/Uploadcomment';
import fetchdetailsreducer from './redux/Personaldetailsslice';
import educationReducer from './redux/EducationSlice'
import experienceReducer from './redux/experiencePostSlice'
import skillsReducer from './redux/skillsPostSlice'
import certificatereducer from './redux/uploadcertification';
import deleterecordreducer from './redux/deleterecord'
import uploadcustomreducer from './redux/uploadcustomresumeSlice';
import fetchusercompaniesReducer from './redux/fetchuserandcompanies';
import followunfollowreducer from './redux/Followingslice';

import followedstatusreducer from './redux/followedstatus';
import fetchcompanyreducer from './redux/fetchcompanydetails';
import followingfollowercountreducer from './redux/Followingandfollowercount';
import uploadjobreducer from './redux/uploadjobslice';
import fetchalljobsreducer from './redux/fetchjobsslice';
import applyjobreducer from './redux/applyjobslice';
import viewapplicantreducer from './redux/viewapplicantSlice';
import selectapplicantsreducer from './redux/applicantsselection';
import fetchallpostsreducer from './redux/fetchallposts';
import messagereducer from './redux/Fetchmessages';
import fetchmessagingusersreducer from './redux/Messagingusers';


const store=configureStore({
  reducer:{
    company:companySlice,
    user:userSlice,
    login:loginslice,
    forgot:forgotslice,
    passreset:passresetSlice,
    theme:themeSlice,
    profile:profileSlice,
    postfetch:postfetchSlice,
    uploadpost:uploadpostSlice,
    location:locationSlice,
    uploadcomment:uploadcommentreducer ,
    userdetails:fetchdetailsreducer,
    education:educationReducer,
    experience:experienceReducer,
    skill:skillsReducer,
    certificate:certificatereducer,
    deleterecord:deleterecordreducer,
    uploadcustom:uploadcustomreducer,
    fetchusercompanies:fetchusercompaniesReducer,
    fetchcompany:fetchcompanyreducer,
    followunfollow:followunfollowreducer,
    followedstatus:followedstatusreducer,
    followingfollowercount:followingfollowercountreducer,
    uploadjob:uploadjobreducer,
    fetchjob:fetchalljobsreducer,
    applyjob:applyjobreducer,
    viewapplicant:viewapplicantreducer,
    selectapplicants:selectapplicantsreducer,
    fetchallposts:fetchallpostsreducer,
    messages:messagereducer,
    fetchmessagingusers:fetchmessagingusersreducer
    
  }
  
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
    <App />
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
