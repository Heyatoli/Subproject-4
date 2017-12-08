﻿require.config({

    baseUrl: "js",

    paths: {
        jquery: '../lib/jQuery/dist/jquery.min',
        knockout: '../lib/knockout/dist/knockout',
        text: '../lib/text/text',
        postman: 'services/postman',
        webservice: 'services/WebserviceCalls'
    }
});

require(['knockout'], function (ko) {
    ko.components.register("post", {
        viewModel: { require: "components/post/postVm" },
        template: { require: "text!components/post/post.html" }
    });

    ko.components.register("user", {
        viewModel: { require: "components/user/userVm" },
        template: { require: "text!components/user/user.html" }
    });
});

require(['knockout', 'postman'], function(ko, postman) {
    var vm = (function() {
        var currentView = ko.observable('post');
        var currentParams = ko.observable("!!!");
        var switchComponent = function () {
            if (currentView() === "post") {
                currentView("user");
            } else {
                currentView("post");
            }

        }

        postman.subscribe(postman.events.changeView,
            viewName => {
                currentParams({ name: "Yahallo!"});
                currentView(viewName);
            });

        return {
            currentView,
            currentParams,
            switchComponent
        }
    })();

    ko.applyBindings(vm);
});