/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    catNum: {
        type: OptionType.NUMBER,
        description: "How many cats do you want (Valid Range: 0 - 1000)",
        restartNeeded: true,
        default: 1
    },
    nameTags: {
        type: OptionType.BOOLEAN,
        description: "Create Nametags",
        restartNeeded: true,
        default: false
    }
});

// matrix coords of spires from gif file.
export const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
    ],
    tired: [[-3, -2]],
    sleeping: [
        [-2, 0],
        [-2, -1],
    ],
    N: [
        [-1, -2],
        [-1, -3],
    ],
    NE: [
        [0, -2],
        [0, -3],
    ],
    E: [
        [-3, 0],
        [-3, -1],
    ],
    SE: [
        [-5, -1],
        [-5, -2],
    ],
    S: [
        [-6, -3],
        [-7, -2],
    ],
    SW: [
        [-5, -3],
        [-6, -1],
    ],
    W: [
        [-4, -2],
        [-4, -3],
    ],
    NW: [
        [-1, 0],
        [-1, -1],
    ],
};

export const skins = [
    "ace", "black", "calico", "default", "fox", "ghost", "gray", "jess", "kina", "lucy", "maia", "mike", "moka", "silver", "silversky", "spirit", "valentine"
];

export const skinGifs = {
    "ace": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/ace.png?token=GHSAT0AAAAAADXZGEN7ZHYYKMW74BPLC6N42NWFLMQ",
    "black": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/black.png?token=GHSAT0AAAAAADXZGEN6EWQMM4OGDFAFWRS22NWFL4A",
    "calico": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/calico.png?token=GHSAT0AAAAAADXZGEN7OFDISB6FAH6AI3MQ2NWFMYA",
    "default": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/default.png?token=GHSAT0AAAAAADXZGEN7OWEEDNB3P4ARBMAC2NWFM4A",
    "fox": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/fox.png?token=GHSAT0AAAAAADXZGEN65OW5CNKD2LCK72J62NWFNAQ",
    "ghost": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/ghost.png?token=GHSAT0AAAAAADXZGEN7PHNW3HH25NRU6W742NWFNEQ",
    "gray": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/gray.png?token=GHSAT0AAAAAADXZGEN6WNHKJJ5ZERE6OGYE2NWFNJA",
    "jess": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/jess.png?token=GHSAT0AAAAAADXZGEN7P6Y3AKQRCMSQMYQK2NWFNNQ",
    "kina": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/kina.png?token=GHSAT0AAAAAADXZGEN762LVM7DJLNXIE74I2NWFNSA",
    "lucy": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/lucy.png?token=GHSAT0AAAAAADXZGEN6TY4IG4NS6HYW6NKY2NWFNWA",
    "maia": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/maia.png?token=GHSAT0AAAAAADXZGEN6YDPIURTMHHJLLTYI2NWFN3Q",
    "mike": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/mike.png?token=GHSAT0AAAAAADXZGEN7SYDPXMVGGSFVSA6Y2NWFOAQ",
    "moka": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/moka.png?token=GHSAT0AAAAAADXZGEN6NDSSIPAGFSEX43GA2NWFOEQ",
    "silver": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/silver.png?token=GHSAT0AAAAAADXZGEN72IQPVQRS5EGO6S6I2NWFOIQ",
    "silversky": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/silversky.png?token=GHSAT0AAAAAADXZGEN7BELUE6NN7OMXXBGQ2NWFORA",
    "spirit": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/spirit.png?token=GHSAT0AAAAAADXZGEN64VFTO5YDMBP2IJAE2NWFOVQ",
    "valentine": "https://raw.githubusercontent.com/internetyh/onekoCustom/refs/heads/master/onekoSkins/valentine.png?token=GHSAT0AAAAAADXZGEN6IA6FR7JGYTU6GEDG2NWFOZA",
};

export let frameCount = 0;

export const catClasses: Cat[] = [];

// Cat class, handles all oneko objects
class Cat {
    id: number;
    div: HTMLDivElement;
    namediv: HTMLDivElement;
    name: string;
    x = Math.floor(window.innerWidth * Math.random());
    y = Math.floor(window.innerHeight * Math.random());
    randomX = this.x;
    randomY = this.y;
    idleTime = 0;
    idleAnimation = "";
    idleAnimationFrame = 0;
    speed = 10;

    constructor(id = 100, name = skins[id]) {
        this.id = id;
        this.name = name;

        this.div = document.createElement("div");
        this.initGif();
        this.initDiv();
        document.body.appendChild(this.div);

        this.namediv = document.createElement("div");
        if (settings.store.nameTags) {
            this.initNameTag();
            this.div.appendChild(this.namediv);
        }

    }

    // set gif for oneko
    initGif() {
        let gif = skinGifs[skins[this.id]];

        const curScript = document.currentScript;
        if (curScript && curScript.dataset.cat) {
            gif = curScript.dataset.cat;
        }
        this.div.style.backgroundImage = `url(${gif})`;
    }

    // setup oneko div
    initDiv() {
        this.div.id = `oneko${this.id}`;

        // this.div.style.filter = "sepia(100%) saturate(500%) hue-rotate(350deg)";

        this.div.ariaHidden = "false";
        this.div.style.width = "32px";
        this.div.style.height = "32px";
        this.div.style.position = "fixed";
        this.div.style.pointerEvents = "auto";
        this.div.style.imageRendering = "pixelated";
        this.div.style.left = `${this.x - 16}px`;
        this.div.style.top = `${this.y - 16}px`;
        this.div.style.zIndex = "2147483647";
        this.div.draggable = true;
        this.div.addEventListener("mousedown", event => {
            const onMove = event => this.drag(event);
            const onUp = event => {
                document.removeEventListener("mousemove", onMove); this.drop(event);
            };

            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp, { once: true });
        });
    }

    // setup oneko nametag div
    initNameTag() {
        this.namediv.innerHTML = this.name;
        this.namediv.id = `onekoTag${this.id}`;
        this.namediv.ariaHidden = "false";
        this.namediv.style.display = "none";
        this.namediv.style.width = "32px";
        this.namediv.style.height = "32px";
        this.namediv.style.position = "absolute";
        this.namediv.style.color = "white";
        this.namediv.style.left = "100%";
        this.namediv.style.top = "0%";
        this.namediv.style.zIndex = "2147483647";
        this.div.addEventListener("mouseover", event => {
            this.namediv.style.display = "block";
        });
        this.div.addEventListener("mouseleave", event => {
            this.namediv.style.display = "none";
        });
    }

    // resets oneko idle
    resetIdle() {
        this.idleAnimation = "";
        this.idleAnimationFrame = 0;
    }

    // handling oneko idle animations
    idle() {
        this.idleTime += 1;

        // every ~ 20 seconds
        if (
            this.idleTime > 10 &&
            Math.floor(Math.random() * 200) === 0 &&
            this.idleAnimation === ""
        ) {
            const avalibleIdleAnimations = ["sleeping", "scratchSelf"];
            this.idleAnimation =
                avalibleIdleAnimations[
                Math.floor(Math.random() * avalibleIdleAnimations.length)
                ];
        }

        switch (this.idleAnimation) {
            case "sleeping":
                if (this.idleAnimationFrame < 8) {
                    this.setSprite("tired", 0);
                    break;
                }
                this.setSprite("sleeping", Math.floor(this.idleAnimationFrame / 4));
                if (this.idleAnimationFrame > 192) {
                    this.resetIdle();
                }
                break;
            case "scratchSelf":
                this.setSprite(this.idleAnimation, this.idleAnimationFrame);
                if (this.idleAnimationFrame > 9) {
                    this.resetIdle();
                }
                break;
            default:
                this.setSprite("idle", 0);
                return;
        }
        this.idleAnimationFrame += 1;
    }

    // set oneko sprite
    setSprite(name: string, frame: number) {
        const sprite = spriteSets[name][frame % spriteSets[name].length];
        this.div.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    // generate random pos on the screen
    randomPos() {
        const moveChance = 0.15;
        if (Math.floor(200 * Math.random()) === 0) {
            this.randomX = Math.floor(window.innerWidth * Math.random());
            this.randomY = Math.floor(window.innerHeight * Math.random());
        }
    }

    // update onkeo pos
    updatePos() {
        this.randomPos();
        const diffX = this.x - this.randomX;
        const diffY = this.y - this.randomY;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < this.speed || distance < 48) {
            this.idle();
            return;
        }

        this.idleAnimation = "";
        this.idleAnimationFrame = 0;

        if (this.idleTime > 1) {
            this.setSprite("alert", 0);
            // count down after being alerted before moving
            this.idleTime = Math.min(this.idleTime, 7);
            this.idleTime -= 1;
            return;
        }

        let direction;
        direction = diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "W" : "";
        direction += diffX / distance < -0.5 ? "E" : "";
        this.setSprite(direction, frameCount);

        this.x -= (diffX / distance) * this.speed;
        this.y -= (diffY / distance) * this.speed;

        this.x = Math.min(Math.max(16, this.x), window.innerWidth - 16);
        this.y = Math.min(Math.max(16, this.y), window.innerHeight - 16);

        this.render();
    }

    // logic handling the dragging of onkeo
    drag(event: MouseEvent) {
        this.x = event.clientX;
        this.y = event.clientY - 16;
        this.randomX = this.x;
        this.randomY = this.y;
        this.render();
    }

    // used to drop onkeo down after dragging
    drop(event: MouseEvent) {
        console.log("dropping cat");
        this.y = event.clientY;
        this.randomY = this.y;
        this.render();
    }

    // move onkeo into valid bounding box, called on resize event
    move() {
        this.x = (this.x > window.innerWidth) ? Math.floor(window.innerWidth * Math.random()) : this.x;
        this.y = (this.y > window.innerHeight) ? Math.floor(window.innerHeight * Math.random()) : this.y;
        this.randomX = this.x;
        this.randomY = this.y;
        this.render();
    }

    // updates this onkeos position
    render() {
        this.div.style.left = `${this.x - 16}px`;
        this.div.style.top = `${this.y - 16}px`;
    }

    // stop onkeo movement
    stop() {
        this.randomX = this.x;
        this.randomY = this.y;
        this.idle;
    }

    // deletes the oneko
    kill() {
        document.getElementById(`oneko${this.id}`)?.remove();
    }

}

function onekoRun() {

    const numCats = (settings.store.catNum > 0 && settings.store.catNum < 1001) ? settings.store.catNum : 1;

    for (let i = 0; i < numCats; i++) {
        const newCatClass = new Cat(i);
        catClasses.push(newCatClass);
    }

    function init() {
        window.requestAnimationFrame(onAnimationFrame);
    }

    let lastFrameTimestamp;

    function onAnimationFrame(timestamp) {
        // // Stops execution if the neko element is removed from DOM
        // if (!nekoEl.isConnected) {
        //     return;
        // }
        if (!lastFrameTimestamp) {
            lastFrameTimestamp = timestamp;
        }
        if (timestamp - lastFrameTimestamp > 100) {
            lastFrameTimestamp = timestamp;
            frame();
        }
        window.requestAnimationFrame(onAnimationFrame);
    }

    function stopCats() {
        catClasses.forEach(cat => {
            cat.stop();
            cat.move();
        });
    }

    function frame() {
        frameCount += 1;

        catClasses.forEach(cat => {
            cat.updatePos();
        });

    }

    window.onresize = stopCats;
    init();

}

function onekoKill() {
    catClasses.forEach(cat => {
        cat.kill();
    });
}

export default definePlugin({
    name: "onekoCustom",
    description: "cat run around (real)",
    authors: [{ name: "int", id: 123456789n }],

    settings,

    start() {
        onekoRun();
    },

    stop() {
        onekoKill();
    }

});
