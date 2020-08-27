$(function () {
    console.log("##################################")
    console.log("# Welcome in this ShiftManager ! #")
    console.log("##################################")
    console.log("\n")

    //Show
    update_show()

    //Config
    console.log("ShiftManager initialization...")
    setup_datepicker()
    setup_timepicker()
    //setup_wickedpicker()
    setup_bootstrap_tooltips()
    console.log("--->\tinitialization done !")
    console.log("\n")

    //Calculation
    handle_formSubmit()
    handle_shiftList_wipeOut()

    //Test area
    //test_app()

})


// setup function
function setup_datepicker() {
    $.datepicker.regional['fr'] = {
        closeText: 'Fermer',
        prevText: 'Précédent',
        nextText: 'Suivant',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
        monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
        dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
        dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
        dayNamesMin: ['D','L','M','M','J','V','S'],
        weekHeader: 'Sem.',
        dateFormat: 'mm/dd/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    }
    $.datepicker.setDefaults($.datepicker.regional['fr'])
    $('#newShift_date').datepicker()
    $('[id^=editShift_date_]').datepicker()
}

function setup_wickedpicker() {
    var wickedpicker_options = {
        twentyFour: true, //Display 24 hour format, defaults to false
        title: 'Heure', //The Wickedpicker's title,
    }
    $("#newShift_start").click(function () {
        $(this).wickedpicker(wickedpicker_options)
    })
    $("#newShift_end").click(function () {
        $(this).wickedpicker(wickedpicker_options)
    })
}

function setup_timepicker() {
    var timepicker_options = {
        scrollDefault: 'now',
        timeFormat: 'H:i', //Display 24 hour format
        step: 1,
    }
    $(".timepicker").timepicker(timepicker_options)
}

function setup_bootstrap_tooltips() {
    $('.tooltip').remove()
    $('[data-toggle="tooltip"]').tooltip()
}

// show
function show_shiftList( _shifts ) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    const htmlTableBody = _shifts.map(function (shift) {
        let row =
            "<tr id='shift_"+ shift.getId() + "'>" +
            "<td>" + shift.getDate().toLocaleDateString('fr-FR', options) + "</td>" +
            "<td>" + shift.getFormatedStart("h") + "</td>" +
            "<td>" + shift.getFormatedEnd("h") + "</td>"

        switch( shift.getLocation() ) {
            case SHIFT_LOCATION.STEXUPERY:
                row += "<td>Aéroport St Exupéry</td>"
                break
            case SHIFT_LOCATION.PARTDIEU:
                row += "<td>Gare Part-Dieu</td>"
                break
            default:
                break
        }

        row +=
            "<td>" + shift.getBonus() + " € </td>" +
            "<td>" + shift.getCost().toFixed(2) + " € </td>" +
            "<td>" +
                "<div class='btn-group' role='group'>" +
                    "<button type='button' class='btn btn-sm btn-outline-warning' id='edit_shift_" + shift.getId() + "' data-toggle='tooltip' data-placement='right' title='Edit shift'>Edit</button>" +
                    "<button type='button' class='btn btn-sm btn-outline-danger' id='remove_shift_" + shift.getId() + "' data-toggle='tooltip' data-placement='left' title='Remove shift' >Remove</button>" +
                "</div>" +
            "</td>"

        /*
        row +=
            "<td>" + shift.getBonus() + " € </td>" +
            "<td>" + shift.getCost().toFixed(2) + " € </td>" +
            "<td>" +
                "<div class='btn-group' role='group'>" +
                    "<span data-toggle='tooltip' data-placement='right' title='Edit shift'>" +
                        "<button type='button' data-toggle='modal' data-target='#editShift_modal_" + shift.id + "' class='btn btn-sm btn-outline-warning' id='edit_shift_" + shift.getId() + "'>Edit</button>" +
                    "</span> <!-- Button trigger modal -->" +
                    "<div class='modal fade' id='editShift_modal_" + shift.id + "' tabindex='-1' role='dialog' aria-hidden='true'>" +
                        "<div class='modal-dialog modal-dialog-centered' role='document'>" +
                            "<div class='modal-content'>" +
                                "<div class='modal-header'>" +
                                    "<h5 class='modal-title text-danger'>Modal title</h5>" +
                                    "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
                                        "<span aria-hidden='true'>&times;</span>\n" +
                                    "</button>" +
                                "</div>" +
                                "<div class='modal-body'>" +
                                    "<form id='newShift_form'>" +
                                        "<div class='form'>" +
                                            "<div class='col'>" +
                                                "<div class='input-group'>" +
                                                    "<div class='input-group-prepend'>" +
                                                        "<div class='input-group-text'><i class='far fa-calendar-alt' style='width: 2rem'></i></div>" +
                                                    "</div>" +
                                                    "<input type='text' id='editShift_date_" + shift.id + "' class='form-control' placeholder='Date' required>" +
                                                "</div>" +
                                            "</div> <!-- newShift_date -->" +
                                            "<div class='col'>" +
                                                "<div class='input-group'>" +
                                                    "<div class='input-group-prepend'>" +
                                                        "<div class='input-group-text'><i class='fas fa-clock'></i></div>" +
                                                    "</div>" +
                                                    "<input type='text' id='editShift_start' class='form-control timepicker' placeholder='Début' required>" +
                                                "</div>" +
                                            "</div> <!-- newShift_start -->" +
                                            "<div class='col'>" +
                                                "<div class='input-group'>" +
                                                    "<div class='input-group-prepend'>" +
                                                        "<div class='input-group-text'><i class='far fa-clock'></i></div>" +
                                                    "</div>" +
                                                    "<input type='text' id='editShift_end' class='form-control timepicker' placeholder='Fin' required>" +
                                                "</div>" +
                                            "</div> <!-- newShift_end -->" +
                                            "<div class='col-md-4'>" +
                                                "<div class='input-group'>" +
                                                    "<div class='input-group-prepend'>" +
                                                        "<div class='input-group-text'><i class='fas fa-map-marked-alt'></i></div>" +
                                                    "</div>" +
                                                    "<select id='editShift_location' class='form-control' required>" +
                                                        "<option value='' disabled selected>Lieux ...</option>" +
                                                        "<option value='1'>Aéroport Saint Exupéry</option>" +
                                                        "<option value='2'>Gare Lyon Part-Dieu</option>" +
                                                    "</select>" +
                                                "</div>" +
                                            "</div> <!-- newShift_location -->" +
                                            "<div class='col'>" +
                                                "<div class='input-group'>" +
                                                    "<div class='input-group-prepend'>" +
                                                        "<div class='input-group-text'><i class='fas fa-euro-sign' style='width: 2rem'></i></div>" +
                                                    "</div>" +
                                                    "<input type='number' step=0.01 id='editShift_majoration_" + shift.id + "' class='form-control' value='" + shift.getBonus() + "'>" +
                                                "</div>" +
                                            "</div> <!-- newShift_majoration -->" +
                                        "</div> <!-- form body -->" +
                                    "</form>" +
                                "</div>" +
                                "<div class='modal-footer'>" +
                                    "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>" +
                                    "<button type='button' class='btn btn-primary' id='editShift_validation_" + shift.id + "' data-dismiss='modal'>Save changes</button>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                    "<button type='button' class='btn btn-sm btn-outline-danger' data-toggle='tooltip' data-placement='left' title='Remove shift' id='remove_shift_" + shift.getId() + "'>Remove</button>" +
                "</div>" +
            "</td>" +
         "</tr>"
         */

        return row
    })

    $("#shiftList_table tbody").empty()
    htmlTableBody.forEach((item) => $("#shiftList_table tbody").append(item))
}

function show_shitsSummary( _shift ) {
    //calcul
    let total_hourNormal = 0
    let total_hourSup = 0
    let total_bonus = 0
    let total_cost = 0

    _shift.forEach(function ( shift ) {
        const workedTimes = shift.getWorkedTimes();
        total_hourNormal += workedTimes.dayWorkedTime
        total_hourSup += workedTimes.nightWorkedTime + workedTimes.morningWorkedTime
        total_bonus += shift.getBonus()
        total_cost += shift.getCost()
    })

    let total_hourNormal_hour = Math.trunc( total_hourNormal / 60 ).toString()
    let total_hourNormal_minute = ( total_hourNormal % 60 ).toString()
    if( total_hourNormal_minute.length == 1 ) total_hourNormal_minute = "0" + total_hourNormal_minute

    let total_hourSup_hour = Math.trunc( total_hourSup / 60 ).toString()
    let total_hourSup_minute = ( total_hourSup % 60 ).toString()
    if( total_hourSup_minute.length == 1 ) total_hourSup_minute = "0" + total_hourSup_minute

    const html =
        "<tr>" +
            "<td><span class='font-weight-bold'>Heures de jour :</span> " + total_hourNormal_hour + "h" + total_hourNormal_minute + "</td>" +
            "<td><span class='font-weight-bold'>Heures de nuit :</span> " + total_hourSup_hour + "h" + total_hourSup_minute + "</td>" +
            "<td><span class='font-weight-bold'>Rémunération :</span> " + total_cost.toFixed(2) + " € <span class='text-muted font-weight-light font-italic' style='font-size: 0.75rem'>(" + total_bonus.toFixed(2) + " € de bonus)</span></td>" +
        "</tr>"

    $("#shiftSummary_table").empty()
    $("#shiftSummary_table").append(html)
}

function show_alert( _alert ) { /* TODO : display things about adding, editing, removing */
    /*
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
     */
}

// handle
function handle_formSubmit() {
    $('#newShift_form').submit(function ( event ) {
        event.preventDefault()
        const newShift = compute_newShift_form()
        if( newShift ) {
            save_shift_toLocalStorage( newShift )
            update_show()
        }
    })
}

function handle_shiftList_wipeOut() {
    $("#wipeOut_shiftList_validation").click(function () {
        clean_current_localStorage()
        update_show()
    })
}

function handle_shiftEdit() {
    $('[id^=edit_shift_]').click( function () {
        const shift_id = this.id.split("_")[2]
        console.log( "shift_" + shift_id )
        toggle_shiftEdit( shift_id )
    })
}

function handle_shiftRemove() {
    $('[id^=remove_shift_]').click( function () {
        const shift_id = this.id.split("_")[2]
        remove_fromLocalStorage( shift_id )
        update_show()
    })
}

// toggling
function toggle_shiftEdit( _id ) {
    const row = $( "#shift_" + _id )

    let rowHtml =
        "<td>" +
            "<div class='input-group'>" +
                "<div class='input-group-prepend'>" +
                    "<div class='input-group-text'><span class='far fa-calendar-alt'></span></div>" +
                "</div>" +
                "<input type='text' id='editShift_date' class='form-control' placeholder='Date' required>" +
            "</div>" +
        "</td>" +
        "<td></td>" +
        "<td>test</td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td>" +
            "<button id='edit_shift_" + _id + "' class='btn btn-sm btn-outline-warning' data-toggle='tooltip' data-placement='left' title='save edition'>Save edition</button>" +
        "</td>"

    console.log( row )

    row.empty()
    row.append( rowHtml )

    setup_bootstrap_tooltips()
}


// update
function update_show() {
    const saved_shifts = fetch_shifts_fromLocalStorage()
    show_shiftList( saved_shifts )
    show_shitsSummary( saved_shifts )

    handle_shiftEdit()
    handle_shiftRemove()
    setup_bootstrap_tooltips()
}

// computing
function compute_newShift_form() {
    const newShift = new Shift();

    newShift.setDate( $('#newShift_date').val() )
    newShift.setStart( parseInt($('#newShift_start').val().split(" : ")[0]) * 60 + parseInt($('#newShift_start').val().split(" : ")[1]) )
    newShift.setEnd( parseInt($('#newShift_end').val().split(" : ")[0]) * 60 + parseInt($('#newShift_end').val().split(" : ")[1]) )
    newShift.setLocation( parseInt( $('#newShift_location').val() ) )
    newShift.setBonus( parseFloat($('#newShift_majoration').val()) * 100 )

    return newShift
}

function compute_editShift_form( _id ) {
    //verifier les modification
    // modif possible ?
    // modifier objet
    // appliqué au localStorage

    console.log("try to compute edit")
/*
    const shiftToEdit = fetch_shift_fromLocalStorage( _id )
    if( shiftToEdit !== null ) {
        let edited = false;

        if( $( '#editShift_majoration_' + _id ).val() !== "" ) {
            shiftToEdit.setBonus( parseFloat( $( '#editShift_majoration_' + _id ).val() * 100 ) )
            edited = true
        }
        else console.log("bonus not edit")

        if( $( '#editShift_date_' + _id ).val() !== "" ) {
            //shiftToEdit.setBonus( parseFloat( $( '#editShift_date_' + _id ).val() * 100 ) )
            console.log("test date")
            edited = true
        }
        else console.log("bonus not edit")


        if( edited ) {
            console.log("edit saved")

            return edit_fromLocalStorage( _id, shiftToEdit )
        }
    }


    //newShift.setDate( $('#editShift_date').val() )
    //newShift.setStart( parseInt($('#editShift_start').val().split(" : ")[0]) * 60 + parseInt($('#editShift_start').val().split(" : ")[1]) )
    //newShift.setEnd( parseInt($('#editShift_end').val().split(" : ")[0]) * 60 + parseInt($('#editShift_end').val().split(" : ")[1]) )
    //newShift.setLocation( parseInt( $('#editShift_location').val() ) )

    console.log("shift not edited")

    return null

 */
}

// localStorage
function clean_current_localStorage() {
    localStorage.removeItem("currentShiftList")
}

function fetch_shifts_fromLocalStorage() {
    let shifts = [];

    if (localStorage.getItem('currentShiftList') === null) {
        shifts = []
    }
    else {
        JSON.parse(localStorage.getItem("currentShiftList")).forEach(function (item, index) {
            const newShift = new Shift()

            newShift.setId( item.id )
            newShift.setDate( item.date )
            newShift.setStart( item.start )
            newShift.setEnd( item.end )
            newShift.setLocation( parseInt( item.location ) )
            newShift.setBonus( parseInt(item.bonus) )

            shifts.push( newShift )
        })
    }

    return shifts
}

function fetch_shift_fromLocalStorage( _id ) {
    const shifts = JSON.parse(localStorage.getItem("currentShiftList"))

    if( shifts !== null ) {
        const index = shifts.findIndex(item => item.id == _id )

        if( index !== null ) {
            const shift = new Shift()

            shift.setId( shifts[index].id )
            shift.setDate( shifts[index].date )
            shift.setStart( shifts[index].start )
            shift.setEnd( shifts[index].end )
            shift.setLocation( parseInt( shifts[index].location ) )
            shift.setBonus( parseInt(shifts[index].bonus) )

            return shift
        }
    }

    console.log("No shift find")

    return null
}

function save_shift_toLocalStorage( _shift ) {
    let shifts;

    if( localStorage.getItem('currentShiftList') === null ) {
        shifts = []
        _shift.setId(0)
    }
    else {
        shifts = JSON.parse(localStorage.getItem("currentShiftList"))
        _shift.setId( shifts.length )
    }

    shifts.push(_shift)
    localStorage.setItem("currentShiftList", JSON.stringify(shifts))
}

function remove_fromLocalStorage( _id ) {
    const shifts = fetch_shifts_fromLocalStorage()
    console.log(shifts)
    const index = shifts.findIndex(item => item.id == _id )

    shifts.splice( index, 1 )
    clean_current_localStorage()
    shifts.forEach( (item) => save_shift_toLocalStorage(item))
}

function edit_fromLocalStorage( _id, _newShift ) {
    const shifts = fetch_shifts_fromLocalStorage()
    const index = shifts.findIndex(item => item.id == _id )

    shifts[index] = _newShift;
    clean_current_localStorage()
    shifts.forEach( (item) => save_shift_toLocalStorage(item))
}

function save_perma_toLocalStorage() {

}









function add_shiftToList( _shift ) {
    console.log( _shift );
    const htmlTableRow =
        "<tr>" +
            "<td>" + _shift.date + "</td>" +
            "<td>" + _shift.time_start + "</td>" +
            "<td>" + _shift.time_end + "</td>" +
            "<td>" + _shift.location + "</td>" +
            "<td>" + _shift.majoration + "</td>" +
        "</tr>"
    $("#shiftList_table tbody").append(htmlTableRow)
}

// try and test function
function test_app() {
    $('#app').html('<br /><br /><br />Hello in App !')
    $('#app').click(function () {
        console.log("app cliked")
    })
}

/**
 *  TODO :
 *      + compute new shift form to shift obj
 *      + store new shift obj in localStorage temp var
 *      + remove var from localStorage
 *      + get shifts from localStorage
 *      - store new shift obj in localStorage permanente var
 *      + show shift from localstorage
 *      + delete shift from local storage
 *      - edit shift from local starage
 *      + for a shift :
 *          + compute work time
 *          + find shift reward ( work time + bonus )
 *      - compute reaward of each shift of a month
 *      _ fonctione de trie / organisation / date / chrono
 *      - modifier la gestion des modial ( trop de generation )
 *      - modifier la gestion des shift ( tableau en RAM )
 *      - upload sur workshop + utilisation de BDD
 */