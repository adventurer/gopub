
$(function() {
    "use strict";
    var chart = c3.generate({
        bindto: '#development_activity', // id of chart wrapper
        data: {
            columns: [
                // each columns data
                ['data1', 0, 5, 1, 2, 7, 5, 6, 8, 24, 7, 12, 5, 6, 3, 2, 2, 6, 30, 10, 10, 15, 14, 47, 65, 55],
                ['data2', 5, 6, 3, 2, 10, 7, 8, 12, 30, 9, 16, 8, 7, 5, 4, 3, 16, 32, 10, 13, 17, 19, 51, 66, 45]
            ],
            type: 'area', // default type of chart
            groups: [
                [ 'data1', 'data2']
            ],
            colors: {
                'data1': buzzer.colors["blue"],
                'data2': buzzer.colors["indigo"]
            },
            names: {
                // name of each serie
                'data1': 'Purchases',
                'data2': 'Profit'
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
    var chart = c3.generate({
        bindto: '#chart-donut', // id of chart wrapper
        data: {
            columns: [
                // each columns data
                ['data1', 63],
                ['data2', 37]
            ],
            type: 'donut', // default type of chart
            colors: {
                'data1': buzzer.colors["green"],
                'data2': buzzer.colors["green-light"]
            },
            names: {
                // name of each serie
                'data1': 'Maximum',
                'data2': 'Minimum'
            }
        },
        axis: {
        },
        legend: {
            show: false, //hide legend
        },
        padding: {
            bottom: 0,
            top: 0
        },
    });
    var chart = c3.generate({
    bindto: '#chart-pie', // id of chart wrapper
    data: {
    columns: [
    // each columns data
    ['data1', 63],
    ['data2', 44],
    ['data3', 12],
    ['data4', 14]
    ],
    type: 'pie', // default type of chart
    colors: {
    'data1': buzzer.colors["blue-darker"],
    'data2': buzzer.colors["blue"],
    'data3': buzzer.colors["blue-light"],
    'data4': buzzer.colors["blue-lighter"]
    },
    names: {
    // name of each serie
    'data1': 'A',
    'data2': 'B',
    'data3': 'C',
    'data4': 'D'
    }
    },
    axis: {
    },
    legend: {
    show: false, //hide legend
    },
    padding: {
    bottom: 0,
    top: 0
    },
    });    
});
