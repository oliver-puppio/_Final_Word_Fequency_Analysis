function getWordFrequency(obj) {
    var ret = new Array()
    for (var i in obj) {
        ret.push({
            name: String(i),
            value: Number(obj[i]),
        });
    }
    return ret;
}

function renderChart(data, width, length) {          //生成词云图和柱状图
    var ColumnChartDiv = document.getElementById("ColumnChart");
    ColumnChartDiv.innerHTML = "";
    var max = 0;
    for (var i in data) {
        if (data[i].value > max)
            max = data[i].value;
    }
    var percent = 180 / max;
    for (var i = 0; i < 10; i++) {
        var bar = document.createElement("div");
        bar.id = i + "_" + data[i].value;
        bar.style.height = Math.round(percent * data[i].value) + "px";
        bar.style.width = "40px";
        bar.style.left = (i * 40) + 165 + "px";
        bar.style.marginLeft = (i * 20) + "px";
        bar.style.position = "absolute";
        bar.style.background = "none repeat scroll 0 0 pink";
        bar.style.overflow = "hidden";
        bar.setAttribute("title", i + "：" + data[i].value);
        bar.style.display = "block";
        bar.style.top = 200 - Math.round(percent * data[i].value) + "px";
        ColumnChartDiv.appendChild(bar);
        var axis = document.createElement("div");
        axis.id = "axis_" + i;
        axis.style.width = "40px";
        axis.style.left = (i * 40) + 165 + "px";
        axis.style.marginLeft = (i * 20) + "px";
        axis.style.textAlign = "center";
        axis.style.position = "absolute";
        axis.style.top = "205px";
        axis.innerHTML = '<span style="font-size:12px; color:grey;"> ' + data[i].name + '</span>';
        ColumnChartDiv.appendChild(axis);
    }
    for (var i = 0; i < 6; i++) {
        var ayis = document.createElement("div");
        ayis.style.width = "30px";
        ayis.style.position = "absolute";
        ayis.style.top = (36 * i) + (20 - 6) + "px";
        ayis.style.left = "140px";
        ayis.innerHTML = '<span style="font-size:12px; color:grey;"> ' + Math.round(max - (max / 5) * i) +
            '</span>';
        ColumnChartDiv.appendChild(ayis);
        var line = document.createElement("div");
        line.setAttribute("style",
            "width:580px; left:165px; border-top:1px dotted grey; height:1px; line-height:1px; display:block; overflow:hidden; position:absolute; "
        );
        line.style.top = (36 * i) + 20 + "px";
        ColumnChartDiv.appendChild(line);
    }
}

function generateTable(data) {           //生成词频表格
    var tbody = document.getElementById("WordFrequencyTableBody");
    tbody.innerHTML = "";
    var str1 = "";
    for (var i = 0; i < (data.length < 30 ? data.length:30); i++) {
        str1 += "<tr>" + "<td>" + (i + 1) + "</td><td>" + data[i].name + "</td><td>" + data[i].value + " </td></tr > ";
    }
    tbody.innerHTML = str1;
}