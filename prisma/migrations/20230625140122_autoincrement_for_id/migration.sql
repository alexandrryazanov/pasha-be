-- AlterTable
CREATE SEQUENCE list_id_seq;
ALTER TABLE "List" ALTER COLUMN "id" SET DEFAULT nextval('list_id_seq');
ALTER SEQUENCE list_id_seq OWNED BY "List"."id";
