var renderer = new PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();


var geometry = new PIXI.mesh.Geometry()
.addAttribute('aVertexPosition',  // the attribute name
              [-100, -100,   // x, y
                100, -100,   // x, y
                100 , 100]) // x, y

.addAttribute('aUvs',  // the attribute name
              [0, 0,  // u, v
               1, 0,  // u, v
               1, 1]) // u, v

var shader = new PIXI.Shader(`

    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;

    void main() {

        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`,

    `precision mediump float;

    varying vec2 vUvs;

    uniform sampler2D uSampler2;

    void main() {

        gl_FragColor = texture2D(uSampler2, vUvs);
    }

`)

var shader2 = new PIXI.Shader(`

    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;

    void main() {

        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`,

    `precision mediump float;

    varying vec2 vUvs;

    uniform sampler2D uSampler2;

    void main() {

        gl_FragColor = texture2D(uSampler2, vUvs);
        gl_FragColor.r += (abs(sin(gl_FragCoord.x * 0.06)) * 0.5) * 2.;
        gl_FragColor.g += (abs(cos(gl_FragCoord.y * 0.06)) * 0.5) * 2.;
    }

`)
var triangle = new PIXI.mesh.RawMesh(geometry, shader, {
  uSampler2:PIXI.Texture.from('required/assets/SceneRotate.jpg')
});


var triangle3 = new PIXI.mesh.RawMesh(geometry, shader2, {
  uSampler2:PIXI.Texture.from('required/assets/SceneRotate.jpg')
});

triangle.position.set(400, 300);
triangle.scale.set(2);

triangle3.position.set(500, 400);
triangle3.scale.set(3);

stage.addChild(triangle3, triangle);

// start the animation..
requestAnimationFrame(animate);

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
    triangle.rotation += 0.01;
    triangle3.rotation -= 0.005;
}
