import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('Mgo+DSMBaFt/QHFqVVhkW1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF9jTX5Ud0ZnXXxZeHBSQA==;Mgo+DSMBPh8sVXJ0S0d+XE9AcVRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3xTckVkWHxadHdSTmVVVw==;ORg4AjUWIQA/Gnt2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkFjXn5ddHBWQWhbUUI=;NjA5NzEyQDMyMzAyZTMxMmUzMFptTmFqNk1aalJzOWZvVzAybktkRmR1ek51ZWlXUFJBNFBjNG9ObWZjY0k9;NjA5NzEzQDMyMzAyZTMxMmUzMGl4VHU5cERyd052byttU2Jyc1ZrdGFoSTBkYXRham8zcUxkM2JQeUsrQ0k9;NRAiBiAaIQQuGjN/V0Z+XU9EaFtFVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdEVnWXhfc3BRRWdVU0Nw;NjA5NzE1QDMyMzAyZTMxMmUzMFV0Z0xhYVJFSmhxcEJ6TFBXL0hyeDBscTMxOXVpT0ExblhYaS92VEd6S1k9;NjA5NzE2QDMyMzAyZTMxMmUzMEU5b0xPRElhdXl1NUtOY1FwbVJ6WkxtakppOTc0SFNSOC8wYXgxWW5ZMXM9;Mgo+DSMBMAY9C3t2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkFjXn5ddHBWQWlUWEI=;NjA5NzE4QDMyMzAyZTMxMmUzMEl6eHlBcWVnMTVKZDRVNVFsNmQrTkFrTml1eUZNTzlqLytkMGtERmNxb0E9;NjA5NzE5QDMyMzAyZTMxMmUzMEFxbUpOZFF5L3lDUi9hbkYwcnBMWSt1WnNMN2dqcmNrb2hSTlJzMjRLbDA9');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
