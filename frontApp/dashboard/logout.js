(function() {
    window.onload = function() {

        var logoutButton  = document.getElementById('logoutButton');
        var statusMessage = document.getElementById('statusMessage');

        var xhr = new XMLHttpRequest();

        xhr.timeout = window.options.dashboard.authTimeout;

        xhr.onloadstart = function() {
            logoutButton.disabled   = true;
            statusMessage.innerHTML = "Logging out...";
        };

        xhr.ontimeout = function() {
            logoutButton.enabled    = true;
            statusMessage.innerHTML = "Server answer timeout";
        };

        xhr.onerror = function() {

            logoutButton.enabled    = true;
            statusMessage.innerHTML = "Error";

        };

        xhr.onload = function() {

            var answer = JSON.parse(xhr.responseText);

            if(xhr.status !== 200) {

                statusMessage.innerHTML = "Error code: " + xhr.status
                    + " Message: " + answer.message;
                logoutButton.disabled   = false;

            } else {
                statusMessage.innerHTML = "Ok";

                localStorage.removeItem('access_token');

                location.replace("/");
            }

        };

        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();

            xhr.open('DELETE', window.options.dashboard.authUrl, true);
            xhr.send();

        });

    };
})();
