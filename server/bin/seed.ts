import "dotenv/config";

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import database from "../database/client";

import type { AbstractSeeder } from "../database/fixtures/AbstractSeeder";

const fixturesPath = path.join(__dirname, "../database/fixtures");

const seed = async () => {
  try {
    const dependencyMap: { [key: string]: AbstractSeeder } = {};

    const filePaths = fs
      .readdirSync(fixturesPath)
      .filter((filePath: string) => !filePath.startsWith("Abstract"));

    for (const filePath of filePaths) {
      const { default: SeederClass } = await import(
        pathToFileURL(path.join(fixturesPath, filePath)).href
      );

      const seeder = new SeederClass() as AbstractSeeder;

      dependencyMap[SeederClass.toString()] = seeder;
    }

    const sortedSeeders: AbstractSeeder[] = [];

    const solveDependencies = (n: AbstractSeeder) => {
      for (const DependencyClass of n.dependencies) {
        const dependency = dependencyMap[DependencyClass.toString()];

        if (!sortedSeeders.includes(dependency)) {
          solveDependencies(dependency);
        }
      }

      if (!sortedSeeders.includes(n)) {
        sortedSeeders.push(n);
      }
    };

    for (const seeder of Object.values(dependencyMap)) {
      solveDependencies(seeder);
    }

    const [CardSeeder, RoleSeeder, UserSeeder] = sortedSeeders;

    const customSeederOrder = [RoleSeeder, UserSeeder, CardSeeder];

    for (const seeder of customSeederOrder) {
      await database.query(`delete from ${seeder.table}`);
    }

    for (const seeder of customSeederOrder) {
      await seeder.run();

      await Promise.all(seeder.promises);
    }

    database.end();

    console.info(
      `${process.env.DB_NAME} filled from '${path.normalize(fixturesPath)}' 🌱`,
    );
  } catch (err) {
    const { message, stack } = err as Error;
    console.error("Error filling the database:", message, stack);
  }
};

seed();
