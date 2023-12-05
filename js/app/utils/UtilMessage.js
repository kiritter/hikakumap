(function(global) {
    var MyApp = global.MyApp = global.MyApp || {};

    MyApp.UtilMessage = class UtilMessage {
        constructor() {
        }

        static show(messageText) {
            var areaEl = document.querySelector('.js-message-area');
            var messageEl = document.createElement('div');
            messageEl.innerText = messageText;
            messageEl.classList.add('message');
            messageEl.classList.add('hidden-element');
            areaEl.appendChild(messageEl);

            var width = messageEl.clientWidth;
            var bodyWidth = document.body.clientWidth;
            var left = (bodyWidth / 2) - (width / 2);
            messageEl.style.left = `${left}px`;
            messageEl.classList.remove('hidden-element');

            var timerId = setTimeout(function() {
                clearTimeout(timerId);
                areaEl.removeChild(messageEl);
            }, 2000);
        }
        
    };

}(this));
