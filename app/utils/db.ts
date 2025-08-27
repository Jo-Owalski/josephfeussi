// utils/db.ts
//import { PrismaClient } from '@prisma/client' // or relative: ../lib/generated/prisma
import { PrismaClient } from '@/lib/generated/prisma'  // 

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma