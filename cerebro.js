window.onload = function() {
  const Entrada = document.querySelector("input")
  const Spoiler = document.querySelector("#spoiler")

const Neurona = new brain.NeuralNetwork();
Neurona.train([
    {input: {r:0, g:0, b:0 }, output:{blanco:1} },
    {input: {r:1, g:1, b:1 }, output:{negro:1 } }
  ]);


  Entrada.addEventListener("change", (e) => {
    Spoiler.style.background = e.target.value;
    var ColorRGB = getRgb(e.target.value);
    ColorRGB.r = ColorRGB.r/255;
    ColorRGB.g = ColorRGB.g/255;
    ColorRGB.b = ColorRGB.b/255;
    console.log("Color Selecionado: " + e.target.value);
    console.log("Rojo: " + ColorRGB.r);
    console.log("Azul: " + ColorRGB.b);
    console.log("Verde: " + ColorRGB.g);

    var Resultado= brain.likely(ColorRGB, Neurona);
    console.log(Resultado);
    Spoiler.style.color = Resultado == "blanco" ? "white": "black";
    });

  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  function getRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  }
}
