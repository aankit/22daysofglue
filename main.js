let center, radius, num_days, days, messages, message, dayOfMonth, showMsg, active_messages, day_message

function preload() {
    num_days = Array.from(Array(22).keys()).map(x => x + 1);
    const d = new Date();
    // dayOfMonth = d.getDate();
    dayOfMonth = 22;
    days = num_days.map((d) => {
        img = loadImage("images/day-" + d + ".png");
        day = {
            "image": img,
            "d": d,
            "p": 0,
            "x": 0,
            "y": 0
        };
        return day;
    }
    );
    font = loadFont("glue_assets/Homemade_Apple/HomemadeApple-Regular.ttf")
    messages = loadJSON("glue_assets/messages.json", loadImages);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    i = 360 / num_days.length;
    showMsg = false;
    active_messages = messages.messages.filter((msg) => msg.day <= dayOfMonth);
    active_messages.map(m => m.img.resize(width / 3, 0));
}

function draw() {
    background(135, 206, 235);
    center = {
        "x": width / 2.3,
        "y": height / 2.3
    };
    radius = {
        "x": width / 2.75,
        "y": height / 2.5
    }
    if (showMsg) {
        textAlign(LEFT, TOP);
        textFont(font);
        textSize(width / 35);
        stroke(100);
        fill(0);
        textWrap(WORD);
        textLeading(width / 15);
        text(day_message.text, width * .05, height * .05, width / 2);
        image(day_message.img, 1.75 * width / 3, height * .05);
    } else {
        textFont(font);
        textSize(width / 20);
        textAlign(CENTER, CENTER);
        stroke(100);
        fill(212, 175, 55);
        text("22 Days of Glue :", center.x + width / 20, center.y - width / 18);
        text("Advent of the World's", center.x + width / 20, center.y + width / 30);
        text("Cutest Wife & Mom", center.x + width / 20, center.y + width / 8);
        days.forEach((day) => {
            // fill(255);
            // rect(day.x, day.y, 10, 10);
            if (day.p === 0) {
                day.p = num_days.splice(Math.floor(Math.random() * num_days.length), 1);
                day.p = day.p[0];
            }
            day.x = center.x + Math.cos((i * day.p) * (Math.PI / 180)) * radius.x;
            day.y = center.y + Math.sin((i * day.p) * (Math.PI / 180)) * radius.y;
            day.l = width / 10;
            day.h = height / 7.5;
            image(day.image, day.x, day.y, day.l, day.h);
        });
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    active_messages.map(m => m.img.resize(width / 3, 0));
}

function mouseClicked() {
    if (!showMsg) {
        days.forEach((day) => {
            if (mouseX > day.x && mouseX < day.x + day.l && mouseY > day.y && mouseY < day.y + day.h) {
                if (day.d <= dayOfMonth) {
                    day_message = active_messages.filter((msg) => msg.day === day.d)[0];
                    showMsg = true;
                }
            }
        });
    } else {
        showMsg = false;
        const d = new Date();
        // dayOfMonth = d.getDate();
        dayOfMonth = 22;
    }
}

function loadImages(messageJSON) {
    msgArray = messageJSON.messages
    msgArray.map((m) => {
        if (m.day <= dayOfMonth) {
            img = loadImage("images/" + m.img_file);
            m.img = img;
        }
    });
    return messages;
}