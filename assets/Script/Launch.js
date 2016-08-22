cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        this.canLoad = true;
        cc.game.addPersistRootNode(this.node);
        this.sceneList = cc.game._sceneInfos;
        cc.log(this.sceneList);
        cc.director.loadScene('01_align_basic');
        var listener = {
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                cc.log('keyDown: ' + keyCode);
                var idx = keyCode - 48;
                if (idx >= 0 && idx < self.sceneList.length && self.canLoad) {
                    self.loadScene(self.sceneList[idx].url);
                }
            }
        }
        cc.eventManager.addListener(listener, this.node);
    },

    // called every frame
    loadScene (name) {
        this.canLoad = false;
        cc.director.loadScene(name, this.onLoadSceneFinish.bind(this));
    },
    
    onLoadSceneFinish () {
        this.canLoad = true;
    }
});
