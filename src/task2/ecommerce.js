////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = () => {
  // didn't manage to complete this function, couldn't resolve the promise
  const ids = allIds;

  const idsPromise = new Promise(function (resolve, reject) {
    const ids = allIds;
    const fetchedOrders = [...ids].map((id) => {
      return fetchOrderById(id);
    });
    console.log(fetchedOrders);

    resolve(fetchedOrders);
  });

  let newOrders = [];

  idsPromise.then(function (results) {
    return [...newOrders, results];
  });

  // .....
  //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
};

const bucketOrdersByUsers = () => {
  let ordersByUsers = {};
  const allOrders = fetchAllOrders();

  // get userIds only
  const userIdsArr = allOrders.map((order) => order[userId]);
  // remove duplications
  const cleanUserIdsArr = reduceDuplications(userIdsArr);

  for (let i = 0; i < allOrders.length; i++) {
    for (let j = 0; j < cleanUserIdsArr.length; j++) {
      // make date object key with array as its value
      if (!ordersByUsers[cleanUserIdsArr[j]]) {
        ordersByUsers[cleanUserIdsArr[j]] = [];
      }
      if (allOrders[i].userId === cleanUserIdsArr[j]) {
        ordersByUsers[cleanUserIdsArr[j]].push(allOrders[i]);
      }
    }
  }

  //   2. TODO: using the function from section 1 you should now bucket the orders by user.
  // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.

  return ordersByUsers;
};

const getLast2WeeksOrders = () => {
  orders.map((order) => {
    return (
      order &&
      order.timestamp &&
      order.timestamp >= Date.now() - 1000 * 60 * 60 * 24 * 14
    );
  });

  //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
};

const bucketOrdersByDate = () => {
  const last2WeeksOrders = getLast2WeeksOrders();
  let ordersByDate = {};

  // get dates only
  const datesArr = last2WeeksOrders.map((order) => order[timestamp]);
  // remove duplications
  const cleanDatesArr = reduceDuplications(datesArr);

  for (let i = 0; i < last2WeeksOrders.length; i++) {
    for (let j = 0; j < cleanDatesArr.length; j++) {
      // make date object key with array as its value
      if (!ordersByDate[cleanDatesArr[j]]) {
        ordersByDate[cleanDatesArr[j]] = [];
      }
      if (last2WeeksOrders[i].timestamp === cleanDatesArr[j]) {
        ordersByDate[cleanDatesArr[j]].push(last2WeeksOrders[i]);
      }
    }
  }

  //   4. TODO: using the function from section 3 bucket the orders by date.
  // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
  return ordersByDate;
};

const reduceDuplications = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos;
  });
};

fetchAllOrders();
// .then(console.log);

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
