﻿define(['knockout', 'webservice'], function (ko, webservice) {

    return function (params) {

        var username = ko.observable("");

        var note = ko.observable("");
        var createdSearch = ko.observable("");
        var savedPostId = ko.observable("");
        var savedNote = ko.observable("");

        var specificUserName = ko.observable("");
        var specificUserAge = ko.observable("");
        var specificUserLocation = ko.observable("");
        var specificUserCreation = ko.observable("");

        var currentUser = ko.observable("");

        var showUser = ko.observable(false);
        var showHistMark = (false);

        var specificUserMarkings = ko.observableArray([]);
        var specificUserHistory = ko.observableArray([]);

        var postTitle = ko.observable("");

        var links = ko.observableArray([]);    // Initially an empty array

        var bodyTextDiv = ko.observable(false);

        var next = ko.observable();
        var prev = ko.observable();

        var showNext = ko.observable(false);
        var showPrev = ko.observable(false);

        var showBody = function () {
            console.log(bodyTextDiv())
            if (bodyTextDiv() == false) {
                bodyTextDiv(true);
            }
            else {
                bodyTextDiv(false);
            }
        }

        var getNext = function () {
            getLinks(next);
        }

        var getPrev = function () {
            getLinks(prev);
        }

        var getUserByName = function () {

            var myUrl = "http://localhost:5001/api/users/name/" + username();
            links.removeAll();

            var cb = function (data) {
                for (i = 0; i < data.data.length; i++) {
                    links.push(data.data[i]);
                }
                next = data.next;
                prev = data.prev;
                displayNextPrev(data.next, data.prev);
            };

            webservice.getPostQ(myUrl, cb);
        }

        var getUsername = function () {

            var myUrl = "http://localhost:5001/api/users/" + username();
            links.removeAll();

            var cb = function (data) {


                for (i = 0; i < data.data.length; i++) {
                    links.push(data.data[i]);
                }
                next = data.next;
                prev = data.prev;
                displayNextPrev(data.next, data.prev);
            };

            webservice.getPostQ(myUrl, cb);
        }

        var getUserId = function (myUrl) {

            var cb = function (data) {
                specificUserName(data[0].name);
                specificUserAge(data[0].age);
                specificUserLocation(data[0].location);
                specificUserCreation(data[0].creationDate);
                currentUser(data[0]);
            };

            if (showUser === true) {
                showUser(false);
            }
            else {
                showUser(true);
            }

            webservice.getPostQ(myUrl, cb);

        }

        var getUserMarkings = function (url = null) {

            var myUrl = currentUser().markingsLink;

            specificUserMarkings.removeAll();

            var cb = function (data) {
                console.log(data);
                for (i = 0; i < data.data.length; i++) {
                    specificUserMarkings.push(data.data[i]);
                }
            };

            webservice.getPostQ(myUrl, cb);

        }

        var getUserHistory = function (url = null) {

            var myUrl = currentUser().historyLink;
            var myUrl = "http://localhost:5001/api/users/history/" + currentUser().id;

            specificUserHistory.removeAll();

            var cb = function (data) {
                for (i = 0; i < data.data.length; i++) {
                    specificUserHistory.push(data.data[i]);
                }
            };
            webservice.getPostQ(myUrl, cb);
        }

        var getLinks = function (url) {

            links.removeAll();

            var cb = function (data) {
                for (i = 0; i < data.data.length; i++) {
                    links.push(data.data[i]);
                }
                console.log(data);
                next = data.next;
                prev = data.prev;
                displayNextPrev(data.next, data.prev);
            };

            var myUrl = url;

            if (url == null) {
                myUrl = "http://localhost:5001/api/users/";
            }
            

            webservice.getPostQ(myUrl, cb);
        };

        var displayNextPrev = function (next, prev) {
            if (next != null) {
                showNext(true);
            }
            else {
                showNext(false);
            }
            if (prev != null) {
                showPrev(true);
            }
            else {
                showPrev(false);
            }
        }

        var deleteHistory = function (histId) {
            var cb = function (message) {
                alert(message);
            };
            var myUrl = "http://localhost:5001/api/users/history/" + histId;
            webservice.deleteFunction(myUrl, cb);
        }

        var deleteMarking = function (postId) {
            var cb = function (message) {
                alert(message);
            };
            var myUrl = "http://localhost:5001/api/users/markings/" + currentUser().id + "/" + postId;
            webservice.deleteFunction(myUrl, cb);
        }

        var updateMarking = function (postId) {
            var cb = function (message) {
                alert(message);
            };
            var myUrl = "http://localhost:5001/api/users/markings/";
            var data = {
                userID : currentUser().id,
                postId : postId,
                note : note()
            };
            webservice.updateFunction(myUrl, cb, data);
        }

        var createHistory = function () {
            var cb = function (data) {
                alert("Created");
            };
            var myUrl = "http://localhost:5001/api/users/history/";
            var data = {
                userId: currentUser().id,
                searchWord: createdSearch()
            };
            webservice.postFunction(myUrl, cb, data);
        }

        var createMarking = function (userId, postId, note) {
            var cb = function (data) {
                alert("Created");
            };
            var myUrl = "http://localhost:5001/api/users/markings/";
            var data = {
                userID: currentUser().id,
                postId: savedPostId(),
                note: savedNote()
            };
            webservice.postFunction(myUrl, cb, data);
        }

        return {
            links,
            note,
            savedNote,
            savedPostId,
            createHistory,
            createMarking,
            createdSearch,
            deleteMarking,
            deleteHistory,
            updateMarking,
            username,
            getUserId,
            getUserMarkings,
            specificUserName,
            specificUserAge,
            specificUserLocation,
            specificUserCreation,
            bodyTextDiv,
            showBody,
            getNext,
            getPrev,
            showNext,
            showPrev,
            getLinks,
            displayNextPrev,
            getUserByName,
            specificUserMarkings,
            specificUserHistory,
            getUserHistory,
            postTitle,
            showUser
        };

    }
});