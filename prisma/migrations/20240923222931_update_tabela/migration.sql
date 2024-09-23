/*
  Warnings:

  - You are about to drop the column `createdAt` on the `comentarios` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `comentarios` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `projetos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `projetos` table. All the data in the column will be lost.
  - You are about to drop the column `creatdAt` on the `tarefas` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tarefas` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `comentarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tarefas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comentarios" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "projetos" DROP COLUMN "createAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tarefas" DROP COLUMN "creatdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "creatd_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
