/**
 * This function loads the background objects, enemies and collectible items
 */
function loadLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenBaby(),
            new ChickenBaby(),
            new ChickenBaby(),
            new ChickenBaby(),
            new ChickenBaby(),
            new ChickenBaby(),
            new ChickenBaby(),
            new ChickenBaby()
        ],
        [
            new Endboss()
        ],
        [
            new Cloud(0, 500),
            new Cloud(750, 1250),
            new Cloud(1500, 2200),
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3)
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],
        [
            new SalsaBottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new SalsaBottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png')
        ]
    );
}