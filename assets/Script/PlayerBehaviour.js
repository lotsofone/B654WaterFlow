// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        mouseRegion : cc.Node,
        forceMultiplier : 1,
        //aaa : cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //this.aaa.getComponent(cc.RigidBody).applyLinearImpulse(new cc.Vec2(1000, 0), new cc.Vec2(0, 0));
        this.startPosition = null;
        this.startTouch = null;
        this.touching = null;
        this.mouseRegion.on('touchstart', (event)=>{
            let rigidBody = this.getComponent(cc.RigidBody);

            this.startPosition = rigidBody.getWorldCenter();
            let loc = event.getLocation();
            this.startTouch = loc;
        })
        this.mouseRegion.on('touchmove', (event)=>{
            let loc = event.getLocation();
            this.touching = loc;
        })
        this.mouseRegion.on('touchend', (event)=>{
            this.startPosition = null;
            this.startTouch = null;
            this.touching = null;
        })
        this.mouseRegion.on('touchcancel', (event)=>{
            this.startPosition = null;
            this.startTouch = null;
            this.touching = null;
        })
    },

    update (dt) {
        if(this.startPosition != null && this.touching!=null){
            let rigidBody = this.getComponent(cc.RigidBody);
            let targetPosition = this.startPosition.add(this.touching.sub(this.startTouch));
            rigidBody.applyForceToCenter(targetPosition.sub(rigidBody.getWorldCenter())
                .mul(this.forceMultiplier*rigidBody.getMass()));
        }
    },
});
