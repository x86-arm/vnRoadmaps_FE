export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface Session {
    _id: string;
    email: string;
    fullname: string;
    username: string;
    password: string;
    phone: number;
    role: string;
    updateAt: Date;
    createAt: Date;
    __v: number;
  }
}
