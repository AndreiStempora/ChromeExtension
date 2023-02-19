const helper = {
    moveToLocation : (url) => {
        chrome.action.setPopup({popup: url});
        
    },

    customFetch : async (url, data) => {
        return await (await fetch(url, {
            method:"POST",
            mode:'cors',
            body:data
        })).json();
    }
}

export default helper