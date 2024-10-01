inputsArray = []
var isRunning = false

function initInputsData () {
    if(inputsArray.length <= 0){
        var txtwork_min = {
            id:'txtwork_min', validClicks:0, nextControl:'txtwork_sec'
        }
        var txtwork_sec = {
            id:'txtwork_sec', validClicks:0, nextControl:'txtwork_sec'
        }
        var txtrest_min = {
            id:'txtrest_min', validClicks:0, nextControl:'txtrest_sec'
        }
        var txtrest_sec = {
            id:'txtrest_min', validClicks:0, nextControl:'txtwork_min'
        }

        inputsArray[0] = txtwork_min
        inputsArray[1] = txtwork_sec
        inputsArray[2] = txtrest_min
        inputsArray[3] = txtrest_sec
    }
}

function onSelectingTimeFocus (evt) {
    this.select()

    for(var i = 0; i < inputsArray; i++) {
        inputsArray[i].validClicks = 0
    }
}

function onSelectingTime (evt) {
    var inp = findInputObject(this.id)
    var moded = this.value 
    if(/^\d+$/.test(moded[moded.length-1]) == false) {
        moded = moded.substring(0, this.value.length-1)
        this.value = moded
        return
    }

    if(moded.length > 2) {
        if(moded[0] == '0') {
            moded = moded.substring(1,3)
            this.value = moded
        }
        else {
            moded = moded.substring(0,2)
            this.value = moded
        }
    }
    else if(moded.length == 1) {
        moded = "0" + moded
        this.value = moded
    }

    if(evt.inputType == 'deleteContentBackward') {
        if(inp.validClicks > 0) {
            inp.validClicks = inp.validClicks - 1
        }
    }
    else {
        if(inp.validClicks < 2){
            inp.validClicks++
        }
        if(isRunning == false){
            setDefault()
        }
    }

    if(inp.validClicks >= 2){
        document.getElementById(inp.nextControl).select()
    }

    
}

function findInputObject(id) {
    for(var i = 0;i < inputsArray.length; i++) {
        if(inputsArray[i].id == id){
            return inputsArray[i]
        }
    }
}

function setDefault() {

}

function onIntervalsBtnClick(d) {
    var txtintervals = document.getElementById('txtintervals')
    var curentVal = parseInt(txtintervals.value)
    if((curentVal + d) > 0 && (curentVal + d) < 100) {
        txtintervals.value = curentVal + d
    }
    if(isRunning == false) {
        setDefault()
    }
}
