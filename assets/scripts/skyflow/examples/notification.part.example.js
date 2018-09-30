var notification = Skyflow.get('Notification');

// Get container element
var container = notification.container.get();
// Get body element
var body = notification.body.get();

// Add html to header
notification.header.addHtml('<h1>Hello!</h1>');

// Create element and append it
var div = document.createElement('div');
notification.body.addHtml(div);

// Select element and append it
var button = document.querySelector('button');
notification.footer.addHtml(button);

// Add class
notification.closeButton.addClass('my-class');