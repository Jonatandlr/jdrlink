import { NextRequest, NextResponse } from "next/server";
import { db } from "@/libs/prisma";
import { getServerSession } from "next-auth";

//post link to api
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const session = await getServerSession();
    const hash = await hashToUrl(data.hashToUrl);

    if (hash === "Hash already exist") {
      return NextResponse.json(
        { message: "Hash already exist" },
        { status: 400, statusText: "Bad Request" }
      );
    }

    //create link in db
    await db.links.create({
      data: {
        URL: data.url,
        hash: hash,
        author: {
          connect: {
            email: session?.user?.email ?? "",
          },
        },
      },
    });

    // joint the hash to the url
    const finalLink = `http://localhost:3000/${hash}`;

    return NextResponse.json(
      { message: "success", finalLink },
      { status: 200, statusText: "OK" }
    );
  } catch (error: any) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json(
      { message: "Error al procesar la solicitud", error: error.message },
      { status: 500 }
    );
  }
}

//get link from api
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hash = searchParams.get("hash");
    const type = searchParams.get("type");

    if (type == "getLink" && hash) {
      console.log(hash);

      //check if hash exist in db
      const exist = await db.links.findUnique({
        where: {
          hash: hash,
        },
      });
      if(!exist){
        return NextResponse.json(
          { message: "Hash not found" },
          { status: 404, statusText: "Not Found" }
        );
      }
      // console.log(exist.URL);

      return NextResponse.json(
        { message: "success", url: exist.URL},
        { status: 200, statusText: "OK" }
      );

    }

    return NextResponse.json(
      { message: "success" },
      { status: 200, statusText: "OK" }
    );
  } catch (error: any) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json(
      { message: "Error al procesar la solicitud", error: error.message },
      { status: 500 }
    );
  }
}

async function hashToUrl(hash: string) {
  //convert white space of hash to hyphen and delete final hyphen
  hash = hash.replace(/\s+/g, "-").replace(/-$/, "").trim();

  //check if hash exist in db
  const exist = await db.links.findUnique({
    where: {
      hash: hash,
    },
  });

  if (exist) {
    //if exist, return error
    return "Hash already exist";
  }
  return hash;
}
