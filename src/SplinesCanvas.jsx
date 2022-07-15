import Sketch from "react-p5";

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;


const createPeakSet = (peaksNum) => {
    return [...Array(peaksNum).keys()].map(() => {
        let peakRad = degreesToRadians(getRandomArbitrary(1, 359));
        let peakRange = Math.PI / getRandomArbitrary(25,25);
        return {
            peakRad,
            peakRange
        }
    })
}

export default () => {

    const createCircle = (p5, ratio) => {
        const circleDots = [];
        let spacing = 10;
        let cirSize = 1;
        let increment = 0.0005;

        // get number of dots for a given circle/screen ratio
        const radius = p5.windowWidth / ratio;
        let circleLen = 2 * p5.PI * radius;
        let total = p5.floor(circleLen / cirSize);

        // create an array of rad of dots with spacing
        for (let angle = 0; angle<total; angle+=spacing) {
            circleDots.push(p5.map(angle, 0, total, 0, p5.TWO_PI))
        }

        // create an array of peaks for a circle
        const peaksSet = createPeakSet(5);

        // function draws circle
        return () => {
            for (let i=0; i<circleDots.length; i++){
                let r = radius;
                const circlePoint = circleDots[i] % p5.TWO_PI;

                peaksSet.forEach(({peakRad, peakRange}) => {
                    const leftLimit = peakRad - peakRange;
                    const rightLimit = peakRad + peakRange;
                    if (circlePoint > leftLimit && circlePoint < rightLimit) {
                        const rad = p5.map(circlePoint, leftLimit, rightLimit, 0, p5.PI);
                        const addToR = p5.sin(rad) * 50;
                        r = r + addToR;
                    }
                })

                let x = r * p5.cos(circleDots[i]);
                let y = r * p5.sin(circleDots[i]);
                p5.circle(x, y, cirSize);
                circleDots[i] += increment;
            }
        }
    }

    let circleOne;
    let circleTwo;
    let circleThree;


    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);


        circleOne = createCircle(p5, 3)
        circleTwo = createCircle(p5, 4)
        circleThree = createCircle(p5, 5)
    }


    const draw = (p5) => {
        p5.background(52)
        p5.translate(p5.width / 2, p5.height / 2)
        p5.stroke(255);
        p5.strokeWeight(3);

        circleOne();
        circleTwo();
        circleThree();
    };


    return <Sketch setup={setup} draw={draw} />;
};
