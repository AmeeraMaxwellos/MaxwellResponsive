// top-nav and main-nav scroll Start

document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    const openJobs = document.querySelector('.open-jobs');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    const smoothScroll = (targetId) => {
        const targetElement = document.getElementById(targetId);
        const offset = mainNav.offsetHeight;

        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: 'smooth'
        });
    };

   
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScroll(targetId);
        });
    });

    openJobs.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        smoothScroll(targetId);
    });

});

// top-nav and main-nav scroll End



// stay connected for newslettter starts 

$(document).ready(function () {
    $('.connect-btn').click(function () {
        var email = $('.connect-input').val();
        var messageDiv = $('.submit-message');
        var inputField = $('.connect-input');

        // Basic email validation regex
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (emailPattern.test(email)) {
            // Reset input field border for valid email
            inputField.css('border', '');

            // If the email is valid, send it to Google Sheets
            $.ajax({
                url: 'https://script.google.com/macros/s/AKfycbwIbYwwN-MoYMhlci9p_M2VvvnocSG2nvUfT-YuDwJVHpLBi9nnYi9f86kORYZSrurGSw/exec', // Replace with your Web App URL
                type: 'POST',
                data: { email: email },
                success: function (response) {
                    messageDiv.text('Success! Thank you for subscribing.').css('color', 'green').fadeIn();
                    inputField.val('');
                    setTimeout(function () {
                        messageDiv.fadeOut();
                    }, 2000);
                },
                error: function () {
                    messageDiv.text('Error! There was a problem subscribing.').css('color', 'red').fadeIn();
                    setTimeout(function () {
                        messageDiv.fadeOut();
                    }, 2000);
                }
            });
        } else {
            messageDiv.text('Error! Please enter a valid email address.').css('color', 'red').fadeIn();
            // inputField.css('border', '1px solid red');
            setTimeout(function () {
                messageDiv.fadeOut();
            }, 2000);
        }
    });
});

// stay connected for newslettter ends


//send details from CONTACT FORM to email starts 

$(document).ready(function () {

    //telephone country-code starts

    var input = document.querySelector("#phoneId");
    var iti = window.intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function (callback) {
            $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
                var countryCode = (resp && resp.country) ? resp.country : "us";
                callback(countryCode);
            });
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    //telephone country-code ends

    $('#careerForm').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Validate the phone number
        if (!iti.isValidNumber()) {
            $('#submitMessage').hide(); // Hide the message container if validation fails
            alert('Please enter a valid phone number.');
            return;
        }

        // Show the submit message and loader
        $('#submitMessage').show();
        $('#submitText').text('Submitting your application, please wait...');
        $('#submitText').css('color', '#000000'); // Set initial color (black) for submitting message
        $('.loader').show(); // Ensure loader is visible

        // Disable the send button
        $('.send-button').prop('disabled', true);


          // Ensure the phone number value is formatted correctly
          var phoneNumber = iti.getNumber(); // Get the formatted number from the intlTelInput plugin
          $('#phoneId').val(phoneNumber); 
  
        // Send email using EmailJS
        emailjs.sendForm('service_uscvaub', 'template_yufkdph', this)
            .then(function (response) {
                console.log('Email sent successfully:', response);
                
                // Hide the loader and update the message
                $('.loader').hide();
                $('#submitText').text('Your message has been sent successfully!');
                $('#submitText').css('color', '#00A000'); // Change text color to green for success
                
                // Clear the form
                $('#careerForm')[0].reset();
                
                // Optionally, reset the international telephone input
                iti.setNumber('');
                iti.setCountry('QA');

            }, function (error) {
                console.error('Failed to send email:', error);
                
                // Hide the loader and update the message
                $('.loader').hide();
                $('#submitText').text('There was an error sending your message. Please try again.');
                $('#submitText').css('color', '#FF0000'); // Change text color to red for error
            })
            .finally(function () {
                // Re-enable the send button after the process is complete
                $('.send-button').prop('disabled', false);

                // Optionally hide the message after some time
                setTimeout(function() {
                    $('#submitMessage').hide();
                }, 1000); // Adjust time as needed
            });
    });

});


//send details from CONTACT FORM to email ends 


//redirecting to HOME page starts

const ids = ["main-logo", "homePage"];

ids.forEach(function (id) {
    document.getElementById(id).addEventListener("click", function () {
        window.location.href = "index.html";
    });
});

ids.forEach(function (id) {
    document.getElementById(id).addEventListener("click", function () {
        window.location.href = "index.html";
    });
});

//redirecting to HOME page ends


//Navbar side menu for smaller screens starts
var sideMenu = document.getElementById('side-menu');

function openMenu() {
    console.log('opentab')
    sideMenu.style.right = '-50px';

}


function closeMenu() {
    console.log('close tab');
    document.getElementById('side-menu').style.right = '-250px';
}


    // Add event listener to each <li> element , when clicking outside to hide menubar on click


    document.addEventListener('click', function (event) {

        document.querySelectorAll('#side-menu li').forEach(item => {
            item.addEventListener('click', closeMenu);
        });

        if (!sideMenu.contains(event.target) && !event.target.matches('.fa-bars')) {
            closeMenu();
        }
    });


    // Add event listener to each <li> element , when clicking outside to hide menubar on click


//Navbar side menu for smaller screens ends


//country-flag in preferred country selection starts




const selectElement = document.getElementById('countryName');
const flagImage = document.getElementById('countryFlag');
const formElement = document.querySelector('form'); // Assuming the select is within a form

function updateFlag() {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const flagUrl = selectedOption.getAttribute('data-flag');

    if (flagUrl) {
        flagImage.src = flagUrl;
        flagImage.style.display = 'inline'; // Show the flag
    } else {
        flagImage.style.display = 'none'; // Hide the flag if no country is selected
    }
}

// Update the flag on page load
updateFlag();

// Update the flag on change
selectElement.addEventListener('change', updateFlag);

// Handle form reset
formElement.addEventListener('reset', function () {
    setTimeout(updateFlag, 0); // Delay to allow the reset to complete
});

// To handle form reset or clear
document.querySelector('form').addEventListener('reset', function () {
    flagImage.src = '';
    flagImage.style.display = 'none';
});


//country-flag in preferred country selection ends

//redirecting to different pages starts

document.getElementById("erpNext").addEventListener("click", function () {
    window.location.href = "erp.html";
});

