const STEXUPERY_NORMAL_COST = 12
const STEXUPERY_EXTRA_COST = 17

const PARTDIEU_NORMAL_COST = 10
const PARTDIEU_EXTRA_COST = 15

const SHIFT_LOCATION = {
    STEXUPERY: 1,
    PARTDIEU: 2
}

// Shift obj
export default class Shift {

    constructor( data ) {
        if( data ) {
            this.m_id = data.id ? data.id : null
            this.m_date = data.date ? data.date : null
            this.m_start = data.start ? data.start : null
            this.m_end = data.end ? data.end : null
            this.m_location = data.location ? data.location : null
            this.m_bonus = data.bonus ? data.bonus : null
        }

    }

    // ##################
    // ##### Setter #####
    // ##################

    set id( _id ) {
        if( _id !== null ) this.m_id = _id

        return this.m_id
    }

    set date( _date ) {
        if( _date ) {
            if( _date instanceof Date && !isNaN( _date.valueOf() ) ) this.m_date = _date
            else {
                const newDate = new Date( _date )
                if( newDate instanceof Date && !isNaN( newDate.valueOf() ) ) this.m_date = newDate
                else return null
            }
        }

        return this.m_date
    }

    /*
     * Set shift start time in minute
     */
    set start( _start ) {
        if( parseInt( _start ) >= 0 ) this.m_start = _start
        else return null

        return this.m_start
    }

    /*
     * Set shift end time in minute
     */
    set end( _end ) {
        if( parseInt( _end ) >= 0 ) this.m_end = _end
        else return null

        return this.m_end
    }

    /*
     * Set shift shift location by ENUM value
     */
    set location( _location ) {
        switch( _location ) {
            case SHIFT_LOCATION.STEXUPERY:
                this.m_location = SHIFT_LOCATION.STEXUPERY
                break
            case SHIFT_LOCATION.PARTDIEU:
                this.m_location = SHIFT_LOCATION.PARTDIEU
                break
            default:
                console.log("Wrong place")
                return null
        }

        return this.m_location
    }

    /*
     * Set shift bonus in €/100
     */
    set bonus( _bonus ) {
        if( parseInt( _bonus ) >= 0 ) this.m_bonus = _bonus
        else return null

        return this.m_bonus
    }

    // ##################
    // ##### Getter #####
    // ##################

    get id() {
        return this.m_id
    }

    get Date() {
        return this.m_date
    }

    /*
     * Get shift start time in minute
     */
    get start() {
        return this.m_start
    }

    /*
     * Get shift end time in minute
     */
    get end() {
        return this.m_end
    }

    /*
     * Get shift location ENUM value
     */
    get location() {
        return this.m_location
    }

    /*
     * Get shift location string name
     */
    get locationName() {
        switch( this.m_location ) {
            case SHIFT_LOCATION.PARTDIEU:
                return "Gare Part-Dieu"
                break
            case SHIFT_LOCATION.STEXUPERY:
                return "Aéroport Lyon Saint Exupery"
                break
            default:
                return "Wrong shift location"
        }
    }

    /*
     * Get shift bonus in €/100
     */
    get bonus() {
        return this.m_bonus
    }

    // ##################
    // ##### METHOD #####
    // ##################

    /*
     * Get shift start time string format
     * "hh" + _format + "mm"
     */
    getFormatedStart( _format = "" ) {
        let hour = Math.trunc(this.m_start / 60)
        let minute = (this.m_start % 60 ).toString()
        if( minute.length === 1 ) minute = "0" + minute

        return hour + _format + minute
    }

    /*
     * Get shift end time string format
     * "hh" + _format + "mm"
     */
    getFormatedEnd( _format = "" ) {
        const hour = Math.trunc(this.m_end / 60 ).toString()
        let minute = (this.m_end % 60 ).toString()
        if( minute.length === 1 ) minute = "0" + minute

        return hour + _format + minute
    }

    /*
     * Get total shift worked time in minute
     */
    getWorkedTime() {
        return this.m_end - this.m_start
    }

    /*
     * Get total shift worked time in minute by day division
     * { "morningWorkedTime", "dayWorkedTime", "nightWorkedTime" }
     */
    getWorkedTimes() {
        const day_start = 8 * 60
        const night_start = 20 * 60

        let morningWorkedTime = 0
        let dayWorkedTime = 0
        let nightWorkedTime = 0

        let workedTimeRemaining = this.m_end - this.m_start
        let tmp_start = this.m_start

        if( tmp_start < day_start ) { // si commence le matin
            if( this.m_end < day_start ) { // si termine le matin
                morningWorkedTime = workedTimeRemaining
                workedTimeRemaining = 0
            }
            else { // si termine après le matin
                morningWorkedTime = day_start - tmp_start
                tmp_start = day_start
                workedTimeRemaining -= morningWorkedTime
            }
        }
        if( tmp_start < night_start ) { // si commence / continue la journée
            if( this.m_end < night_start ) { // si termine la journée
                dayWorkedTime = workedTimeRemaining
                workedTimeRemaining = 0
            }
            else { // si termine après la journée
                dayWorkedTime = night_start - tmp_start
                tmp_start = night_start
                workedTimeRemaining -= dayWorkedTime
            }
        }
        if( workedTimeRemaining > 0 ) { // temsp restznt pour le soir
            nightWorkedTime = workedTimeRemaining
            workedTimeRemaining = 0
        }

        return { "morningWorkedTime": morningWorkedTime, "dayWorkedTime": dayWorkedTime, "nightWorkedTime": nightWorkedTime }

    }

    /*
     * Get shift earn money for the worked time in €/100
     */
    get earn() {
        const workedTimes = this.getWorkedTimes()
        let cost = 0;

        switch( this.m_location ) {
            case SHIFT_LOCATION.PARTDIEU:
                cost = (workedTimes.morningWorkedTime + workedTimes.nightWorkedTime) * (PARTDIEU_EXTRA_COST/.6)
                    + workedTimes.dayWorkedTime * (PARTDIEU_NORMAL_COST/.6)
                    + this.bonus
                break
            case SHIFT_LOCATION.STEXUPERY:
                cost = (workedTimes.morningWorkedTime + workedTimes.nightWorkedTime) * (STEXUPERY_EXTRA_COST/.6)
                    + workedTimes.dayWorkedTime * (STEXUPERY_NORMAL_COST/.6)
                    + this.bonus
                break
            default:
                console.log("Wrong shift location")
        }

        return Math.round(cost)
    }
}

/*

const testShift = new Shift({
    id: 2,
	date: "27/04/2020",
	start: 450,
	end: 510,
	location: 1,
	bonus: 1
})
console.log("start : " + testShift.start)
console.log("formated start : " + testShift.getFormatedStart("h"))
console.log("end : " + testShift.end)
console.log("formated end : " + testShift.getFormatedEnd("h"))
console.log("location name : " + testShift.locationName)
console.log("bonus : " + testShift.bonus)
console.log("worked time : " + testShift.getWorkedTime())
console.log("worked times : ")
console.log(testShift.getWorkedTimes())
console.log("Gain : " + testShift.earn)

 */