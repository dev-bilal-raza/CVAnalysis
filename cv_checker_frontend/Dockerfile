FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCDfIu2qJ2fRasqn9ISJJeIKaj7DxYLYTQ
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=cvchecker123.firebaseapp.com
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=cvchecker123
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=cvchecker123.appspot.com
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=544463432089
ENV NEXT_PUBLIC_FIREBASE_APP_ID=1:544463432089:web:680ef274a0e68315980b08
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-DZLT6QV7HR

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]