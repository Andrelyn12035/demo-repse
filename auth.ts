import NextAuth, { type DefaultSession } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { db } from '@/app/lib/db';
import { User, User2 } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';
import { Adapter } from 'next-auth/adapters';

async function getUser(rfc: string): Promise<User2 | undefined> {
  try {
    const [user, fields] = await db.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE rfc=?',
      [rfc],
    );
    let a = user[0] as User;
    const n_user = {} as User2;
    n_user.name = a.id
    n_user.email = a.rfc
    n_user.image = a.role
    console.log('user get usu:', n_user);
    return n_user; // Cast the result to User type
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers: { GET, POST }, auth, signIn, signOut} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ rfc: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { rfc, password } = parsedCredentials.data as { rfc: string, password: string };
          console.log('rfc:', rfc);
          console.log('password', password);
          const user = await getUser(rfc);
          if (!user) {
            console.error('User not found:', rfc);
            return null;
          }
          console.log('si'+JSON.stringify(user));
          return user;
        }
        console.error('Invalid credentials:', parsedCredentials.error);

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id 
      }
      return token
    },
    session({ session, token }) {
      return session
    },
  },
});
