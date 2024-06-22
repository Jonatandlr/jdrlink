import { NextResponse, NextRequest } from "next/server";
import { db } from "@/libs/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json(); // Obtener los datos del cuerpo de la solicitud

    // console.log("Datos recibidos:", data);

    //Buscar si el usuario ya existe en la base de datos
    const user = await db.user.findUnique({
      where: {
        email: data.user.email,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "success" },
        { status: 200, statusText: "OK" }
      );
    }

    await db.user.create({
      data: {
        email: data.user.email,
        name: data.user.name,
      },
    });
    
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
