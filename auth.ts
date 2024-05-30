import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { db } from '@/app/lib/db';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';

async function getUser(rfc: string): Promise<User | undefined> {
  try {
    const [user, fields] = await db.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE rfc=?',
      [rfc],
    );
    console.log('user:', user);
    return user[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('credentials:', credentials);
        const parsedCredentials = z
          .object({ rfc: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { rfc, password } = parsedCredentials.data;
          console.log('rfc:', rfc);
          console.log('password', password);
          const user = await getUser(rfc);
          if (!user) {
            console.error('User not found:', rfc);
            return null;
          }
          console.log(user);
          return user;
        }
        console.error('Invalid credentials:', parsedCredentials.error);

        return null;
      },
    }),
  ],
});
