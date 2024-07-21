import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Define tus opciones de autenticación
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/login', // Aquí indicas la ruta de tu página personalizada de inicio de sesión
  },
};

// Configura el handler de NextAuth con las opciones
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
