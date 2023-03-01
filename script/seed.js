"use strict";

const {
  db,
  models: { User, Cart, OrderItem, Product },
} = require("../server/db");
const { faker } = require("@faker-js/faker");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

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

  const size = ["XS", "S", "M", "L", "XL", "XXL"];

  const colors = []
  for (let i = 1; i<=10; i++){
    colors.push(faker.color.human())
  };

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

  const [
    user1,
    user2,
    user3,
    user4,
    user5,
    user6,
    user7,
    user8,
    user9,
    user10,
  ] = await Promise.all(users.map((user) => User.create(user)));
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
  ] = 
  await Promise.all(products.map((product) => Product.create(product)));
  // const cart = await Cart.create();
  // const user = await User.findByPk(1);

  // await cart.setUser(user);

  // const quant = 2;
  // const total = prod3.prodPrice * quant;
  // console.log(quant, total);
  // const orderItem = await OrderItem.create({
  //   quantity: quant,
  //   total,
  // });
  // await orderItem.setProduct(prod3);
  // await orderItem.setCart(cart);
  // const orderItem1 = await OrderItem.create({
  //   quantity: 3,
  //   total: prod2.prodPrice * 3,
  // });
  // await orderItem1.setCart(cart);
  // await orderItem1.setProduct(prod2);
  // console.log(prod2, prod3);
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${users.length} users`);
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
