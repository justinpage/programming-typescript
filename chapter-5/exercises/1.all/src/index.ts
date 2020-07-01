// #1
//
// Question:
// What are the differences between a class and an interface?
//
// Answer:
// A class represents a concrete object definition with implemented methods and
// properties that can be controlled by access modifiers. An interface is a
// lightweight abstraction that represents what a class can do when implemented.
// More specifically, it is the contract that the class would follow when
// implemented. You cannot define access modifiers with interfaces.  You also
// can't define what the methods will do in an interface.


// #2
//
// Question:
// What happens when you mark it as protected instead?
//
// Answer:
// You can extends the class but still enforce a class as final
class MessageQueue {
  protected constructor(private message: string[]) { }
  static create(messages: string[]) {
    return new this(messages)
  }
}

class GoodQueue extends MessageQueue {}

console.log(MessageQueue.create([]))
console.log(GoodQueue.create([]))


// #3
//
// Answer:
type Shoe = {
  purpose: string
}

type CreateShoe = {
  (type: 'balletFlat'): BalletFlat
  (type: 'boot'): Boot
  (type: 'sneaker'): Sneaker
}

class BalletFlat implements Shoe {
  purpose = 'dancing'
}

class Boot implements Shoe {
  purpose = 'woodcutting'
}

class Sneaker implements Shoe {
  purpose = 'walking'
}

let Shoe: {create: CreateShoe } = {
  create: (type: 'balletFlat' | 'boot' | 'sneaker') => {
    switch (type) {
      case 'balletFlat': return new BalletFlat
      case 'boot': return new Boot
      case 'sneaker': return new Sneaker
    }
  }
}

console.log(Shoe.create('balletFlat'));
console.log(Shoe.create('boot'));
console.log(Shoe.create('sneaker'));

// #4
//
// Question: Guarantee at compile time that someone can’t call .send() before
// setting at least URL and method.
//
// Answer:
class RequestBuilder {
  protected data: object | null = null
  protected method: 'get' | 'post' | null = null
  protected url: string | null = null

  setMethod(method: 'get' | 'post'): RequestBuilderWithMethod {
    return new RequestBuilderWithMethod().setMethod(method).setData(this.data)
  }

  setData(data: object | null): this {
    this.data = data
    return this
  }

}

class RequestBuilderWithMethod extends RequestBuilder {
  setMethod(method: 'get' | 'post' | null): this {
    this.method = method
    return this
  }
  setURL(url: string): RequestBuilderWithMethodAndURL {
    return new RequestBuilderWithMethodAndURL()
      .setMethod(this.method)
      .setURL(url)
      .setData(this.data)
  }
}

class RequestBuilderWithMethodAndURL extends RequestBuilderWithMethod {
  setURL(url: string): this {
    this.url = url
    return this
  }

  send() {
    console.log(`Sent message to ${this.url}`);
  }
}

new RequestBuilder()
 .setData({firstname: 'Anna'})
 .setMethod('get')
 .setURL('/users')
 .send()

// Question:
// How would you change your design if you wanted to make this
// guarantee, but still let people call methods in any order?
//
// (This answer courtesy of @albertywu)
// Answer:
interface BuildableRequest {
  data?: object
  method: 'get' | 'post'
  url: string
}

class RequestBuilder2 {
  data?: object
  method?: 'get' | 'post'
  url?: string

  setData(data: object): this & Pick<BuildableRequest, 'data'> {
    return Object.assign(this, {data})
  }

  setMethod(method: 'get' | 'post'): this & Pick<BuildableRequest, 'method'> {
    return Object.assign(this, {method})
  }

  setURL(url: string): this & Pick<BuildableRequest, 'url'> {
    return Object.assign(this, {url})
  }

  build(this: BuildableRequest) {
    return this
  }
}

let request = new RequestBuilder2()
 .setData({firstname: 'Anna'})
 .setMethod('get') // Try removing me!
 .setURL('/users') // Try removing me!
 .build()
