"use strict";

const {
  db,
  models: { User, Cart, OrderItem, Product },
} = require("../server/db");
const { faker } = require("@faker-js/faker");
const Address = require("../server/db/models/Address");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  ///-------------------------USERS DATA------------------------///
  const users = [];
  for (let i = 1; i <= 100; i++) {
    users.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(15, true, /\w/, ""),
      role: `user`,
    });
  }

  ///-------------------------ADDRESSES DATA-----------------------///
  const addresses = [];
  for (let i = 1; i <= 100; i++) {
    addresses.push({
      //generates a randomized localized street address
      line1: faker.address.streetAddress(false), // "34830 Erdman Hollow"
      //generates a randomized secondary address
      line2: faker.address.secondaryAddress(), // "Apt. 861"
      zipcode: faker.address.zipCode(),
      //generates a randomized state from the US
      state: faker.address.state(),
      //generates a random localized city name
      city: faker.address.city(),
      //generates a random phone number
      phoneNumber: faker.phone.number(),
    });
  }

  ///--------------------------PRODUCTS DATA---------------------------///
  const size = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [];
  for (let i = 1; i <= 10; i++) {
    colors.push(faker.color.human());
  }

  const products = [];
  for (let i = 1; i <= 100; i++) {
    let sizeIndex = Math.floor(Math.random() * 6);
    products.push({
      prodName: faker.commerce.productName(),
      //generates a random number between 0 and 10
      prodQuantity: faker.datatype.number({ max: 10 }),
      prodPrice: faker.commerce.price(1, 1000, 2),
      prodSize: size[sizeIndex],
      prodColor: colors,
      //generates a random fashion image url
      //NOTE: The height/width of the randomized image can be adjusted
      prodImg: faker.image.fashion(true),
    });
  }



  ///--------------------MODEL INSTANCES WITH FAKER DATA---------------------///
  await Promise.all(users.map((user) => User.create(user)));
  await Promise.all(addresses.map((address) => Address.create(address)));

  const [
    prod1,
    prod2,
    prod3,
    prod4,
    prod5,
    prod6,
    prod7,
    prod8,
    prod9,
    prod10,
  ] = await Promise.all(products.map((product) => Product.create(product)));

  const cart1 = await Cart.create();
  const cart2 = await Cart.create();

  const orderItem1 = await OrderItem.create({
    quantity: 2,
    total: prod3.prodPrice * 2
  });

  const orderItem2 = await OrderItem.create({
    quantity: 3,
    total: prod2.prodPrice * 3,
  });

  ///---------------------MODEL ASSOCIATIONS WITH FAKER DATA----------------///

  //User-Address: One-to-many
  //Give each address a user
  const assignAddresses = async () => {
    for (let i = 1; i <= 100; i++) {
      let user = await User.findByPk(i);
      let address = await Address.findByPk(i);
      address.setUser(user);
    }
  };
  await assignAddresses();

  //User-Cart: One-to-Many
  //Give a cart to a user1.
  const user1 = await User.findByPk(1);
  await cart1.setUser(user1);
  //Give another cart to a user1.
  await cart2.setUser(user1);

  //Product-OrderItem: One-to-many
  //Give a product to orderItem1.
  await orderItem1.setProduct(prod3);
  //Give another product to orderItem1.
  await orderItem1.setProduct(prod4);

  //Give a product to orderItem2.
  await orderItem2.setProduct(prod2);


  //Cart-OrderItem: One-to-many
  //Give a cart to orderItem1.
  await orderItem1.setCart(cart1);
  //Give another cart to orderItem1.
  await orderItem1.setCart(cart2);

  //Give a cart to orderItem2.
  await orderItem2.setCart(cart1);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${addresses.length} addresses`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
