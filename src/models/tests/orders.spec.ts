import User from '../user.model';
import Order from '../order.model';

describe('Orders Model', () => {
  const store = new Order();
  const userStore = new User();

  it('create user method should create a new user', async () => {
    const result = await userStore.createUser({
      firstname: 'Islam',
      secondname: 'Muhammad',
      password: 'Password',
    });
    expect(result.id).toEqual(1);
    expect(result.firstname).toEqual('Islam');
    expect(result.secondname).toEqual('Muhammad');
  });

  it('should have a show method', () => {
    expect(store.showOrder).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.createOrder).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.updateOrder).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.deleteOrder).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result = await store.createOrder({
      user_id: 1,
      status: 'active',
    });
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'active',
    });
  });

  it('getUserOrders method should return a list of orders made by one user', async () => {
    const result = await store.getUserOrders(1);
    expect(result).toEqual([
      {
        id: 1,
        user_id: '1',
        status: 'active',
      },
    ]);
  });

  it('show method should return the correct order', async () => {
    const result = await store.showOrder(1);
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'active',
    });
  });

  it('getUserActiveOrders method should return user orders with active status', async () => {
    const result = await store.getUserActiveOrders(1);
    expect(result).toEqual([
      {
        id: 1,
        user_id: '1',
        status: 'active',
      },
    ]);
  });

  it('update method should return the updated order after edit', async () => {
    const result = await store.updateOrder(1, {
      user_id: 1,
      status: 'completed',
    });
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'completed',
    });
  });

  it('getUserCompletedOrders method should return user orders with competed status', async () => {
    const result = await store.getUserCompletedOrders(1);
    expect(result).toEqual([
      {
        id: 1,
        user_id: '1',
        status: 'completed',
      },
    ]);
  });

  it('delete method should remove the order', async () => {
    await store.deleteOrder(1);
    const result = await store.getUserOrders(1);
    expect(result).toEqual([]);
  });

  it('delete user method should remove the user', async () => {
    const deletedUser = await userStore.deleteUser(1);
    expect(deletedUser.id).toEqual(1);
  });
});
