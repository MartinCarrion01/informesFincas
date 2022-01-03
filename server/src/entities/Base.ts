import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Base {
  @PrimaryGeneratedColumn("uuid")
  uuid: String;

  @Column({ type: "datetime" })
  fechaIngreso: Date = new Date();

  @Column({ type: "datetime", nullable: true })
  fechaFinVigencia: Date;

  @Column({ default: true })
  active: Boolean;
}
