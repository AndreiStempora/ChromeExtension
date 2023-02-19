import helper from "./helpers.js";

const submitButton = document.getElementById('form-submit');

submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    //get input values
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // add them to data form
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);

    // send fetch request
    const response = await helper.customFetch("https://app.novosteer.me/api/user/auth/login", data)

    if(response.status === 'error' && response.message === 'Invalid credentials!'){
        document.querySelector('.error').style.display = 'block';
        return;
    }
    

    
    if(response.status === 'ok'){
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.success').style.display = 'block';

        await chrome.storage.local.set({token: response?.token, name: `${response?.profile?.first_name} ${response?.profile?.last_name}`});

        const data = new FormData();
        data.append('token', response?.token);

        const response2 = await helper.customFetch("https://app.novosteer.me/api/capture/dealerships", data);
        
            if(response2.status === 'error' && response2.module === "users-addon-2fa"){
                const response3 = await helper.customFetch(`${response2.call}`, data);
                console.log(response3);

                await chrome.storage.local.set({twoFaOptions: [response3.services]});
                helper.moveToLocation('common/twofaSelect.html')
            } else if(response2.status === 'ok'){
                helper.moveToLocation('logout.html')
            }
            return;
    }

    

    document.querySelector('.error').style.display = 'block';
    


    


});