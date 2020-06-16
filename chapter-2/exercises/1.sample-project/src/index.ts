let a = 1 + 2
let b = a + 3
let c = {
  apple: a,
  banana: b
}
let d = c.apple * 4
let e = [true, false, true]
// Let's write a piece of code that TypesScript is unable to infer the type for.
let f = e + d
