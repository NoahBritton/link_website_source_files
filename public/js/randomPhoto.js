var imgs = ['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg',
    '06.jpg','08.jpg','09.jpg',
    '10.jpg'];
function rand() {
  const arr = [];
  for (var a = [0, 1, 2, 3, 4, 5, 6, 7, 8], i = a.length; i--; ) {
    var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    arr[i] = random;
  }
  return arr;
}
function getRandomImage() {
  var arr = rand();
  var rnd1 = arr[0];
  var rnd2 = arr[1];
  var rnd3 = arr[2];
  document.getElementById("slide1").src= ("img/" + imgs[rnd1])
  document.getElementById("slide2").src= ("img/" + imgs[rnd2])
  document.getElementById("slide3").src= ("img/" + imgs[rnd3])
}