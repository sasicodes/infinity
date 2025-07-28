## Infinity - the developer's social

A full-stack web application for design engineers with visual flow editor and social features.

### Features

- **AI Content Generation**: Create text and image content using AI
- **Visual Flow Editor**: Drag-and-drop interface for building content workflows
- **Blockchain Integration**: Ethereum wallet support with Dynamic Labs
- **Social Platform**: Share and explore content with user profiles
- **Real-time Sync**: Offline-first with IndexedDB and cloud sync
- **License Management**: Story Protocol integration for content licensing

### Architecture

#### Frontend (Web App)
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4
- **State Management**: TanStack Query + IndexedDB
- **Routing**: React Router
- **UI Components**: Radix UI + Lucide React icons
- **Animations**: Motion (Framer Motion alternative)
- **Flow Editor**: React Flow (@xyflow/react)
- **Blockchain**: Dynamic Labs + Wagmi + Viem

#### Backend (API)
- **Framework**: Hono (Node.js)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with JWKS
- **File Storage**: Cloudflare R2
- **AI Integration**: OpenRouter AI SDK
- **Validation**: Zod schemas

### Project Structure

```
infinity/
├── apps/
│ ├── api/ # Backend API server
│ │ ├── prisma/ # Database schema & migrations
│ │ ├── src/
│ │ │ ├── services/ # Business logic
│ │ │ ├── middlewares/# Auth & validation
│ │ │ └── index.ts # Server entry point
│ │ └── package.json
│ └── web/ # Frontend React app
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── pages/ # Route components
│ │ ├── lib/ # Utilities & hooks
│ │ └── main.tsx # App entry point
│ └── package.json
├── package.json # Root workspace config
└── pnpm-workspace.yaml # PNPM workspace
```

### 🛠️ Tech Stack

#### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- TanStack Query
- IndexedDB (Dexie)
- React Flow
- Dynamic.xyz (Auth)
- Motion (animations)
- Lucide React (icons)

#### Backend
- Hono (Node.js framework)
- TypeScript
- Prisma (PostgreSQL ORM)
- JWT authentication
- Cloudflare R2
- OpenRouter for gateway
- Zod validation

### Getting Started

#### Prerequisites
- Node.js 18+
- PNPM
- PostgreSQL database
- Cloudflare R2 bucket
- OpenRouter API key

#### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd infinity
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   
   Create `.env` files in both `apps/api/` and `apps/web/`:
   
   **API Environment** (`apps/api/.env`):
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/hackathon"
   DYNAMIC_ENV_ID="your-dynamic-env-id"
   R2_ACCESS_KEY_ID="your-aws-key"
   R2_SECRET_ACCESS_KEY="your-aws-secret"
   OPENROUTER_API_KEY="your-openrouter-key"
   ```

   **Web Environment** (`apps/web/.env`):
   ```env
   VITE_DYNAMIC_ENVIRONMENT_ID="your-dynamic-env-id"
   ```

4. **Database Setup**
   ```bash
   cd apps/api
   pnpm db:m  # Run migrations
   pnpm db:g  # Generate Prisma client
   ```

5. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   pnpm dev
   
   # Or start individually
   pnpm run:api    # Backend only
   cd apps/web && pnpm dev  # Frontend only
   ```

### Available Scripts

#### Root Level
- `pnpm dev` - Start both frontend and backend in development
- `pnpm run:api` - Start only the API server
- `pnpm biome:fix` - Format code with Biome

#### API (`apps/api/`)
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:g` - Generate Prisma client
- `pnpm db:m` - Run database migrations
- `pnpm db:s` - Open Prisma Studio

#### Web (`apps/web/`)
- `pnpm dev` - Start Vite development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

### Database Schema

#### Core Models

- **Post**: User-generated content with media and licensing
- **Flow**: Visual workflow definitions
- **Node**: Individual nodes within flows
- **License**: Blockchain-based content licensing

#### Key Features

- UUID-based IDs
- Timestamp tracking
- User relationships
- Category classification
- IP and token management

### Authentication & Security

- JWT-based authentication
- JWKS for key rotation
- CORS enabled
- Input validation with Zod
- Secure file uploads to Cloudflare

### API Endpoints

#### Content Management
- `POST /generate` - AI design generation
- `POST /upload` - File upload
- `POST /upload-json` - JSON data upload

#### Flow Management
- `POST /sync/flow` - Save flow data
- `POST /sync/node` - Save node content
- `DELETE /sync/node` - Delete node content
- `GET /sync/all` - Load flow and node data

#### Posts
- `POST /post/new` - Create new post
- `POST /post/update-purchase` - Update purchase status
- `GET /posts` - Get all posts (paginated)
- `GET /posts/me` - Get user's posts
- `GET /posts/category` - Get posts by category

### UI Components

#### Flow Editor
- Custom nodes with drag-and-drop
- Connection validation
- Inter connect nodes for creativity
- Offline-first with sync

#### Content Types
- Text generation
- Image generation
- Empty content placeholders
- Loading states
- Generation renderer

### Data Flow

1. **Offline-First**: IndexedDB for local storage
2. **Real-time Sync**: Debounced backend synchronization
3. **AI Integration**: State of the art models for design generation
4. **Ownership**: Registered as Intellectual property in Story, seamless signless & gasless integration.
5. **File Storage**: AWS S3 for media uploads

### Deployment

#### Frontend
- Configure environment variables
- Start command: `pnpm dev`
- Output directory: `dist`

#### Backend
- Set up PostgreSQL database
- Configure environment variables
- Start command: `pnpm dev`

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm biome:fix` to format code
5. Submit a pull request

### License

This project is licensed under the MIT License.
