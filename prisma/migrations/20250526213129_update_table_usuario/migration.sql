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
    "vozId" INTEGER,
    "instrumentoId" INTEGER,
    CONSTRAINT "Usuario_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usuario_vozId_fkey" FOREIGN KEY ("vozId") REFERENCES "Voz" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Usuario_instrumentoId_fkey" FOREIGN KEY ("instrumentoId") REFERENCES "Instrumento" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("cargoId", "dtAtualizacao", "dtCadastro", "email", "id", "instrumentoId", "nome", "senha", "vozId") SELECT "cargoId", "dtAtualizacao", "dtCadastro", "email", "id", "instrumentoId", "nome", "senha", "vozId" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
