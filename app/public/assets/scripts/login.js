$('document').ready(() => {

    $(document).ready(function(){
        $('.parallax').parallax();
      });
            
    $('#login-button').on('click', function() {
        let username = $('#username').val().trim();
        let password = $('#password').val().trim();
        $('#password-validation').addClass('hidden');

        if(!validateForm()) return;

        let user = {
            username: username,
            password: password
        };

        $.ajax({
            url: '/auth/login',
            type: 'POST',
            data: user
        }).then(data => {
            if(data.error) {
                $('#password-validation').removeClass('hidden');
                $('#password-validation').text(data.message);
            } else if (data.redirect){
                window.location.href = data.url;
            }
        });
    });

    $('#create-account').on('click', function() {
        let username = $('#username').val().trim();
        let password = $('#password').val().trim();
        $('#password-validation').addClass('hidden');

        if(!validateForm()) return;

        let user = {
            username: username,
            password: password
        };

        $.ajax({
            url: '/auth/create-account',
            type: 'POST',
            data: user
        }).then(data => {
            if(data.error) {
                $('#password-validation').removeClass('hidden');
                $('#password-validation').text(data.message);
            }
            else {
                $('#password-validation').removeClass('hidden');
                $('#password-validation').text('Account created!');
            }
        });

     });

 

    function validateForm() {
        let validated = true;
        $('#username-validation').addClass('hidden');
        $('#password-validation').addClass('hidden');

        if(!$('#username').val().trim()) {
            $('#username-validation').removeClass('hidden');
            $('#username-validation').text('Must enter a username');
            validated = false;
        }

        if(!$('#password').val().trim()) {
            $('#password-validation').removeClass('hidden');
            $('#password-validation').text('Must enter a password');
            validated = false;
        }

        return validated;
    }   
});
