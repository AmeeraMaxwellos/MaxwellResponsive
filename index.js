//  top-nav and main-nav scroll Start

document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    const consultationLink = document.querySelector('.consultation-text');

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
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScroll(targetId);
        });
    });

    consultationLink.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        smoothScroll(targetId);
    });
});



// top-nav and main-nav scroll End

//telephone country-code starts

// document.addEventListener('DOMContentLoaded', function() {
//     var input2 = document.querySelector("#phoneId");
//     window.intlTelInput(input2, {
//         initialCountry: "auto",
//         geoIpLookup: function(callback) {
//             fetch('https://ipinfo.io/json', { headers: { 'Accept': 'application/json' } })
//                 .then(response => response.json())
//                 .then(data => callback(data.country))
//                 .catch(() => callback('us'));
//         },
//         utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
//     });         
           
// });

//telephone country-code ends


//Achievement count incrementor starts

document.addEventListener("DOMContentLoaded", function () {
    // Define the count values
    var countValues = [1000, 10, 100, 7]; // Add more values if needed

    // Loop through each count-item and initiate the animation
    countValues.forEach(function (value, index) {
        var countItem = document.getElementById("count-item-" + (index + 1));
        if (countItem) {
            animateCount(countItem, value);
        }
    });

    function animateCount(countItem, finalValue) {
        var countElement = countItem.querySelector(".count");
        var duration = 2000; // Duration of the animation in milliseconds
        var frameRate = 30; // Number of frames per second
        var increment = finalValue / (duration / 1000 * frameRate);

        function startAnimation() {
            var currentCount = 0;
            var interval = setInterval(function () {
                currentCount += increment;
                var formattedCount = Math.round(currentCount).toString().padStart(2, '0');
                countElement.textContent = formattedCount;

                if (currentCount >= finalValue) {
                    clearInterval(interval);
                    if (finalValue >= 10) {
                        countElement.textContent = finalValue;
                    } else {
                        countElement.textContent = "0" + finalValue;
                    }
                    setTimeout(startAnimation, 500); // Restart the animation after 1 second
                }
            }, 1000 / frameRate);
        }

        startAnimation();
    }
});

// Achievement count incrementor ends

//ERP contents animation starts

$(document).ready(function(){
    let paragraphs = $(".erp-content p");
    let index = 0;

    function showParagraph() {
        $(paragraphs[index]).css('display', 'block').hide().fadeIn(500).delay(500).fadeOut(500, function() {
            $(this).css('display', 'none'); // Ensure the element is hidden after fading out
            index = (index + 1) % paragraphs.length;
            showParagraph();
        });
    }

    showParagraph();
});

//ERP contents animation ends


// particle background starts 

document.addEventListener('DOMContentLoaded', function () {
    particleground(document.getElementById('particles'), {
      dotColor: '#ffffff',
      lineColor: '#ffffff'
    });

    var intro = document.getElementById('intro');
    intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
  }, false);

 // particle background ends 



// stay connected for newslettter starts 

$(document).ready(function() {
    $('.connect-btn').click(function() {
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
                data: {email: email},
                success: function(response) {
                    messageDiv.text('Success! Thank you for subscribing.').css('color', 'green').fadeIn();
                    inputField.val(''); 
                    setTimeout(function() {
                        messageDiv.fadeOut();
                    }, 2000);
                },
                error: function() {
                    messageDiv.text('Error! There was a problem subscribing.').css('color', 'red').fadeIn();
                    setTimeout(function() {
                        messageDiv.fadeOut();
                    }, 2000);
                }
            });
        } else {
            messageDiv.text('Error! Please enter a valid email address.').css('color', 'red').fadeIn();
            // inputField.css('border', '1px solid red');
            setTimeout(function() {
                messageDiv.fadeOut();
            }, 2000);
        }
    });
});

// stay connected for newslettter ends


//send details from CONTACT FORM to email starts 

 
$(document).ready(function() {

    //telephone country-code starts


    var input = document.querySelector("#phoneId");
    var iti = window.intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
            $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                var countryCode = (resp && resp.country) ? resp.country : "us";
                callback(countryCode);
            });
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    //telephone country-code ends

    $('#contactForm').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        
            // Validate the phone number
            if (!iti.isValidNumber()) {
                alert('Please enter a valid phone number.');
                return;
            }

        var formData = {
            name: $('#name').val(),
            email: $('#emailId').val(),
            // phone: $('#phoneId').val(),
            phone: iti.getNumber(),
            companyName: $('#companyName').val(),
            requirementType: $('#requirementItem option:selected').text(),
            subject: $('input[name="subject"]').val(),
            message: $('textarea[name="message"]').val()
        };

        var emailSubject = formData.subject + " - " + formData.requirementType;

        var templateParams = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company_name: formData.companyName,
            requirement_type: formData.requirementType,
            subject: emailSubject,
            message: formData.message
        };

        console.log("Sending email with params:", templateParams);

        emailjs.send('service_n7r5ftg', 'template_mwgby5q', templateParams)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                alert('Your message has been sent successfully!');
            }, function(error) {
                console.error('Failed to send email:', error);
                alert('There was an error sending your message.');
            });
    });
});


//send details from CONTACT FORM to email ends


//Media query for Navbar starts

    var sideMenu = document.getElementById('side-menu');

    function openMenu(){
        console.log('opentab')
        sideMenu.style.right= '-50px';

    }


    function closeMenu(){
        console.log('close tab');
        document.getElementById('side-menu').style.right = '-250px';
    }

    // Add event listener to each <li> element to hide menubar on click
    document.querySelectorAll('#side-menu li').forEach(item => {
        item.addEventListener('click', closeMenu);
    });

//Media query for Navbar ends


  
    document.getElementById("careerPage").addEventListener("click", function() {
        window.location.href = "career.html";
      });
    
    

