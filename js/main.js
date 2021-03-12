var selectedMcc = 222;
var selectedMnc = 88;

$(document).ready(function () {
    $("#searchTower").on('click', function () {
        clearMapFromMarkers();
        cells = $('#inputCellId').val();
        if (cells.indexOf(",") == -1) {
            searchCell(cells);
        } else {
            cells = $('#inputCellId').val().split(",");
            $(cells).each(function (index, item) {
                searchCell(item);
            });
        }
    });

    $("#searchTowerAllSectors").on('click', function () {
        clearMapFromMarkers();
        console.log("Searching all sectors...");
        enodeb = $('#inputEnodeB').val();
        baseCellId = enodeb * 256;
        switch (selectedMnc) {
            case 88: {
                cells = [baseCellId, baseCellId + 1, baseCellId + 2, baseCellId + 3, baseCellId + 6, baseCellId + 7, baseCellId + 8, baseCellId + 9, baseCellId + 12, baseCellId + 13, baseCellId + 14, baseCellId + 15, baseCellId + 18, baseCellId + 19, baseCellId + 20, baseCellId + 21];
                break;
            }
            case 1: { // TIM TO DO
                cells = [baseCellId + 1, baseCellId + 2, baseCellId + 3, baseCellId + 6, baseCellId + 7, baseCellId + 8, baseCellId + 9, baseCellId + 12, baseCellId + 13, baseCellId + 14, baseCellId + 15, baseCellId + 18, baseCellId + 19, baseCellId + 20, baseCellId + 21];
                break;
            }
            case 10: {
                cells = [baseCellId + 11, baseCellId + 12, baseCellId + 13, baseCellId + 14, baseCellId + 31, baseCellId + 32, baseCellId + 33, baseCellId + 34, baseCellId + 41, baseCellId + 42, baseCellId + 43, baseCellId + 44, baseCellId + 51, baseCellId + 52, baseCellId + 53, baseCellId + 54];
                break;
            }
            case 50: {
                cells = [baseCellId + 21, baseCellId + 22, baseCellId + 23, baseCellId + 61, baseCellId + 62, baseCellId + 63, baseCellId + 81, baseCellId + 82, baseCellId + 83];
                break;
            }
        }

        $(cells).each(function (index, item) {
            searchCell(item);
        });
    });

    /* Calcolo CellID al variare di eNodeB e settore */
    $("#inputEnodeB, #inputSector").on('input', function () {
        //console.log("Cambio enodeb");
        $('#inputCellId').val($('#inputEnodeB').val() * 256 + parseInt($('#inputSector').val() ? $('#inputSector').val() : 0));
    });

    /* Calcolo eNodeB e settore al variare del CellID */
    $("#inputCellId").on('input', function () {
        //console.log("Cambio enodeb");
        $('#inputEnodeB').val(parseInt($('#inputCellId').val() / 256));
        $('#inputSector').val(parseInt($('#inputCellId').val() % 256));
    });

    /* Imposto MNC al variare dell'operatore da input */
    $("#inputOperator").on('change', function () {
        switch ($("#inputOperator option:selected").val()) {
            case "1": {
                selectedMnc = 88;
                break;
            }
            case "2": {
                selectedMnc = 10;
                break;
            }
            case "3": {
                selectedMnc = 1;
                break;
            }
            case "4": {
                selectedMnc = 50;
                break;
            }
        }
    });
});

function searchCell(cellId) {
    switch ($('#inputProvider option:selected').val()) {
        case "1": {
            //console.log("Querying google...");
            queryGoogle(cellId, selectedMcc, selectedMnc);
            break;
        }
        case "2": {
            console.log("Unwired");
            break;
        }
        default:
            console.log("Scemo");
    }
}

function generateCellDescription(mcc, mnc, cellId) {
    mcc = parseInt(mcc);
    mnc = parseInt(mnc);
    cellId = parseInt(cellId);
    var desc;
    switch (mnc) {
        /* WindTre */
        case 88:
        case 99: {
            switch ((cellId % 256)) {
                case 0:
                case 1:
                case 2:
                case 3: {
                    desc = "B3 ";
                    break;
                }
                case 6:
                case 7:
                case 8:
                case 9: {
                    desc = "B20 ";
                    break;
                }
                case 12:
                case 13:
                case 14:
                case 15: {
                    desc = "B7 ";
                    break;
                }
                case 18:
                case 19:
                case 20:
                case 21: {
                    desc = "B1 ";
                    break;
                }
            }
            switch ((cellId - (parseInt(cellId / 256) * 256)) % 6) {
                case 0: {
                    desc += "S1 ";
                    break;
                }
                case 1: {
                    desc += "S2 ";
                    break;
                }
                case 2: {
                    desc += "S3 ";
                    break;
                }
                case 3: {
                    desc += "S4 ";
                    break;
                }
            }
            break;
        }
        /* TIM */
        case 01: {
            switch ((cellId % 256)) {
                case 31:
                case 32:
                case 33:
                case 34: {
                    desc = "B3 ";
                    break;
                }
                case 11:
                case 12:
                case 13:
                case 14: {
                    desc = "B20 ";
                    break;
                }
                case 51:
                case 52:
                case 53:
                case 54: {
                    desc = "B7 ";
                    break;
                }
                case 41:
                case 42:
                case 43:
                case 44: {
                    desc = "B1 ";
                    break;
                }
            }
            switch ((cellId - (parseInt(cellId / 256) * 256)) % 10) {
                case 1: {
                    desc += "S1 ";
                    break;
                }
                case 2: {
                    desc += "S2 ";
                    break;
                }
                case 3: {
                    desc += "S3 ";
                    break;
                }
                case 4: {
                    desc += "S4 ";
                    break;
                }
            }
            break;
        }
        /* Vodafone */
        case 10: {
            break;
        }
        /* Iliad */
        case 50: {
            switch ((cellId % 256)) {
                case 21:
                case 22:
                case 23: {
                    desc = "B1 ";
                    break;
                }
                case 81:
                case 82:
                case 83: {
                    desc = "B3 ";
                    break;
                }
                case 61:
                case 62:
                case 63: {
                    desc = "B7 ";
                    break;
                }
            }
            switch ((cellId - (parseInt(cellId / 256) * 256)) % 10) {
                case 1: {
                    desc += "S1 ";
                    break;
                }
                case 2: {
                    desc += "S2 ";
                    break;
                }
                case 3: {
                    desc += "S3 ";
                    break;
                }
            }
            break;
        }
    }
    desc += parseInt(cellId / 256) + "/" + parseInt(cellId % 256) + "<br>" + cellId;
    return desc;
}



function queryUnwiredlabs() {
    $.ajax({
        type: 'POST',
        // make sure you respect the same origin policy with this url:
        // http://en.wikipedia.org/wiki/Same_origin_policy
        url: 'https://unwiredlabs.com/v2/process.php&format=json',
        data: {
            'token': '',
            'radio': 'lte',
            'mcc': selectedMcc,
            'mnc': selectedMnc,
            'cells': {
                "lac": 1,
                "cid": 123456
            }
        },
        success: function (msg) {
            alert('wow' + msg);
        }
    });
}


function queryGoogle(cellId, mcc, mnc) {
    var jsonQuery = {
        "homeMobileCountryCode": mcc,
        "homeMobileNetworkCode": mnc,
        "radioType": "lte",
        "carrier": "WindTre",
        "considerIp": "false",
        "cellTowers": [{
            "cellId": cellId,
            "locationAreaCode": 35632,
            "mobileCountryCode": mcc,
            "mobileNetworkCode": mnc
            //"age": 0,
            //"signalStrength": -60,
            //"timingAdvance": 15
        }]
    };

    $.ajax({
        type: 'POST',
        url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=',
        contentType: 'Content-Type: application/json',
        dataType: 'json',
        data: JSON.stringify(jsonQuery),
        success: function (msg) {
            //console.log("Risultato Google", msg);
            addMarkerToCluster(msg.location.lat, msg.location.lng, cellId);
            showMarkerCluster();
        },
        error: function (err) {
            console.log("Errore: ", err);
        }
    });
}