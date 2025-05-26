-- CreateTable
CREATE TABLE "Cargo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dtCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtAtualizacao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Voz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "naipe" TEXT NOT NULL,
    "dtCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtAtualizacao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Instrumento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "naipe" TEXT NOT NULL,
    "dtCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtAtualizacao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dtCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtAtualizacao" DATETIME NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "vozId" INTEGER NOT NULL,
    "instrumentoId" INTEGER NOT NULL,
    CONSTRAINT "Usuario_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usuario_vozId_fkey" FOREIGN KEY ("vozId") REFERENCES "Voz" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usuario_instrumentoId_fkey" FOREIGN KEY ("instrumentoId") REFERENCES "Instrumento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_nome_key" ON "Cargo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Voz_naipe_key" ON "Voz"("naipe");

-- CreateIndex
CREATE UNIQUE INDEX "Instrumento_naipe_key" ON "Instrumento"("naipe");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
