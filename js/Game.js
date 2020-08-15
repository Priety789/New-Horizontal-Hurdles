class Game {
    constructor() {

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            runner = new Runner();
            var runnerCountRef = await database.ref('runnerCount').once("value");
            if (runnerCountRef.exists()) {
                runnerCount = runnerCountRef.val();
                runner.getCount();
            }
            form = new Form()
            form.display();
        }

        runner1 = createSprite(100, 200);
        runner2 = createSprite(300, 200);
        runner3 = createSprite(500, 200);
        runner4 = createSprite(700, 200);
        runners = [runner1, runner2, runner3, runner4];
    }

    play() {
        form.hide();

        Runner.getRunnerInfo();
        runner.getrunnersAtEnd();

        if (allRunners !== undefined) {
            background(255);
            var display_position = 100;
            var index = 0;
            
            var y = 175;
            var x;

            for (var run in allRunners) {
                index = index + 1;
                
                y = y + 200;
                x = displayHeight - allRunners[run].distance;
                runners[index - 1].x = x;
                runners[index - 1].y = y;

                if (index === runner.index) {
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 60, 60);
                    runners[index - 1].shapeColor = "red";
                    camera.position.y = displayWidth / 2;
                    camera.position.x = runners[index - 1].x
                }

            }

        }

        if (keyIsDown(LEFT_ARROW) && runner.index !== null) {
            runner.distance += 10;
            runner.update();
        }

        if (runner.distance > 5000) {
            gameState = 2;
            runner.rank += 1;
            Runner.updaterunnersAtEnd(runner.rank);
        }

        drawSprites();
    }
    end() {
        console.log("gameEnded");
        //game.update(2);
        console.log(runner.rank);
    }
}
