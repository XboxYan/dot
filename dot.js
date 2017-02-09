var dotarr = [
    {
        x: 100,
        y: 250,
        name: '入口1'
    },
    {
        x: 250,
        y: 360,
        name: '入口2'
    }
]

//桌面
var $DESKTOP = document.getElementById('main');
//图片
var $IMG = document.getElementById('img');
//弹窗
var $POP = document.getElementById('pop_window');
//名称
var $NAME = document.getElementById('pop_name');
//X
var $X = document.getElementById('pos_x');
//Y
var $Y = document.getElementById('pos_y');
//删除按钮
var $BTN_DEL = document.getElementById('btn_del');
//保存按钮
var $BTN_SAVE = document.getElementById('btn_save');
//取消按钮
var $BTN_CANCEL = document.getElementById('btn_cancel');
//查看按钮
var $BTN_SEE = document.getElementById('btn_see');
//拖拽元素
var eleDrag = null;

//定义点
function Dot(obj, i) {
    var _this = this;
    this.x = obj.x;
    this.y = obj.y;
    this.$dot = document.createElement('span');
    this.$dot.className = 'dot';
    this.$dot.title = obj.name;
    this.$dot.draggable = true;
    this.$dot.addEventListener('click', function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        $NAME.value = obj.name;
        $X.innerHTML = obj.x;
        $Y.innerHTML = obj.y;
        _this.set($POP);
        _this.save(i);
        _this.cancel();
        _this.del(i);
        if($POP.className===''){
            $POP.className = 'show';
        }
    }, false)
}

//设置位置
Dot.prototype.set = function (obj) {
    obj.style.transform = "translate3d(" + this.x + 'px' + "," + this.y + 'px' + ",0)";
}

//添加描点
Dot.prototype.add = function (obj) {
    $DESKTOP.appendChild(obj);
}

//初始化
Dot.prototype.init = function (i) {
    this.set(this.$dot);
    this.add(this.$dot);
    this.drag(this.$dot, i);
}

//保存
Dot.prototype.save = function (i) {
    var _this = this;
    $BTN_SAVE.onclick = function(){
        var value = $NAME.value;
        if(!value){
            alert('名称不能为空！')
            return
        }
        _this.name = value;
        dotarr[i].name = value;
        document.querySelectorAll('.dot')[i].title = value;
        $POP.className = '';
    }
}

//取消
Dot.prototype.cancel = function () {
    $BTN_CANCEL.onclick = function(){
        $POP.className = '';
    }
}
//删除
Dot.prototype.del = function (i) {
    var _this = this;
    $BTN_DEL.onclick = function(){
        $DESKTOP.removeChild(_this.$dot);
        dotarr.splice(i,1);
        $POP.className = '';
    }
}

//拖拽
Dot.prototype.drag = function (obj, i) {
    var _this = this;
    obj.onselectstart = function (ev) {
        return false;
    };
    obj.ondragstart = function (ev) {
        /*拖拽开始*/
        if ($POP.className === 'show') {
            $POP.className = '';
        }
        ev.dataTransfer.effectAllowed = "move";
        ev.dataTransfer.setData("el", ev.target);
        ev.dataTransfer.setDragImage(ev.target, 8, 44);
        //eleDrag = ev.target;
        return true;
    };
    obj.ondragend = function (ev) {
        /*拖拽结束*/
        dotarr[i].x = _this.x + eleDrag[0];
        dotarr[i].y = _this.y + eleDrag[1];
        _this.x = _this.x + eleDrag[0];
        _this.y = _this.y + eleDrag[1];
        _this.set(obj);
        //ev.dataTransfer.clearData("el");
        //eleDrag = [ev.offsetX,ev.offsetY];
        return false
    };
    obj.ondrag = function (ev) {
        /*拖拽结束*/
        //console.log(ev)
        //ev.dataTransfer.clearData("el");
        eleDrag = [ev.offsetX - 4, ev.offsetY - 4];
        //eleDrag = [ev];
    };
}

$IMG.ondragover = function (ev) {
    /*拖拽元素在目标元素头上移动的时候*/
    ev.preventDefault();
    return true;
};

//初始化
dotarr.forEach(function (el, i) {
    var Dots = new Dot(el, i);
    Dots.init(i);
})

//新增
$DESKTOP.addEventListener('click', function (ev) {
    if (ev.target.tagName === "DIV") {
        return false
    }
    if ($POP.className === 'show') {
        $POP.className = '';
        return false
    }
    var i = dotarr.length;
    var el = {
        x: ev.offsetX,
        y: ev.offsetY,
        name: '默认名字' + (i + 1)
    }

    dotarr.push(el);
    var Dots = new Dot(el, i);
    Dots.init(i);
}, false)

//弹窗
$POP.addEventListener('click', function (ev) {
    ev.stopPropagation();
}, false)

//查看数据
$BTN_SEE.addEventListener('click', function (ev) {
    ev.stopPropagation();
    console.log(dotarr);
}, false)
