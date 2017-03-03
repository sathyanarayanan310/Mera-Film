'use strict';

var app = require('angular').module('movieApp');

app.controller('BookingController', require('./bookingController'));
app.controller('CancellationController', require('./cancellationController'));
app.controller('HomeController', require('./homeController'));
app.controller('MovieBookingController', require('./moviebookingController'));
app.controller('RatingController', require('./ratingController'));
app.controller('ConfirmController', require('./confirmController'));
app.controller('LoginController', require('./loginController'));
app.controller('LogoutController', require('./logoutController'));
app.controller('RegisterController', require('./registerController'));
