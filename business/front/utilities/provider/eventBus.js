/**
 * Created by ZhangJiansen on 2016/9/19.
 * 通过provider形式实现的事件总线，用于跨域的事件传递
 * Angular自带的事件广播机制不具备定向点对点的广播机制，会影响性能
 * 事件广播路径较长的场景可使用此总线
 */
define(['angular'], function (angular) {
    'use strict';
    function eventBusHandler()
    {
        var events = [];
        this.setEvent = function (eventName) {
            events.push(eventName);
        };

        this.$get = function () {
            var EventBus = function () {
                this.subscribers = [];
            };

            EventBus.prototype = {
                constructor: EventBus,
                // 订阅方法，返回订阅event标识符
                sub: function (fn) {
                    this.subscribers.push(fn);
                    return this.subscribers.length - 1;
                },
                // 发布方法，成功后返回自身
                pub: function () {
                    var args = [].slice.call(arguments);
                    for (var i in this.subscribers) {
                        if (angular.isFunction(this.subscribers[i])) {
                            this.subscribers[i].apply(null, args);
                        }
                    }
                    ;
                    return this;
                },
                // 解除订阅，需传入订阅event标识符
                unsub: function (subId) {
                    try {
                        this.subscribers.splice(subId, 1);
                    } catch (err) {
                        console.log(err);
                    }
                }
            };

            var eventBuses = {};
            events.forEach(function (name) {
                eventBuses[name] = new EventBus();
            });
            return eventBuses;
        }
    };

    return eventBusHandler;
});
