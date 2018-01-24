var canvas, stage, exportRoot,
    firstAnsArray = [],
    bool = true,
    count = 0,
    correct = 0,
    nameArr = [];

function init() {
    canvas = document.getElementById("canvas");
    images = images || {};

    var manifest = [
        {
            src: "images/_2.png",
            id: "_2"
        },
        {
            src: "images/Pattern1.png",
            id: "Pattern1"
        },
        {
            src: "images/Pattern10.png",
            id: "Pattern10"
        },
        {
            src: "images/Pattern3.png",
            id: "Pattern3"
        },
        {
            src: "images/Pattern4.png",
            id: "Pattern4"
        },
        {
            src: "images/Pattern5.png",
            id: "Pattern5"
        },
        {
            src: "images/Pattern6.png",
            id: "Pattern6"
        },
        {
            src: "images/Pattern7.png",
            id: "Pattern7"
        },
        {
            src: "images/Pattern8.png",
            id: "Pattern8"
        },
        {
            src: "images/Pattern9.png",
            id: "Pattern9"
        },
        {
            src: "images/windows_logos_PNG35.png",
            id: "windows_logos_PNG35"
        }
	];

    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest);
}

function handleFileLoad(evt) {
    if (evt.item.type == "image") {
        images[evt.item.id] = evt.result;
    }
}

function handleComplete() {
    exportRoot = new lib.IntL2U2TP();

    stage = new createjs.Stage(canvas);
    stage.addChild(exportRoot);

    stage.enableMouseOver();
    createjs.Touch.enable(stage);

    stage.update();

    intro.play();

    createjs.Ticker.setFPS(24);
    createjs.Ticker.addEventListener("tick", stage);



    //Game Sounds
    intro = document.getElementById("intro");
    intro.addEventListener('pause', function () {
        intro.currentTime = 0;
    }, false);

    good = document.getElementById("good");
    good.addEventListener('pause', function () {
        good.currentTime = 0;
    }, false);

    wrong = document.getElementById("wrong");
    wrong.addEventListener('pause', function () {
        wrong.currentTime = 0;
    }, false);

    click = document.getElementById("click");
    click.addEventListener('pause', function () {
        click.currentTime = 0;
    }, false);


    exportRoot.gameIntro.startBtn.cursor = "pointer";
    exportRoot.gameIntro.startBtn.onClick = function () {

        click.play();
        exportRoot.gotoAndStop(1);
        setTimeout(function () {
            exportRoot.startQ.playDemo.gotoAndPlay(0);
            setTimeout(function () {
                exportRoot.startQ.gotoAndStop(130);
            }, 5000);
        }, 4000);
    }



    for (var i = 0; i < 12; i++) {
        exportRoot["startQ"]["ans_" + i].id = i;
        exportRoot["startQ"]["ans_" + i].cursor = "pointer";
        exportRoot["startQ"]["ans_" + i].onClick = checkMyAnswer;
        exportRoot["startQ"]["ans_" + i].name = "ans_" + i;
        if (i < 11) {
            exportRoot["startQ"]["ansQ_" + i].id = i;
            exportRoot["startQ"]["ansQ_" + i].cursor = "pointer";
            exportRoot["startQ"]["ansQ_" + i].onClick = checkMyAnswer;
            exportRoot["startQ"]["ansQ_" + i].name = "ansQ_" + i;
        }
    }

    exportRoot.retryGame.retry.onClick = function () {
        click.play();
        stopAllSounds();
        firstAnsArray = [];
        bool = true;
        count = 0;
        correct = 0;
        nameArr = [];
        
        exportRoot.gotoAndStop(1);
        exportRoot.startQ.gotoAndStop(0);
        exportRoot.startQ.gotoAndPlay(1);
        for (var i = 0; i < 12; i++) {
            exportRoot["startQ"]['ans_' + i].visible = true;
            if (i < 11) {
                exportRoot["startQ"]['ansQ_' + i].visible = true;
            }
        }
        
        setTimeout(function () {
            exportRoot.startQ.playDemo.gotoAndStop(0);
            exportRoot.startQ.playDemo.gotoAndPlay(1);
            setTimeout(function () {
                exportRoot.startQ.gotoAndStop(130);
            }, 5000);
        }, 4000);


    }
    exportRoot.retryGame.retry.cursor = 'pointer';

}

function checkMyAnswer(e) {
    click.play();
    e.target.gotoAndStop(1);
    firstAnsArray.push(e.target.id);
    count++;
    e.target.onClick = null;
    if (count == 2 && e.target.id == firstAnsArray[0]) {
        correct++;
        actAndDe(null);

        exportRoot["startQ"]['ans_' + e.target.id].gotoAndStop(2);
        exportRoot["startQ"]['ansQ_' + e.target.id].gotoAndStop(2);
        setTimeout(function () {
            good.play();
            exportRoot["startQ"]['ans_' + e.target.id].gotoAndPlay(2);
            exportRoot["startQ"]['ansQ_' + e.target.id].gotoAndPlay(2);

        }, 1500);
        setTimeout(function () {
            exportRoot["startQ"]['ans_' + e.target.id].visible = false;
            exportRoot["startQ"]['ansQ_' + e.target.id].visible = false;
        }, 2000);
        setTimeout(function () {
            count = 0;
            firstAnsArray = [];
            nameArr = [];
            actAndDe(checkMyAnswer)
        }, 1500);
    } else {

        nameArr.push(e.target.name);

        console.log(nameArr);
        if (count == 2) {

            actAndDe(null);
            setTimeout(function () {
                wrong.play();
                e.target.onClick = checkMyAnswer;
                actAndDe(checkMyAnswer);
                count = 0;
                firstAnsArray = [];
                exportRoot["startQ"][nameArr[0]].gotoAndStop(0);
                exportRoot["startQ"][nameArr[1]].gotoAndStop(0);
                nameArr = [];
            }, 1000);
        }

    }
    if (correct > 10) {
        actAndDe(null);
        setTimeout(function () {
            exportRoot.startQ.ans_11.gotoAndPlay(1);
        }, 1500);
        setTimeout(function () {
            exportRoot.startQ.gotoAndStop(131);
            exportRoot.startQ.windowsOpen.gotoAndPlay(0);
        }, 3000);
        setTimeout(function () {
            exportRoot.gotoAndStop(2);
        }, 5000);
    }
}

function actAndDe(e) {
    for (var i = 1; i < 12; i++) {
        exportRoot["startQ"]["ans_" + i].onClick = e;
        if (i < 11) {
            exportRoot["startQ"]["ansQ_" + i].onClick = e;
        }
    }
}


function stopAllSounds() {
    intro.pause();
    good.pause();
    wrong.pause();
    click.pause();
}
