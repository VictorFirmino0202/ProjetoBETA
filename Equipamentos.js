class Equipaments {
    constructor() {
        this.type = null;
        this.index = 1;
        this.positionX = 0;
        this.positionY = 0;
        this.ammogun = 1;
        this.player = 0;
    }

    selectEquipament() {
        var equipamentIndex = "equipaments/equipament" + player.index;

        if (this.index === 1) {
            this.type = "gun";
        } else {
            this.type = "faca";
        }

        database.ref(equipamentIndex).set({
            type: null,
            index: 1,
            positionX: player.positionX,
            positionY: player.positionY,
            ammogun: 1,
        });


    }

    getSelectEquipament() {
        if (this.ammogun === 1) {
            this.index = 1;
        } else {
            this.index = 2;
        }
    }

    static getEquipamentsInfo() {
        var getEquipamentsInfo = database.ref("equipaments");
        getEquipamentsInfo.on("value", (data) => {
            allEquipaments = data.val();
        })
    }

    update() {
        var equipamentIndex = "equipaments/equipament" + this.index;
        database.ref(equipamentIndex).update({
            type: null,
            index: null,
            positionX: this.positionX,
            positionY: this.positionY,
            ammogun: this.ammogun,
        })
    }

    updateAmmogun(index, ammogun) {
        var equipamentIndex = "equipaments/equipament" + this.index;
        database.ref(equipamentIndex).update({
            type: null,
            index: index,
            ammogun: ammogun,
        })
    }

    // getCount() {
    //   var playerCountRef = database.ref("playerCount");
    //   playerCountRef.on("value", data => {
    //     playerCount = data.val();
    //   });
    // }

    // updateCount(count) {
    //   database.ref("/").update({
    //     playerCount: count
    //   });
    // }


}
