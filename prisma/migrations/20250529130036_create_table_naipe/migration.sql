/*
  Warnings:

  - You are about to drop the `Instrumento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `instrumentoId` on the `Usuario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Instrumento_naipe_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Instrumento";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dtCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtAtualizacao" DATETIME NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "naipe" INTEGER,
    CONSTRAINT "Usuario_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usuario_naipe_fkey" FOREIGN KEY ("naipe") REFERENCES "Naipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("cargoId", "dtAtualizacao", "dtCadastro", "email", "id", "naipe", "nome", "senha") SELECT "cargoId", "dtAtualizacao", "dtCadastro", "email", "id", "naipe", "nome", "senha" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
