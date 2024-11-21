import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Person } from "./person.entity";

@Injectable()
export class UserRepository extends Repository<Person> {
    constructor(private dataSource: DataSource) {
        super(Person, dataSource.createEntityManager());
    }
}