export type Product = {

  _id: string;

  id: number;

  imageUrl: string;

  name: string;

  status: "active" | "inactive" | "archived";

  price: string;

  stock: number;

  availableAt: Date;

};
