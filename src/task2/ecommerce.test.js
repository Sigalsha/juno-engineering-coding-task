import { fetchOrderById } from "../api";

const ORDER_ID = "70ef599e5eca171b2bce84d1";
test("Ecommerce - fetchOrderById", async () => {
  let orders = await fetchOrderById(ORDER_ID);
  expect(orders).toBeTruthy();
});

/* TODO - fetchAllOrders:
1. test a random order's id and see if its a part of an array.
2. test if this array also includes timestamp and title
3. test same thing for a random userId 
*/

/* TODO - bucketOrdersByUsers:
1. test random userId and see it fits a key in the obj
2. test if each key of the obj (userId) has a matching array value, which isn't empty
*/

/* TODO- getLast2WeeksOrders:
1. test timestamp smaller than 2 weeks
2. test timestamp in between last two weeks
3. edge case: test order without timestamp
*/

/* TODO - bucketOrdersByDate:
1. test random timestamp and check if it fits a key in the object
2. test if each key of the obj (timestamp) has a matching array value, which isn't empty
*/
