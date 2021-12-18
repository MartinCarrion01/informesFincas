import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Base {
  @PrimaryGeneratedColumn("uuid")
  uuid: String;

  @Column({ type: "date" })
  fechaIngreso: Date = new Date();

  @Column({ nullable: true })
  fechaFinVigencia: Date;

  @Column({ default: true })
  active: Boolean;
}
