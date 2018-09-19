$(function() {
    "use strict";

    $(function () {
        drawDocSparklines();
        drawMouseSpeedDemo();
        SparklinePeity();
    });

    function drawDocSparklines() {

        // Bar + line composite charts
        $('#compositebar').sparkline('html', { type: 'bar', barColor: '#aaf' });
        $('#compositebar').sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7],
            { composite: true, fillColor: false, lineColor: 'red' });


        // Line charts taking their values from the tag
        $('.sparkline-1').sparkline();

        // Larger line charts for the docs
        $('.largeline').sparkline('html',
            { type: 'line', height: '2.5em', width: '4em' });

        // Customized line chart
        $('#linecustom').sparkline('html',
            {
                height: '1.5em',
                width: '8em',
                lineColor: '#f00',
                fillColor: '#ffa',
                minSpotColor: false,
                maxSpotColor: false,
                spotColor: '#60bafd',
                spotRadius: 3,
            });

        // Bar charts using inline values
        $('.sparkbar').sparkline('html', { type: 'bar' });

        $('.barformat').sparkline([1, 3, 5, 3, 8], {
            type: 'bar',
            tooltipFormat: '{{value:levels}} - {{value}}',
            tooltipValueLookups: {
                levels: $.range_map({ ':2': 'Low', '3:6': 'Medium', '7:': 'High' })
            }
        });

        // Tri-state charts using inline values
        $('.sparktristate').sparkline('html', { type: 'tristate' });
        $('.sparktristatecols').sparkline('html',
            { type: 'tristate', colorMap: { '-2': '#fa7', '2': '#60bafd' } });

        // Composite line charts, the second using values supplied via javascript
        $('#compositeline').sparkline('html', { fillColor: false, changeRangeMin: 0, chartRangeMax: 10 });
        $('#compositeline').sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7],
            { composite: true, fillColor: false, lineColor: 'red', changeRangeMin: 0, chartRangeMax: 10 });

        // Line charts with normal range marker
        $('#normalline').sparkline('html',
            { fillColor: false, normalRangeMin: -1, normalRangeMax: 8 });
        $('#normalExample').sparkline('html',
            { fillColor: false, normalRangeMin: 80, normalRangeMax: 95, normalRangeColor: '#60bafd' });

        // Discrete charts
        $('.discrete1').sparkline('html',
            { type: 'discrete', lineColor: '#1ab1e3', xwidth: 18 });
        $('#discrete2').sparkline('html',
            { type: 'discrete', lineColor: '#1ab1e3', thresholdColor: 'red', thresholdValue: 4 });

        // Bullet charts
        $('.sparkbullet').sparkline('html', { type: 'bullet' });

        // Pie charts
        $('.sparkpie').sparkline('html', { type: 'pie', height: '2em' });

        // Box plots
        $('.sparkboxplot').sparkline('html', { type: 'box' });
        $('.sparkboxplotraw').sparkline([1, 3, 5, 8, 10, 15, 18],
            { type: 'box', raw: true, showOutliers: true, target: 6 });

        // Box plot with specific field order
        $('.boxfieldorder').sparkline('html', {
            type: 'box',
            tooltipFormatFieldlist: ['med', 'lq', 'uq'],
            tooltipFormatFieldlistKey: 'field'
        });

        // click event demo sparkline
        $('.clickdemo').sparkline();
        $('.clickdemo').bind('sparklineClick', function (ev) {
            var sparkline = ev.sparklines[0],
                region = sparkline.getCurrentRegionFields();
            value = region.y;
            alert("Clicked on x=" + region.x + " y=" + region.y);
        });

        // mouseover event demo sparkline
        $('.mouseoverdemo').sparkline();
        $('.mouseoverdemo').bind('sparklineRegionChange', function (ev) {
            var sparkline = ev.sparklines[0],
                region = sparkline.getCurrentRegionFields();
            value = region.y;
            $('.mouseoverregion').text("x=" + region.x + " y=" + region.y);
        }).bind('mouseleave', function () {
            $('.mouseoverregion').text('');
        });
    }
    function drawMouseSpeedDemo() {
        var mrefreshinterval = 500; // update display every 500ms
        var lastmousex = -1;
        var lastmousey = -1;
        var lastmousetime;
        var mousetravel = 0;
        var mpoints = [];
        var mpoints_max = 30;
        $('html').mousemove(function (e) {
            var mousex = e.pageX;
            var mousey = e.pageY;
            if (lastmousex > -1) {
                mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
            }
            lastmousex = mousex;
            lastmousey = mousey;
        });
        var mdraw = function () {
            var md = new Date();
            var timenow = md.getTime();
            if (lastmousetime && lastmousetime != timenow) {
                var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
                mpoints.push(pps);
                if (mpoints.length > mpoints_max)
                    mpoints.splice(0, 1);
                mousetravel = 0;
                $('#mousespeed').sparkline(mpoints, { width: mpoints.length * 2, tooltipSuffix: ' pixels per second' });
            }
            lastmousetime = timenow;
            setTimeout(mdraw, mrefreshinterval);
        };
        // We could use setInterval instead, but I prefer to do it this way
        setTimeout(mdraw, mrefreshinterval);
    }
    function SparklinePeity() {
        
        var params = {
            width: '60px',
            height: '30px',
            lineWidth: '2',
            lineColor: '#1D92AF',
            fillColor: 'rgba(29,146,175,0.2) ',
            spotRadius: '2',
            highlightLineColor: '#aedaff',
            highlightSpotColor: '#71aadb',
            spotColor: false,
            minSpotColor: false,
            maxSpotColor: false,
            disableInteraction: false
        };
    
        // values from HTML script
        $('#demo-sparkline-line1').sparkline('html', params);
        params.lineColor = '#ef2020';
        params.fillColor = 'rgba(239,32,32,0.2)';
        $('#demo-sparkline-line2').sparkline('html', params);
        params.lineColor = '#ff9800';
        params.fillColor = 'rgba(255,152,0,0.2)';
        $('#demo-sparkline-line3').sparkline('html', params);
        params.lineColor = '#7CAC25';
        params.fillColor = 'rgba(124,172,37,0.2)';
        $('#demo-sparkline-line4').sparkline('html', params);
        params.lineColor = '#777';
        params.fillColor = 'rgba(119,119,119,0.2)';
        $('#demo-sparkline-line5').sparkline('html', params);
    
        // values from Javascript
        var values1 = getRandomValues();
    
        params.lineColor = '#1D92AF';
        params.fillColor = false;
        $('#demo-sparkline-line6').sparkline(values1[0], params);
        params.lineColor = '#ef2020';
        params.fillColor = false;
        $('#demo-sparkline-line7').sparkline(values1[1], params);
        params.lineColor = '#ff9800';
        params.fillColor = false;
        $('#demo-sparkline-line8').sparkline(values1[2], params);
        params.lineColor = '#7CAC25';
        params.fillColor = false;
        $('#demo-sparkline-line9').sparkline(values1[3], params);
        params.lineColor = '#777';
        params.fillColor = false;
        $('#demo-sparkline-line10').sparkline(values1[4], params);
    
        // composite line
        $('#demo-sparkline-compositeline').sparkline('html', {
            fillColor: false,
            lineColor: '#ff9800',
            width: '200px',
            height: '30px',
            lineWidth: '2',
        });    
        $('#demo-sparkline-compositeline').sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7], {
            composite: true,
            fillColor: false,
            lineColor: '#777',
            lineWidth: '2',
            chartRangeMin: 0,
            chartRangeMax: 10
        });   
    
        // MINI BAR CHART
        var values2 = getRandomValues();    
        var paramsBar = {
            type: 'bar',
            barWidth: 5,
            height: 25,
            barColor: '#0E9BE2'
        };
    
        $('#mini-bar-chart1').sparkline(values2[0], paramsBar);
        paramsBar.barColor = '#7CAC25';
        $('#mini-bar-chart2').sparkline(values2[1], paramsBar);
        paramsBar.barColor = '#FF4402';
        $('#mini-bar-chart3').sparkline(values2[2], paramsBar);
        paramsBar.barColor = '#ff9800';
        $('#mini-bar-chart4').sparkline(values2[3], paramsBar);
        paramsBar.barColor = '#777';
        $('#mini-bar-chart5').sparkline(values2[4], paramsBar);
    
        // negative values;
        $('#mini-bar-negative').sparkline('html', paramsBar);
    
        // stacked bar
        $('#mini-bar-stacked').sparkline('html', paramsBar);
    
        // composite bar
        $('#demo-sparkline-compositebar').sparkline('html', {
            type: 'bar',
            barColor: '#7CAC25',
            barWidth: 5,
            height: 25,
        });    
        $('#demo-sparkline-compositebar').sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6], {
            composite: true,
            fillColor: false,
            lineColor: '#777',
        });   
    
        // MINI PIE CHARTS
        var paramsPie = {
            type: "pie",
            width: '30px',
            height: '30px',
            sliceColors: ["#0E9BE2", "#ff9800", "#7CAC25"]
        };
    
        $('#mini-pie-chart1').sparkline('html', paramsPie);
        $('#mini-pie-chart2').sparkline('html', paramsPie);
        $('#mini-pie-chart3').sparkline('html', paramsPie);
        $('#mini-pie-chart4').sparkline('html', paramsPie);
        $('#mini-pie-chart5').sparkline('html', paramsPie);
        $('#mini-pie-chart6').sparkline('html', paramsPie);
    
    
        function getRandomValues() {
            // data setup
            var values = new Array(20);
    
            for (var i = 0; i < values.length; i++) {
                values[i] = [5 + randomVal(), 10 + randomVal(), 15 + randomVal(), 20 + randomVal(), 30 + randomVal(),
                    35 + randomVal(), 40 + randomVal(), 45 + randomVal(), 50 + randomVal()
                ];
            }
    
            return values;
        }    
        function randomVal() {
            return Math.floor(Math.random() * 80);
        }    
    }

    $('.sparkline-pie').sparkline('html', {
        type: 'pie',
        offset: 90,
        width: '150px',
        height: '150px',
        sliceColors: ['#cd201f', '#ffc107', '#28a745']
    });

    $('.sparkline-bar').sparkline('html', {
        type: 'bar',
        height: '150px',
        barWidth: 15,
        barSpacing: 5,
        zeroColor: '#undefined '
    });

    $('.sparkline-line').sparkline('html', {
        type: 'line',
        width: '100%',
        height: '150px',
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
    });

    $("#sparkline14").sparkline([0, 23, 43, 35, 44, 45, 56, 37, 40, 45, 56, 7, 10], {
        type: 'line',
        width: '100%',
        height: '100',
        lineColor: '#7868da',
        fillColor: 'transparent',
        spotColor: '#fff',
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined
    });

    $('#sparkline16').sparkline([15, 23, 45, 20, 54, 45, 35, 57, 30], {
        type: 'line',
        width: '100%',
        height: '100',
        chartRangeMax: 50,
        resize: true,
        lineColor: '#51aaed',
        fillColor: '#60bafd',
        highlightLineColor: 'rgba(0,0,0,.1)',
        highlightSpotColor: 'rgba(0,0,0,.2)',
    });

    $('#sparkline16').sparkline([8, 17, 13, 14, 10, 16, 17, 20, 12, 27], {
        type: 'line',
        width: '100%',
        height: '100',
        chartRangeMax: 40,
        lineColor: '#40c77c',
        fillColor: '#50d38a',
        composite: true,
        resize: true,
        highlightLineColor: 'rgba(0,0,0,.1)',
        highlightSpotColor: 'rgba(0,0,0,.2)',
    });

});