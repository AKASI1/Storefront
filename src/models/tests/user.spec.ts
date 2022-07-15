import User from "../user.model";

const user: User = new User();

describe("User Model", () => {
  it("should have a showUsers  method", () => {
    expect(user.showUsers).toBeDefined();
  });

  it("should have a getUser method", () => {
    expect(user.getUser).toBeDefined();
  });

  it("should have a createUser method", () => {
    expect(user.createUser).toBeDefined();
  });
  it("should have a deleteUser method", () => {
    expect(user.deleteUser).toBeDefined();
  });
  it("should create a user to true using createUser method", async () => {
    const result = await user.createUser({
      firstname: "kevin",
      secondname: "eyong",
      password: "thisismeenow2020#",
    });
    expect(result.firstname).toEqual("kevin");
  });
  it("should return all users using showUsers method", async () => {
    const result = await user.showUsers();
    expect(result).toHaveSize(2);
  });

  it("should return the correct user using getUserById method", async () => {
    const id: number = 2;
    const result = await user.getUser(id);
    expect(result.id).toEqual(id);
    expect(result.firstname).toEqual("kevin");
    expect(result.secondname).toEqual("eyong");
  });
  it("should delete the correct user using deleteUser method", async () => {
    const result = await user.deleteUser(2);
    expect(result.id).toEqual(2);
  });
});
