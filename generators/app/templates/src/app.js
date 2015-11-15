class Main {
  constructor() {
    console.log("hello es2015!");
  }
  toString(){
    return "hello es2015!";
  }
}

var body = document.querySelector('body');
    body.textContent = new Main();
