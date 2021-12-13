import { PrimaryKey } from "@mikro-orm/core";
import { v4 } from "uuid";

export abstract class Base {
  @PrimaryKey()
  uuid: string = v4();
}
