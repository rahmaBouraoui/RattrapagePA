/**
 * Animation list:
 *
 * - zoom
 * - zoomDown
 * - zoomUp
 * - bounce
 * - fade
 * - slideLeft
 * - slideRight
 * - slideUp
 * - slideDown
 *
 */

var notification = Skyflow.get('Notification');

// Set animation type
notification.animation.type('fade');
// Get animation type
var type = notification.animation.type();

// Set animation time in seconds
notification.animation.time(0.7);
// Get animation time
var time = notification.animation.time();