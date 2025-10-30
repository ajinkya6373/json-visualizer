# JSON Tree Visualizer

A beautiful, interactive web application for visualizing JSON data structures as hierarchical trees using React Flow.

## Features

### Core Functionality
- **JSON Input & Validation**: Paste or type JSON data with real-time validation
- **Interactive Tree Visualization**: Hierarchical node-based visualization using React Flow
- **Smart Search**: Search nodes by JSON path (e.g., `$.user.address.city`, `items[0].name`)
- **Node Highlighting**: Automatically highlights and centers matched nodes
- **Click to Copy**: Click any node to copy its JSON path to clipboard

### Visual Features
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: Professional transitions and hover effects

### Controls
- **Zoom In/Out**: Precise zoom controls
- **Fit View**: Automatically fit entire tree in viewport
- **Pan & Drag**: Navigate large JSON structures easily
- **Download**: Export tree as PNG image
- **Clear/Reset**: Start fresh with one click

### UX Enhancements
- **Node Tooltips**: Hover to see full path and value
- **Mini Map**: Navigate large trees with ease
- **Sample JSON**: Pre-loaded example to get started
- **Toast Notifications**: Clear feedback for all actions

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Flow** - Tree visualization
- **Tailwind CSS** - Styling
- **html-to-image** - Image export
- **Sonner** - Toast notifications

## Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd json-tree-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

1. **Input JSON**: Paste or type your JSON data in the left panel
2. **Generate Tree**: Click "Generate Tree" to visualize
3. **Search**: Use the search bar to find specific paths (e.g., `$.user.name`)
4. **Interact**: 
   - Click nodes to copy their paths
   - Hover for tooltips
   - Use zoom controls to navigate
5. **Export**: Download your tree as an image

## Example JSON Paths

```
$.user.address.city
$.items[0].name
$.data.users[2].email
```

## Project Structure

```
src/
├── components/
│   ├── JsonInput.tsx          # JSON input textarea
│   ├── TreeVisualizer.tsx     # React Flow canvas
│   ├── CustomNode.tsx         # Custom node component
│   ├── SearchBar.tsx          # Search functionality
│ 
├── types/
│   └── json-tree.ts           # TypeScript interfaces
├── utils/
│   ├── json-parser.ts         # JSON parsing logic
│   └── tree-layout.ts         # Tree layout algorithm
└── pages/
    └── Index.tsx             # Main page
    └── NotFound.tsx  
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
