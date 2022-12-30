https://adventofcode.com/
https://www.reddit.com/r/adventofcode/

learning pretty quick that the parser probably doesn't need to be rewritten daily

What I learned from day 13:
```js
Number([]) == 0
Number([1]) == 1
Number([1, 1]) == undefined
// so:
!isNaN(Number([])) == true
// in this case, we will think an empty list, is a number!!! Very cool javascript
```
I guess what I learned is to use parseInt / typeof == 'number'