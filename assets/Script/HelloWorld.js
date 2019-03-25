cc.Class({
    extends: cc.Component,

    properties: {
        player : cc.Node,
        // defaults, set visually when attaching this script to the Canvas
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getPhysicsManager().enabled = true;
    },

    // called every frame
    update: function (dt) {

    },
});
