window.onload = function() {
  function show_profile_info(profile) {
    console.log(profile);
    $.ajax({
      method: "POST",
      url: "https://prod-11.westus.logic.azure.com:443/workflows/93064f22a63d437094179cca949e362d/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BJaHZL2tKHNyt3gRbhnZYKArW2SaTiT3q1rXZNqO2hw",
      accepts: "application/json",
      timeout: 5000,
      success: function(data, textStatus, jqXHR) {
        console.log("SUCCESS!!!", {
          data, textStatus, jqXHR
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR!!!", {
          jqXHR, textStatus, errorThrown
        });
      }
    });
  }

  var lock = new Auth0Lock('eofSdksBE6N1vxe8oUIoB8oJ1R50v1aM', 'lunaweb.auth0.com');
  var btn_login = document.getElementById('btn-login');

  btn_login.addEventListener('click', function() {
    lock.show();
  });

  lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
      if (error) {
        // Handle error
        return;
      }
      localStorage.setItem('id_token', authResult.idToken);

      show_profile_info(profile);
    });
  });
};
