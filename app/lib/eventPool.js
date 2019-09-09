const puppeteer = require('puppeteer');
let baseHead = require('../constants/svgBase');
/* eslint-disable*/
//事件处理池
let eventPool = new function () {
    let browser;//puppeteer实例
    let browserWSEndpoint;//puppeteer 指针，用于重连
    let waitingList = [];
    let pageTaskMap = new Map();

    //处理下一个任务
    let nextTask = function () {
        if (waitingList.length) {
            console.log("执行下一个任务。");
            let task = waitingList.shift();
            processingTask(task.res, task.data);
        } else {
            console.log("队列中没有待执行的任务。");
        }
    };

    //创建tab页
    let newPage = async function () {
        let uuid = (Date.now().toString(36) + Math.random().toString(36)).replace(".", "");
        return {
            key: uuid,
            value: {
                page: await browser.newPage(),
                isReady: true,
                uuid: uuid
            }
        };
    };

    //获取一个用于处理的实例
    let getPageTask = function () {
        let pageTaskKey, pageTaskObj;

        //取出可用的第一个page
        for (let [key, value] of pageTaskMap) {
            if (value.isReady === true) {
                pageTaskKey = key;
                pageTaskObj = value;
                break;
            }
        }


        //暂时没有可用的连接了
        if (!pageTaskKey) {
            console.log("没有空闲的page.");
            return null;
        }

        try {
            pageTaskObj.isReady = false;//把取出的taskObj设为占用状态
        } catch (ex) {
            console.log("getPageError:" + ex.message);
        }

        return pageTaskObj;
    };


    /**
     * 更新pageTask状态
     * @param index uuid
     * @param isReady 是否可用
     */
    let updateTaskObj = function (index, isReady) {
        pageTaskMap.get(index).isReady = isReady;
        if (isReady === true) {
            console.log(`UUID为:${index}的连接空闲中。`);
            nextTask();
        } else {
            console.log(`UUID为:${index}的连接关闭了。`);
            pageTaskMap.set(index, {});
        }
    };

    /**
     * 处理一个任务
     * @param res
     * @param data
     * @return {boolean}
     */
    let processingTask = async function (res, data) {
        let pageTask = getPageTask();
        //没有可用连接时进行排队
        if (pageTask === null) {
            waitingList.push({
                res: res,
                data: data
            });
            console.log("有新的任务开始排队了。");
            return false;
        }

        try {
            let page = pageTask.page;
            //把浏览器窗口设为svg的实际大小
            await page.setViewport({
                width: data.width,
                height: data.height
            });

            let fullContent = `<html lang="zh-Hans"><head><meta charset="utf-8"/><meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>${baseHead}<title>svg2png</title></head><body>${data.svgContent}</body></html>`;

            await page.setContent(fullContent);

            let binary = await page.screenshot({
                // path: `${Date.now().toString(36)}.png`,
                fullPage: true,
                omitBackground: true
            });
            console.log('---------binary--buffer字节传输-------------',res);
            res.type('png');
            res.send(binary);
        } catch (ex) {
            console.log('---------------------------',res);
            res.sendStatus(400);
        }
        updateTaskObj(pageTask.uuid, true);//更新任务状态
    };

    //绑定一些事件，用于处理可能存在的异常
    let bindEvent = function () {
        browser.on('disconnected', async function () {
            browser = await puppeteer.connect({browserWSEndpoint});
        });
    };

    this.pushTask = function (req, res) {
        processingTask(res, {
            width: parseInt(req.body.width, 10),
            height: parseInt(req.body.height, 10),
            svgContent: req.body.svgContent
        });
    };


    this.init = async function (maxPage) {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'] //禁用sandbox，避免linux下无法使用；以及禁用安全校验
        });

        bindEvent();

        for (let i = 0; i < maxPage; i++) {
            let {key, value} = await newPage();
            pageTaskMap.set(key, value);
        }
    };


};

module.exports = eventPool;