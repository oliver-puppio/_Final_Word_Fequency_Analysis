function Ajax(method, url, param, callback) {
    method = method || "get";/* 设置method属性默认值get*/
    param = param || null;
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open(method, url, true);//open方法只是设置了一些请求参数。
    //如果请求方法是post,下面这名必须加
    //if (method.toLowerCase() == "post") {
    //    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    //}
    xhr.send(param);//发送请求及数据，
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //使用回调函数
                if (callback) {
                    callback(xhr.responseText);
                }
                else {
                    alert(xhr.status);
                }
            }
        }
    }
}
var myfiles = localStorage.length > 0 ? load_file() : new Array(5);
var myfileslength = localStorage.length > 0 ? localStorage.length :0;
function load_file() {
    var ans = new Array(localStorage.length);
    for (var i = 0; i < localStorage.length; i++) {
        ans[i] = eval("(" + localStorage.getItem(String(i)) + ")");
    }
    return ans;
}

function renew_localStorage() {
    localStorage.clear();
    for (var i = 0; i < myfileslength; i++)
        localStorage.setItem(String(i), JSON.stringify(myfiles[i]));
}

function create_json(param) {
    var new_j = eval("(" + param + ")");
    if (myfileslength == 5) {
        myfiles.pop();
        myfileslength--;
    }
    if (myfileslength < 5) {
        myfiles.unshift({
            filename: new_j["filename"],
            uptime: new_j["uptime"],
            info: new_j["info"],
            result: new_j["result"],
        });
        myfileslength++;
    }
    renew_localStorage();
    judge_json();
    show_detail(0);
}

function delete_json(i) {
    if (myfileslength > 0) {
        myfiles.splice(i, 1);
        myfileslength--;
    }
    renew_localStorage();
    judge_json();
}

function judge_json() {
    for (var i = 0; i < 5; i++) {       
        document.getElementById(String(i)).style.display = i < myfileslength ? "block" : "none";
        if (i < myfileslength) {
            document.getElementById(String(i)).querySelector(".title").title = myfiles[i].filename;//设置了鼠标悬停时显示的内容
            document.getElementById(String(i)).querySelector(".title").innerText = myfiles[i].filename;
            document.getElementById(String(i)).querySelector(".time").innerText = myfiles[i].uptime;
            document.getElementById(String(i)).querySelector(".info").innerText = myfiles[i].info;
        }
    }
}

window.onload = function () {
    judge_json();
}

function show_detail(param) {
    localStorage.setItem("current", String(param));
    location.href = 'Details.html';
}