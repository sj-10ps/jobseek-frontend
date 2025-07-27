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
    deleterecord:deleterecordreducer
    
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
