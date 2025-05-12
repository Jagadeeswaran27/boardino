import { prisma } from "@/lib/prisma";

const page = async () => {
  const data = await prisma.test.findMany();
  console.log(data);

  async function addNewTest() {
    "use server";
    await prisma.test.create({
      data: {
        id: "2xHello",
        name: "Balaji",
      },
    });
  }
  return (
    <div>
      <form action={addNewTest}>
        <button>Add New</button>
      </form>
    </div>
  );
};

export default page;
