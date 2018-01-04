/**
 * Created by ZhangJiansen on 2016/9/12.
 */
define(['app'], function (app) {
    'use strict';
    app.animation(".main_left", function () {
        return {
            enter: function (element, done) {
                console.log("enter");
                element.css('display', 'none');
                $(element).fadeIn(1000, function () {
                    done();
                });
            },
            leave: function (element, done) {
                console.log("leave");
                $(element).fadeOut(1000, function () {
                    done();
                });
            },
            move: function (element, done) {
                console.log("move");
                element.css('display', 'none');
                $(element).slideDown(500, function () {
                    done();
                });
            }
        }
    });
});