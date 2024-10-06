-- CreateTable
CREATE TABLE "_ProjetoMembro" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjetoMembro_AB_unique" ON "_ProjetoMembro"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjetoMembro_B_index" ON "_ProjetoMembro"("B");

-- AddForeignKey
ALTER TABLE "_ProjetoMembro" ADD CONSTRAINT "_ProjetoMembro_A_fkey" FOREIGN KEY ("A") REFERENCES "projetos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjetoMembro" ADD CONSTRAINT "_ProjetoMembro_B_fkey" FOREIGN KEY ("B") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
