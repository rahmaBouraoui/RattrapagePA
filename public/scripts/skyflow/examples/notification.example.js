var notification = Skyflow.get('Notification');


/**
 * Event list:
 *
 * - show
 * - hide
 * - container.show
 * - container.hide
 * - header.show
 * - header.hide
 * - body.show
 * - body.hide
 * - footer.show
 * - footer.hide
 * - closeButton.show
 * - closeButton.hide
 * - modal.show
 * - modal.hide
 *
 */

notification.on('show', function () {
    // Your code goes here
});

notification.on('header.hide', function () {
    // Your code goes here
});

// Remove event
notification.off('show');

// Set notification size
notification.width('20%');
notification.height('10%');

// Disabled auto hide notification
notification.autoHide(false);
// Enabled auto hide notification with default value
notification.autoHide(true);
// Enabled auto hide notification with specific value in seconds
notification.autoHide(7);

