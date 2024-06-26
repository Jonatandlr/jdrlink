import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";



export const OPTIONS ={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  pages: {
    signIn: '/login', // Aquí indicas la ruta de tu página personalizada de inicio de sesión
  },
} 


const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
// export default NextAuth(options);
