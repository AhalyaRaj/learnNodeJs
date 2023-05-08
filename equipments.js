class Equipments {
    constructor(machineName,machineCost,currencyCode) {
        this.machineCost = machineCost,
        this.machineName = machineName,
        this.currencyCode = currencyCode
    }

    getMachineDetails() {
        console.log(`Hi Tempcon, \nOrdered Machine is ${this.machineName}. Cost => ${this.machineCost} ${this.currencyCode}`)
    }
}

module.exports = Equipments;