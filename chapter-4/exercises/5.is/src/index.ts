// Compare a string and a string
console.log(is('string', 'otherstring')) // false

// Compare a boolean and a boolean
console.log(is(true, false)) // false

// Compare a number and a number
console.log(is(42, 42)) // true

// Comparing two different types should give a compile-time error
console.log(is(10, 'foo'))

// [Hard] I should be able to pass any number of arguments
console.log(is([1], [1, 2], [1, 2, 3])) // false

console.log(is(1)) // true
// This a good case where we have a variadic function that expects one argument
// or possibly more. In other words, because we are using rest parameters, the
// args will by definition transform to an array containing tuples of T. So what
// we did is defined the possibility in that definition.
function is<T>(...args: [T, ...T[]]): boolean {
  return args.every(v => v === args[0])
}
