# B2B Sourcing Platform

A Next.js platform for B2B food and beverage sourcing, featuring an AI-powered RFI wizard.

## Features

- **Landing Page**: High-conversion design with clear value proposition.
- **RFI Wizard**: 6-step form with AI assistance to help buyers create better briefs.
- **AI Integration**: OpenAI-powered analysis of RFIs to identify missing details.
- **Dashboard**: Buyer dashboard to track RFIs and communicate with agents.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.example` to `.env.local` and add your keys:
   ```bash
   cp .env.example .env.local
   ```
   You will need:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the app**:
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app`: Next.js App Router pages.
- `src/components`: Reusable UI components.
  - `landing`: Landing page sections.
  - `rfi`: RFI Wizard components.
  - `dashboard`: Dashboard components.
  - `ui`: Basic design system components.
- `src/lib`: Utilities and clients (Supabase, OpenAI).
- `supabase`: Database migrations.

## Database Setup

Run the SQL migration in `supabase/migrations/20240522000000_initial_schema.sql` in your Supabase SQL editor to set up the tables.
