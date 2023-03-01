"use strict";

const {
  db,
  models: { User, Cart, OrderItem, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  // const users = await Promise.all([
  //   User.create({ username: 'cody', password: '123' }),
  //   User.create({ username: 'murphy', password: '123' }),
  // ])

  const users = [];
  for (let i = 1; i <= 10; i++) {
    users.push({
      firstName: `User_f_${i}`,
      lastName: `User_l_${i}`,
      email: `User_${i}@amu.com`,
      username: `user${i}`,
      password: `pwd${i}`,
      role: `user`,
    });
  }

  const products = [];
  const quantity = [10, 20, 40, 30, 50, 60, 70, 80, 90, 100];
  const color = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "indigo",
    "black",
    "white",
  ];

  const size = ["XS", "S", "M", "L", "XL", "XXL"];
  for (let i = 1; i <= 10; i++) {
    let quantIndex = Math.floor(Math.random() * 10);
    let costIndex = Math.floor(Math.random() * 10);
    let sizeIndex = Math.floor(Math.random() * 6);
    products.push({
      prodName: `Prod_${i}`,
      prodQuantity: quantity[quantIndex],
      prodPrice: quantity[costIndex],
      prodSize: size[sizeIndex],
      prodColor: color,
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
  ] = await Promise.all(products.map((product) => Product.create(product)));
  const cart = await Cart.create();
  const user = await User.findByPk(1);

  await cart.setUser(user);

  const quant = 2;
  const total = prod3.prodPrice * quant;
  console.log(quant, total);
  const orderItem = await OrderItem.create({
    quantity: quant,
    total,
  });
  await orderItem.setProduct(prod3);
  await orderItem.setCart(cart);
  const orderItem1 = await OrderItem.create({
    quantity: 3,
    total: prod2.prodPrice * 3,
  });
  await orderItem1.setCart(cart);
  await orderItem1.setProduct(prod2);
  console.log(prod2, prod3);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
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
