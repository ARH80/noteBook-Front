var obj = {
    a : 10,
    b : "salam",
    c :function () {
        return this.a;
    }
}

console.log(obj.c())