-- CreateTable
CREATE TABLE "Escala" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ministro" TEXT NOT NULL,
    "sopranos" TEXT NOT NULL,
    "contraltos" TEXT NOT NULL,
    "tenores" TEXT NOT NULL,
    "teclados" TEXT NOT NULL,
    "violao" TEXT NOT NULL,
    "bateria" TEXT NOT NULL,
    "baixo" TEXT NOT NULL,
    "guitarra" TEXT NOT NULL,
    "culto" DATETIME NOT NULL
);
