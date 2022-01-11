type APIResponse = {
  status: "success" | "failed";
  data: any;
};
type NewUserType = Record<string, string | number>;

// remote data v1
const users: string[] = ["alice", "bob", "cindy", "david"];

// remote data v2
const newUsers: NewUserType[] = [
  { name: "alice", age: 18 },
  { name: "bob", age: 18 },
  { name: "cindy", age: 18 },
  { name: "david", age: 18 }
];

function getUsersAPI(): Promise<APIResponse> {
  return new Promise((resolve, reject) => {
    resolve({
      status: "success",
      data: newUsers
    });
  });
}

function getUser() {
  getUsersAPI()
    .then(resp => {
      // get data

      const { status, data } = resp;
      if (status === "success") {
        return data;
      } else {
        return [];
      }
    })
    .then((users: NewUserType[]) => {
      // biz logic...

      // render(users); // v1
      render(adapterUser(users));
    });
}

function render(users: string[]) {
  // ! complex rendering logic
  users.forEach((user: string) => {
    if (typeof user === "string") {
      console.log("user: " + user);
    } else {
      throw new Error("data error");
    }
  });
}

function adapterUser(newUsers: NewUserType[]): string[] {
  return newUsers.map((user: NewUserType) => {
    return JSON.stringify(user);
  });
}

export const run = () => {
  getUser();
};
