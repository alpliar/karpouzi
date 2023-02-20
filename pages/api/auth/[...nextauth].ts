import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';
// import EmailProvider from 'next-auth/providers/email';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID || '',
            clientSecret: process.env.DISCORD_CLIENT_SECRET || ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
        // EmailProvider({
        //   server: {
        //     host: process.env.EMAIL_SERVER_HOST,
        //     port: process.env.EMAIL_SERVER_PORT,
        //     auth: {
        //       user: process.env.EMAIL_SERVER_USER,
        //       pass: process.env.EMAIL_SERVER_PASSWORD,
        //     },
        //   },
        //   from: process.env.EMAIL_FROM,
        // }),
        // ...add more providers here
    ],
    debug: process.env.NODE_ENV !== 'production',
    pages: {
        signIn: '/user/login'
    },
    callbacks: {
        // session({ session, token, user }) {
        session({ session }) {
            // console.log(token, user);
            return session; // The return type will match the one returned in `useSession()`
        }
    }
};
export default NextAuth(authOptions);
