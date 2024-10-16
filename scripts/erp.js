// top-nav and main-nav scroll Start

// document.addEventListener('DOMContentLoaded', () => {
//     const mainNav = document.querySelector('.main-nav');
//     const navLinks = document.querySelectorAll('.main-nav a');
//     const productLink = document.querySelectorAll('.item-link');

//     window.addEventListener('scroll', () => {
//         if (window.scrollY > 0) {
//             mainNav.classList.add('scrolled');
//         } else {
//             mainNav.classList.remove('scrolled');
//         }
//     });

//     const smoothScroll = (targetId) => {
//         const targetElement = document.getElementById(targetId);
//         const offset = mainNav.offsetHeight;

//         window.scrollTo({
//             top: targetElement.offsetTop - offset,
//             behavior: 'smooth'
//         });
//     };

//     navLinks.forEach(link => {
//         link.addEventListener('click', function (event) {
//             event.preventDefault();
//             const targetId = this.getAttribute('href').substring(1);
//             smoothScroll(targetId);
//         });
//     });

//     productLink.forEach(link => {
//         link.addEventListener('click', function (event) {
//             event.preventDefault();
//             const targetId = this.getAttribute('href').substring(1);
//             smoothScroll(targetId);
//         });
//     });

// });



document.addEventListener('DOMContentLoaded', () => {
    // alert("hi")
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    const productLinks = document.querySelectorAll('.item-link');

    if (!mainNav) {
        console.warn('Main navigation not found');
        return; // Check if mainNav exists
    }

    const updateNavScroll = () => {
        if (window.scrollY > 0) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateNavScroll);
    updateNavScroll(); // Initial check

    const smoothScroll = (targetId) => {
        const targetElement = document.getElementById(targetId);

        if (!targetElement) {
            console.warn(`Element with ID '${targetId}' not found.`);
            return;
        }

        const offset = mainNav.offsetHeight;
        console.log(`Scrolling to ${targetId}, nav height: ${offset}`);

        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: 'smooth'
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            event.preventDefault();
            const targetId = href.substring(1);
            smoothScroll(targetId);
        });
    });

    productLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            event.preventDefault();
            const targetId = href.substring(1);
            smoothScroll(targetId);
        });
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

    $('#contactForm').submit(function (event) {
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

        emailjs.send('service_uscvaub', 'template_npp4s38', templateParams)
            .then(function (response) {
                console.log('Email sent successfully:', response);
                alert('Your message has been sent successfully!');
            }, function (error) {
                console.error('Failed to send email:', error);
                alert('There was an error sending your message.');
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

//redirecting to different pages starts

document.getElementById("erpNext").addEventListener("click", function () {
    window.location.href = "erp.html";
});


document.getElementById("careerPage").addEventListener("click", function () {
    window.location.href = "career.html";
});

//redirecting to different pages ends
