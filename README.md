# pluggo

Broadway but smaller

## What is this?

Pluggo is a stupidly-named plugin library. You could also refer to it as a "dependency injection" or "inversion of control" library if you are feeling jaunty.

It's based on the parts of the [broadway](https://github.com/flatiron/broadway) interface which I personally found myself using and functions more or less as a drop-in replacement.

It does _not_ implement the `detach` function in broadway's plugin interface.

## So why would I use this instead of broadway?

If you're using broadway in server code that you never plan on sharing with a browser, then you shouldn't.

If you're [browserifying](http://browserify.org) broadway though, you'll find that it clocks in at 243K, 56K when gzipped. Pluggo implements the same plugin interface with 0 dependencies and about 40 lines of code.

## API

See [https://github.com/flatiron/broadway#api](broadway's API docs) and pretend that the parts about detach and name aren't there. Congratulations, you have mastered Pluggo!
