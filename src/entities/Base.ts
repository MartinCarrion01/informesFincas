import { PrimaryGeneratedColumn } from "typeorm";

export abstract class Base {
  @PrimaryGeneratedColumn("uuid")
  uuid: String;
}
