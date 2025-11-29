# EduCloud - College Management SaaS Platform

A multi-tenant, cloud-based College Management SaaS Platform designed for universities, colleges, polytechnics, training institutes, and vocational schools.

## Features

### Multi-Tenant Architecture
- **Wildcard subdomain routing**: Each institution gets its own subdomain (e.g., `institution.educloud.com`)
- **Branded experience**: Custom logos, colors, and settings per institution
- **Data isolation**: Row-Level Security (RLS) ensures complete data separation
- **Subscription management**: Free, Starter, Professional, and Enterprise plans

### User Roles & Permissions
- **Platform Level**: Super Admin
- **Institution Level**: Registrar, Admin, Lecturer, Accountant, Librarian, IT Officer, Exams Officer, Admissions Officer, Hostel Manager
- **Student Level**: Undergraduate, Postgraduate, Alumni

### Core Modules

| Module | Description |
|--------|-------------|
| **Admissions** | Online applications, review workflow, offer management, enrollment |
| **Student Information System** | Profiles, programs, academic history, attendance |
| **Academics** | Course registration, timetables, assignments, examinations |
| **Results & Transcripts** | Grade entry, GPA/CGPA calculation, transcript generation |
| **Finance** | Fee structures, invoicing, payments, receipts, financial reports |
| **Library** | Book catalog, borrowing, returns, fines, digital resources |
| **Hostel** | Room allocation, payments, occupancy management |
| **Staff Management** | Profiles, assignments, timetables |
| **Certificates** | Blockchain-verified digital certificates with QR codes |
| **Communications** | Announcements, notifications, SMS/Email integration |

### Blockchain Certificate Verification
- **Tamper-proof certificates**: Stored on Polygon blockchain
- **QR code verification**: Instant authenticity check
- **Public verification portal**: No login required for employers
- **Revocation support**: Handle fraud cases

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: Supabase Auth
- **State Management**: Zustand + React Query
- **Blockchain**: Web3.js (Polygon/Ethereum)
- **Animations**: Framer Motion

## Project Structure

```
college/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── dashboard/
│   │   ├── admissions/
│   │   ├── students/
│   │   ├── academics/
│   │   ├── finance/
│   │   ├── library/
│   │   ├── certificates/
│   │   └── ...
│   ├── (superadmin)/        # Platform admin pages
│   │   ├── tenants/
│   │   ├── subscriptions/
│   │   └── analytics/
│   ├── api/                 # API routes
│   ├── verify/              # Public certificate verification
│   └── page.tsx             # Marketing landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Layout components
│   ├── forms/               # Form components
│   └── charts/              # Data visualization
├── lib/
│   ├── supabase/            # Supabase client setup
│   ├── stores/              # Zustand stores
│   ├── hooks/               # Custom React hooks
│   └── utils/               # Utility functions
├── types/                   # TypeScript type definitions
├── config/
│   ├── constants.ts         # App constants
│   └── database.sql         # Supabase schema
└── middleware.ts            # Auth & subdomain handling
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account (free tier works)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/college.git
cd college
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` with Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. Set up the database:
   - Go to Supabase SQL Editor
   - Run the contents of `config/database.sql`

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

### Local Subdomain Testing

For testing multi-tenant subdomains locally, add entries to your hosts file:

```
# /etc/hosts (Mac/Linux) or C:\Windows\System32\drivers\etc\hosts (Windows)
127.0.0.1 demo.localhost
127.0.0.1 fbc.localhost
```

Then access: `http://demo.localhost:3000`

## Database Setup

The `config/database.sql` file contains the complete Supabase schema including:

- All tables with proper relationships
- Row-Level Security policies for multi-tenancy
- Custom functions for GPA calculation, student number generation
- Enums for status types, roles, etc.

### Key Tables

| Table | Purpose |
|-------|---------|
| `tenants` | Institution registration and settings |
| `users` | All user accounts with roles |
| `students` | Student-specific data |
| `staff` | Staff/faculty data |
| `programs` | Academic programs |
| `courses` | Course catalog |
| `results` | Examination results |
| `certificates` | Issued certificates with blockchain data |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Configure wildcard domain: `*.yourdomain.com`

### Environment Variables

See `.env.example` for all required and optional variables.

## Subscription Plans

| Plan | Students | Staff | Storage | Price |
|------|----------|-------|---------|-------|
| Free | 50 | 10 | 1 GB | $0 |
| Starter | 500 | 50 | 10 GB | $99/mo |
| Professional | 2,000 | 200 | 50 GB | $299/mo |
| Enterprise | Unlimited | Unlimited | Unlimited | Custom |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Documentation: [docs.educloud.com](https://docs.educloud.com)
- Email: support@educloud.com
- Issues: [GitHub Issues](https://github.com/yourusername/college/issues)

---

Built with love for education
