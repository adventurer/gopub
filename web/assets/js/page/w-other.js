
$(function() {
    "use strict";

    $(document).ready(function() {
        var chart = c3.generate({
            bindto: '#chart-emails',
            padding: {
            bottom: 24,
            top: 0
        },
        data: {
                type: 'donut',
                names: {
                data1: 'Open',
                data2: 'Bounce',
                data3: 'Unsubscribe',
            },
                columns: [
                    ['data1', 30],
                    ['data2', 50],
                    ['data3', 25],
                ],
                colors: {
                    data1: buzzer.colors.blue,
                    data2: buzzer.colors.red,
                    data3: buzzer.colors.yellow,
                }
            },
            donut: {
                label: {
                    show: false
                }
            },
            legend: {
                show: true
            },

        });
    });

    $(document).ready(function() {
        var chart = c3.generate({
            bindto: '#chart-visitors',
            padding: {
                bottom: 24
            },
            data: {
                x: 'x',
                names: {
                    data1: 'Referral',
                    data2: 'Calls',
                    data3: 'Prospects',
                },
                columns: [
                    ['x', '2013-07-12', '2013-07-13', '2013-07-14', '2013-07-15', '2013-07-16', '2013-07-17', '2013-07-18', '2013-07-19', '2013-07-20', '2013-07-21', '2013-07-22'],
                    ['data1', 22, 28, 21, 46, 48, 38, 48, 52, 28, 57, 32],
                    ['data2', 72, 61, 102, 104, 132, 86, 74, 108, 78, 106, 144],
                    ['data3', 125, 100, 72, 132, 154, 141, 178, 142, 146, 72, 186],
                ],
                types: {
                    data1: 'area',
                }
            },
            point: {
                show: false
            },
            legend: {
                position: 'top',
                padding: 16
            },
            transition: {
                duration: 0
            },
            axis: {
                y: {
                    tick: {
                        fit: true
                    }
                },
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%d %b'
                    },
                    padding: {
                        top: 10,
                        bottom: 0
                    }
                }
            },
            grid: {
                y: {
                    show: true
                }
            },
            color: {
                pattern: [
                    '#fca328',
                    '#7bd235',
                    '#76befe',
                ]
            }
        });
    });

    $(document).ready(function() {
        var chart = c3.generate({
            bindto: '#chart-bg-users',
            padding: {
                bottom: -10,
                left: -1,
                right: -1
            },
            data: {
                names: {
                    data1: 'Users online'
                },
                columns: [
                    ['data1', 30, 40, 10, 40, 12, 22, 40]
                ],
                type: 'area'
            },
            legend: {
                show: false
            },
            transition: {
                duration: 0
            },
            point: {
                show: false
            },
            tooltip: {
                format: {
                    title: function (x) {
                        return '';
                    }
                }
            },
            axis: {
                y: {
                    padding: {
                        bottom: 0,
                    },
                    show: false,
                    tick: {
                        outer: false
                    }
                },
                x: {
                    padding: {
                        left: 0,
                        right: 0
                    },
                    show: false
                }
            },
            color: {
                pattern: ['#467fcf']
            }
        });
    });

    $(document).ready(function(){
        var chart = c3.generate({
            bindto: '#chart-tasks', // id of chart wrapper
            data: {
                columns: [
                    // each columns data
                    ['data1', 0, 0, 1, 2, 21, 9, 12, 10, 31, 13, 65, 10, 12, 6, 4, 3, 0],
                    ['data2', 0, 0, 1, 2, 7, 5, 6, 8, 24, 7, 12, 5, 6, 3, 2, 2, 0],
                    ['data3', 0, 0, 1, 0, 2, 0, 1, 0, 2, 3, 0, 2, 3, 2, 1, 0, 0]
                ],
                classes: {
                    data1: 'filled',
                    data2: 'filled',
                    data3: 'filled'
                },
                type: 'line', // default type of chart
                groups: [
                    [ 'data1', 'data2', 'data3']
                ],
                colors: {
                    'data1': buzzer.colors["blue"],
                    'data2': buzzer.colors["lime"],
                    'data3': buzzer.colors["orange"]
                },
                names: {
                    // name of each serie
                    'data1': 'New',
                    'data2': 'Completed',
                    'data3': 'Closed'
                }
            },
            axis: {
                y: {
                    padding: {
                        bottom: 0,
                    },
                    show: false,
                        tick: {
                        outer: false
                    }
                },
                x: {
                    padding: {
                        left: 0,
                        right: 0
                    },
                    show: false
                }
            },
            legend: {
                position: 'inset',
                padding: 0,
                inset: {
                    anchor: 'top-left',
                    x: 20,
                    y: 8,
                    step: 10
                }
            },
            tooltip: {
                format: {
                    title: function (x) {
                        return '';
                    }
                }
            },
            padding: {
                bottom: 0,
                left: -1,
                right: -1
            },
            point: {
                show: false
            }
        });
    });

    $(document).ready(function() {
        var chart = c3.generate({
            bindto: '#chart-bg-revenue',
            padding: {
                bottom: -10,
                left: -1,
                right: -1
            },
            data: {
                names: {
                    data1: 'Users online'
                },
                columns: [
                    ['data1', 30, 40, 10, 40, 12, 22, 40]
                ],
                type: 'area'
            },
            legend: {
                show: false
            },
            transition: {
                duration: 0
            },
            point: {
                show: false
            },
            tooltip: {
                format: {
                    title: function (x) {
                        return '';
                    }
                }
            },
            axis: {
                y: {
                    padding: {
                        bottom: 0,
                    },
                    show: false,
                    tick: {
                        outer: false
                    }
                },
                x: {
                    padding: {
                        left: 0,
                        right: 0
                    },
                    show: false
                }
            },
            color: {
                pattern: ['#f1c40f']
            }
        });
    });

    $(document).ready(function(){
        var data = {"DE-BE":11,"DE-ST":43,"DE-RP":4,"DE-BB":65,"DE-NI":4,"DE-MV":24,"DE-TH":45,"DE-BW":7,"DE-HH":45,"DE-SH":9,"DE-NW":8,"DE-SN":27,"DE-HB":42,"DE-SL":85,"DE-BY":24,"DE-HE":66};

        var markers = [
                {latLng: [52.50, 13.39], name: 'Berlin'},
                {latLng: [53.56, 10.00], name: 'Hamburg'},
                {latLng: [48.13, 11.56], name: 'Munich'},
                {latLng: [50.95, 6.96], name: 'Cologne'},
                {latLng: [50.11, 8.68], name: 'Frankfurt am Main'},
                {latLng: [48.77, 9.17], name: 'Stuttgart'},
                {latLng: [51.23, 6.78], name: 'Düsseldorf'},
                {latLng: [51.51, 7.46], name: 'Dortmund'},
                {latLng: [51.45, 7.01], name: 'Essen'},
                {latLng: [53.07, 8.80], name: 'Bremen'}
        ];
        
        $('#map-germany-svg').vectorMap({
                map: 'de_merc',
                zoomButtons : false,
                zoomOnScroll: false,
                panOnDrag: false,
                backgroundColor: 'transparent',
                markers: markers,
                markerStyle: {
                initial: {
                    fill: buzzer.colors.blue,
                    stroke: '#fff',
                    "stroke-width": 1,
                    r: 5
                },
                },
                onRegionTipShow: function(e, el, code, f){
                el.html(el.html() + (data[code] ? ': <small>' + data[code]+'</small>' : ''));
                },
                series: {
                regions: [{
                    values: data,
                    scale: ['#EFF3F6', buzzer.colors.blue],
                    normalizeFunction: 'polynomial'
                }]
                },
                regionStyle: {
                initial: {
                    fill: '#F4F4F4'
                }
                }
        });
    });

    $(document).ready(function(){
        var data = {"AF":16.63,"AL":11.58,"DZ":158.97,"AO":85.81,"AG":1.1,"AR":351.02,"AM":8.83,"AU":1219.72,"AT":366.26,"AZ":52.17,"BS":7.54,"BH":21.73,"BD":105.4,"BB":3.96,"BY":52.89,"BE":461.33,"BZ":1.43,"BJ":6.49,"BT":1.4,"BO":19.18,"BA":16.2,"BW":12.5,"BR":2023.53,"BN":11.96,"BG":44.84,"BF":8.67,"BI":1.47,"KH":11.36,"CM":21.88,"CA":1563.66,"CV":1.57,"CF":2.11,"TD":7.59,"CL":199.18,"CN":5745.13,"CO":283.11,"KM":0.56,"CD":12.6,"CG":11.88,"CR":35.02,"CI":22.38,"HR":59.92,"CY":22.75,"CZ":195.23,"DK":304.56,"DJ":1.14,"DM":0.38,"DO":50.87,"EC":61.49,"EG":216.83,"SV":21.8,"GQ":14.55,"ER":2.25,"EE":19.22,"ET":30.94,"FJ":3.15,"FI":231.98,"FR":2555.44,"GA":12.56,"GM":1.04,"GE":11.23,"DE":3305.9,"GH":18.06,"GR":305.01,"GD":0.65,"GT":40.77,"GN":4.34,"GW":0.83,"GY":2.2,"HT":6.5,"HN":15.34,"HK":226.49,"HU":132.28,"IS":12.77,"IN":1430.02,"ID":695.06,"IR":337.9,"IQ":84.14,"IE":204.14,"IL":201.25,"IT":2036.69,"JM":13.74,"JP":5390.9,"JO":27.13,"KZ":129.76,"KE":32.42,"KI":0.15,"KR":986.26,"UNDEFINED":5.73,"KW":117.32,"KG":4.44,"LA":6.34,"LV":23.39,"LB":39.15,"LS":1.8,"LR":0.98,"LY":77.91,"LT":35.73,"LU":52.43,"MK":9.58,"MG":8.33,"MW":5.04,"MY":218.95,"MV":1.43,"ML":9.08,"MT":7.8,"MR":3.49,"MU":9.43,"MX":1004.04,"MD":5.36,"MN":5.81,"ME":3.88,"MA":91.7,"MZ":10.21,"MM":35.65,"NA":11.45,"NP":15.11,"NL":770.31,"NZ":138,"NI":6.38,"NE":5.6,"NG":206.66,"false":413.51,"OM":53.78,"PK":174.79,"PA":27.2,"PG":8.81,"PY":17.17,"PE":153.55,"PH":189.06,"PL":438.88,"PT":223.7,"QA":126.52,"RO":158.39,"RU":1476.91,"RW":5.69,"WS":0.55,"ST":0.19,"SA":434.44,"SN":12.66,"RS":38.92,"SC":0.92,"SL":1.9,"SG":217.38,"SK":86.26,"SI":46.44,"SB":0.67,"ZA":354.41,"ES":1374.78,"LK":48.24,"KN":0.56,"LC":1,"VC":0.58,"SD":65.93,"SR":3.3,"SZ":3.17,"SE":444.59,"CH":522.44,"SY":59.63,"TW":426.98,"TJ":5.58,"TZ":22.43,"TH":312.61,"TL":0.62,"TG":3.07,"TO":0.3,"TT":21.2,"TN":43.86,"TR":729.05,"TM":0,"UG":17.12,"UA":136.56,"AE":239.65,"GB":2258.57,"US":14624.18,"UY":40.71,"UZ":37.72,"VU":0.72,"VE":285.21,"VN":101.99,"YE":30.02,"ZM":15.69,"ZW":5.5};

        var markers = false;
        $('#map-world-svg').vectorMap({
            map: 'world_mill',
            zoomButtons : false,
            zoomOnScroll: false,
            panOnDrag: false,
            backgroundColor: 'transparent',
            markers: markers,
            markerStyle: {
                initial: {
                    fill: buzzer.colors.blue,
                    stroke: '#fff',
                    "stroke-width": 1,
                    r: 5
                },
            },
            onRegionTipShow: function(e, el, code, f){
                el.html(el.html() + (data[code] ? ': <small>' + data[code]+'</small>' : ''));
            },
            series: {
                regions: [{
                    values: data,
                    scale: ['#EFF3F6', buzzer.colors.blue],
                    normalizeFunction: 'polynomial'
                }]
            },
            regionStyle: {
                initial: {
                    fill: '#F4F4F4'
                }
            }
        });
    });

});
                    