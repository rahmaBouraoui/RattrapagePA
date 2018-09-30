var notification = Skyflow.get('Notification');

// Get stylesheet element id
notification.stylesheet.getId();

// Set stylesheet content
notification.stylesheet.content('.my-class{color: red}');
// Get stylesheet content
var time = notification.stylesheet.content();