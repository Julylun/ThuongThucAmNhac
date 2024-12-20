import { ChildEntity, Entity, OneToMany } from "typeorm";
import { Person } from "../person/person.entity";

@ChildEntity()
export class Artist {

}