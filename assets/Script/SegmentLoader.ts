// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Prefab])
    prefabList: cc.Prefab[] = [];

    @property([cc.Prefab])
    segmentList: cc.Prefab[] = [];

    generatePrefab(prefab: cc.Prefab, pos=new cc.Vec2(0, 0), angle=0, scale=new cc.Vec3(1, 1, 1)){
        let node = cc.instantiate(prefab);
        this.node.addChild(node);
        //设置位置。我们默认根节点没有旋转和缩放，直接减去根节点的xy
        node.x = pos.x-this.node.x; node.y = pos.y-this.node.y;
        node.z = 0;
        node.angle = node.eulerAngles.z = angle;

        node.scaleX = scale.x; node.scaleY = scale.y; node.scaleZ = scale.z;
    }

    getPrefabByName(name : String){
        for(let i=0; i<this.prefabList.length; i++){
            if(this.prefabList[i].name == name){
                return this.prefabList[i];
            }
        }
        return null;
    }

    //加载一个关卡段中的关卡
    loadSegment(segment:cc.Prefab, offset:number){
        let mainNode = segment.data;
        for(let i=0; i<mainNode.children.length; i++){
            var child = mainNode.children[i];
            var prefab = this.getPrefabByName(child.name);
            var pos = new cc.Vec2(child.x+mainNode.x, child.y+mainNode.y+offset);
            var rot = child.eulerAngles.z;
            var scale = new cc.Vec3(child.scaleX, child.scaleY, child.scaleZ);
            this.generatePrefab(prefab, pos, rot, scale);
        }
    }

    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
    }

    // update (dt) {}
}
