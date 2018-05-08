// {
//     "textFrames": [
//       {
//         "font": {
//           "family": "Roboto",
//           "name": "Roboto-Bold",
//           "style": "Bold"
//         },
//         "color": {
//           "r": 255,
//           "g": 255,
//           "b": 255
//         },
//         "text": "2",
//         "size": 7.10226011276245,
//         "x": 1467.8623046875,
//         "y": -101.181640625
//       },
//       {
//         "font": {
//           "family": "Roboto",
//           "name": "Roboto-Bold",
//           "style": "Bold"
//         },
//         "color": {
//           "r": 255,
//           "g": 255,
//           "b": 255
//         },
//         "text": "4.0026",
//         "size": 7.10226011276245,
//         "x": 1516.08203125,
//         "y": -101.181640625
//       },
//       {
//         "font": {
//           "family": "Roboto",
//           "name": "Roboto-Bold",
//           "style": "Bold"
//         },
//         "color": {
//           "r": 255,
//           "g": 255,
//           "b": 255
//         },
//         "text": "HELLIUM",
//         "size": 11.6524600982666,
//         "x": 1478.3916015625,
//         "y": -169.107421875
//       },
//       {
//         "font": {
//           "family": "Roboto",
//           "name": "Roboto-Bold",
//           "style": "Bold"
//         },
//         "color": {
//           "r": 0,
//           "g": 0,
//           "b": 0
//         },
//         "text": "He",
//         "size": 37,
//         "x": 1479.33984375,
//         "y": -116.48046875
//       }
//     ],
//     "name": "He",
//     "paths": [
//       {
//         "color": {
//           "r": 0,
//           "g": 0,
//           "b": 0
//         },
//         "name": "hex-stroke",
//         "points": [
//           [
//             1530.76531053939,
//             151.495386846977
//           ],
//           [
//             1530.76531053939,
//             119.317911500587
//           ],
//           [
//             1502.89879945977,
//             103.229173827392
//           ],
//           [
//             1475.03228838015,
//             119.317911500587
//           ],
//           [
//             1475.03228838015,
//             151.495386846977
//           ],
//           [
//             1502.89879945977,
//             167.584124520174
//           ]
//         ]
//       },
//       {
//         "color": {
//           "r": 64,
//           "g": 223,
//           "b": 255
//         },
//         "name": "highlite",
//         "points": [
//           [
//             1473.8019676334,
//             118.388811121278
//           ],
//           [
//             1532.24719053287,
//             152.361895412168
//           ],
//           [
//             1532.29245709316,
//             152.335758856959
//           ],
//           [
//             1532.29245709316,
//             118.477539524383
//           ],
//           [
//             1502.97036324745,
//             101.54841924211
//           ]
//         ]
//       },
//       {
//         "color": {
//           "r": 1,
//           "g": 212,
//           "b": 255
//         },
//         "name": "hexagon",
//         "points": [
//           [
//             1532.14930335469,
//             152.335767883067
//           ],
//           [
//             1532.14930335469,
//             118.477545438297
//           ],
//           [
//             1502.82722259053,
//             101.548434215911
//           ],
//           [
//             1473.50514182638,
//             118.477545438297
//           ],
//           [
//             1473.50514182638,
//             152.335767883067
//           ],
//           [
//             1502.82722259053,
//             169.264879105453
//           ]
//         ]
//       },
//       {
//         "color": {
//           "r": 75,
//           "g": 75,
//           "b": 77
//         },
//         "name": "bga",
//         "points": [
//           [
//             1539,
//             180.400560302377
//           ],
//           [
//             1466.45435188192,
//             180.400560302377
//           ],
//           [
//             1466.45435188192,
//             111.74059468314
//           ],
//           [
//             1539,
//             111.74059468314
//           ]
//         ]
//       },
//       {
//         "color": {
//           "r": 63,
//           "g": 63,
//           "b": 65
//         },
//         "name": "bgc",
//         "points": [
//           [
//             1539,
//             180.400560302377
//           ],
//           [
//             1466.45435188192,
//             180.400560302377
//           ],
//           [
//             1466.45435188192,
//             98.7069340489452
//           ],
//           [
//             1539,
//             98.7069340489452
//           ]
//         ]
//       }
//     ]
//   }
export class ElementModel {
    public width: number;
    public height: number;
    public x: number;
    public y: number;

    constructor(private elementModel: any, private ctx: CanvasRenderingContext2D) {
    }

    private clear(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    private setInstanceVariables(points: any[]): void {
        let x1 = points[0][0];
        let y1 = points[0][1];
        let x2 = points[2][0];
        let y2 = points[2][1];
        this.width = x1 - x2;
        this.height = y1 - y2;

        //as top left corner of rectangle
        this.x = points[2][0];
        this.y = points[2][1];
    }

    public drawText(): void {
        let textFrames = this.elementModel.textFrames;
        for (let f = 0; f < textFrames.length; f++) {
            const textFrame = textFrames[f];
            this.ctx.save();
            this.ctx.fillStyle = `rgb(${textFrame.color.r}, ${textFrame.color.g}, ${textFrame.color.b})`;
            this.ctx.textBaseline = 'top';
            this.ctx.font = `bold ${textFrame.size}px Roboto`;
            this.ctx.fillText(textFrame.text, textFrame.x, (textFrame.y * -1));
            this.ctx.restore();
        }
    }

    public drawGraphics(): void {

        const pathItems: any[] = this.elementModel.paths.reverse();

        this.setInstanceVariables(pathItems[0].points);

        //this.ctx.strokeStyle = '#fff';
        for (let j = 0; j < pathItems.length; j++) {
            const pathItem = pathItems[j];
            const points = pathItem.points;

            const color = pathItem.color;

            this.ctx.beginPath();
            for (var i = 0; i < points.length; i++) {
                const point = points[i];
                if (i === 0) {
                    this.ctx.moveTo(point[0], point[1]);
                } else {
                    this.ctx.lineTo(point[0], point[1]);
                }
            }
            this.ctx.save();
            this.ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
            this.ctx.closePath();

            if (j !== pathItems.length - 1) {
                this.ctx.fill();
            } else {
                this.ctx.stroke();
            }
            this.ctx.restore();
        }

        this.drawText();
    }

}
