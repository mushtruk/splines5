import Sketch from "react-p5";

export default () => {

    let cirPath = [];
    let radius = 0;
    let cirSize = 1;
    let spacing = 10;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

        radius = p5.windowWidth / 4;
        let circleLen = 2 * p5.PI * radius;
        let total = p5.floor(circleLen / cirSize);
        for (let angle = 0; angle<total; angle+=spacing) {
            cirPath.push(p5.map(angle, 0, total, 0, p5.TWO_PI))
        }
    }


    const draw = (p5) => {
        p5.background(52)
        p5.translate(p5.width / 2, p5.height / 2)
        p5.stroke(255);
        p5.strokeWeight(4);
        p5.noFill();
        p5.beginShape();
        // p5.noLoop()
        for (let i=0; i<cirPath.length; i++){
            // let r1 = radius + p5.sin(cirPath[i] * 15) * 50;
            let r = radius;
            if (cirPath[i] % p5.TWO_PI < p5.PI/4
                && cirPath[i] % p5.TWO_PI > p5.PI/6) {
                r = r + p5.sin(cirPath[i] * 15) * 50;
                // let peak = p5.abs((cirPath[i] % p5.TWO_PI) - (p5.PI / 5));
                // console.log(peak)
                // peak = peak / (p5.PI / 5);
                // peak = p5.PI / 5 - peak;
                // r = r * (1 + peak);
            }
            let x = r * p5.cos(cirPath[i]);
            let y = r * p5.sin(cirPath[i]);
            p5.circle(x, y, cirSize);
            cirPath[i] += 0.001;
        }
        p5.endShape();
    };

    return <Sketch setup={setup} draw={draw} />;
};
