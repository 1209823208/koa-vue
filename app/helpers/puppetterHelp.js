/*
 * @Author: loofah
 * @Date: 2019-01-23 16:38:17
 * @Last Modified by: loofah
 * @Last Modified time: 2019-01-24 17:48:28
 */
let eventPool = require("../lib/eventPool");

module.exports = {
    init: async () => {
        await eventPool.init(6);
    },
    newTask: async (ctx) => {
        let req = ctx.request;
        let res = ctx.response;
        eventPool.pushTask(req, res);
    }
};