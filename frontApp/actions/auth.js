export function logout() {
    console.log("logout pressed");

    var xhr = new XMLHttpRequest();

    xhr.timeout = window.options.dashboard.authTimeout;

    xhr.onloadstart = function() {

        console.log("onLoadStart...");

    };

    xhr.ontimeout = function() {

        console.log("onTimeout...");

    };

    xhr.onerror = function() {

        console.log("onError...");

    };

    xhr.onload = function() {

        console.log("onLoad...");

        //var answer = JSON.parse(xhr.responseText);

        if(xhr.status !== 200) {

            //statusMessage.innerHTML = "Error code: " + xhr.status
            //    + " Message: " + answer.message;
            //logoutButton.disabled   = false;

        } else {
            //statusMessage.innerHTML = "Ok";

            localStorage.removeItem('access_token');

            location.replace("/");
        }

    };

    xhr.open('DELETE', window.options.dashboard.authUrl, true);
    xhr.send();

}
