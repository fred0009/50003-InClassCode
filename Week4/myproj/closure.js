function animal(name) {
    var n = name;
    var age = 0;
    return function () {
        return [n, ++age];
    }
}

var a = animal("dragon");
console.log(a());
console.log(a());
console.log(a());

var b = animal("tiger");
console.log(b());
